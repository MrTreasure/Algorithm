## 先看一段代码
```javascript
import {Controller, Path, GET, POST, PathParam, BodyParam} from 'iwinter'

@Path('/api/orders')
class OrdersController extends Controller {

    @GET
    @Path('/:name/:id', (ctx, next)=> ~~ctx.params.id > 20)
    getAllOrders(@PathParam('id') id: number, @PathParam('name') name: string){
        return [{
            id: id, name, content: 'test', author: 'test', comments: []
        }];
    }

    @POST
    @Path('/add')
    addPost(@BodyParam('order') order: object){
        return order
    }
}

export default OrdersController
```
这是一段TypeScript上 koa 路由类的写法，注意到在其中，使用了```@Paht @Get```的写法, 并且在入参中也有```@PathParam('id') id: number```这样的写法。这就是装饰器。其中 ```@Path('/api')```中的API是这个装饰器的入参，在这里是*注解*，因为这个框架通过```Reflect.defineMetadata```将这个入参写入到了该方法中。在搞清这些复杂的概念之前，我们先弄明白两个最基础的概念

## 装饰器和注解
* **装饰器（Decorator）** 仅提供定义劫持，能够对类及其方法、方法入参、属性的定义并没有提供任何附加元数据的功能。
* **注解（Annotation）** 仅提供附加元数据支持，并不能实现任何操作。需要另外的 Scanner 根据元数据执行相应操作。

注意到装饰器是对类及其方法、入参、属性行为的修改，而注解只是添加元数据，不能修改行为。
在实际的开发过程中，我们通过注解添加元数据，装饰器再获取这些元数据完成对类或者方法的修改，下面开始对修改一个类

## 实际操作
```javascript
class A {

}
```
首先我们声明了一个什么也没有类，接着我们声明第一个修改器方法,并且作用在类上
```javascript
@modifyClass
class A {

}

function modifyClass(target: any) {
  target.prototype.extraProp = 'decorator'
}
```
在装饰器的方法中，入参是target，作用于class A上就是 A ，我们知道，在ES中一切都是对象，class 是ES6以后的一个面向对象的语法糖，在这里的A本质也就是一个function，在新建实例的时候作为构造函数调用。这里通过target.prototype我们也能获得这个类的原型。这样我们就可以对这个类进行修改了。值得注意的是，

**装饰器是在编译期间发生的，这个时候类的实例还没有生成，因此装饰器无法直接对类的实例进行修改。但是可以间接的通过修改类的原型影响实例**

这样的修饰器意义不大，我们要应对更多的情况，因此可以给修饰器加上参数，或者叫做'注解'
```javascript
@modifyClass('param')
class A {

}

function modifyClass(param) {
  return target => {
      target.prototype.extraProp = param
  }
}
```
之所以要给注解添加引号，是因为注解的概念是要进行元数据的修改，而这里仅仅是动态改变原型上的属性。要进行元数据的修改，我们需要利用反射**Reflect**。 ES6提供的Refelct并不满足修改元数据，我们要额外引入一个库**reflect-metadata**

```javascript
import 'reflect-metadata'

@modifyClass('param')
class A {

}

function modifyClass(param) {
  return target => {
      Reflect.defineMetadata(Symbol.for('META_PARAM'), param, target.prototype)
  }
}
```
这个时候就是真正的注解了，我们通过装饰器和Reflect对要修饰的类注入了元数据，注意我们这里是注入到```target.prototype```，类的实例上。因为不同的实例是获得的不同的数据，因此不能注入到target上。
```Reflect.defineMetadata```方法第一个入参可以是string 类型或者 symbol 类型。建议使用symbol类型,这样避免被覆盖掉。而这里的param可以是任意类型。我们不仅能在类上定义元数据，也可以在类的属性上定义
```Relect.defineMetadata(metadataKey: any, metadataValue: any, target: any, propertyKey)```

接下来我们就可以在任意的地方通过```Reflect.getMetadata(metadataKey, target)```获取元数据了。

**反射给了我们在类及其属性、方法、入参上存储读取数据的能力**  

类及其实例并不能感知或者修改存取在类上元数据，但是我们可以通过装饰器和注解在*编译时*动态的修改它们的行为，即我们写了一个函数去修改函数，我们把这样的行为称作**元编程**，接下来我们看看装饰器作用在属性、方法、入参上
```javascript
@modifyClass('new Prop')
class A {

  @modifyProp type: string
  name: string

  constructor (name) {
    this.name = name
  }
  
  @modifyMethod
  say (@modifyParam word) {
    let str = Reflect.getMetadata(key, this)
    console.log(str)
  }
}


// 在装饰类的装饰器上获得target(类)是类本身
// 在装饰属性、方法、入参上获得的target的是类的原型target(属性、方法、入参) === target(类).prototype
function modifyClass (name) {
  return (target) => {
    target.prototype.extra = name
  }
}
 
function modifyProp (target, propertyKey) {
  // 修改属性
  console.log(target)
  console.log(propertyKey)
  target[propertyKey] = 'modfiyed by decorator'
}

// 我们在 ts 版本的 vuex 装饰器中看到的 @state('key') key 等价于
// function state (key) {
//   return (target, propertyKey) => {
//     target[propertyKey] = target.$store.state[key]
//   }
// }

// 修饰方法
// descriptor对象原来的值如下
// {
//   value: specifiedFunction,
//   enumerable: false,
//   configurable: true,
//   writable: true
// };
function modifyMethod (target, propertyKey, descriptor) {
  Reflect.defineMetadata(key, 'Hello Reflect',target)
  const fun = descriptor.value
  descriptor.value = function () {
    console.log(this) // 运行时确定因此这里是的 this 指向实例的。如果这里是箭头函数，this则指向undefined
    return fun.apply(this, arguments)
  }
}

// 修饰入参
// index 是这个参数的顺序
function modifyParam (target, propertyKey, index) {
  console.log(target)
  console.log(propertyKey)
  console.log(index)
}
```

## 通过装饰器实现一个切面
```javascript
class A {
    say()
}

function AOP(type, func) {
  return (target, propetyKey, descriptor) => {
      let oldMethod = descriptor.value
      if (type == 'BEFORE') {
          descripotor.value = function () {
              fun(...arguments)
              oldMethod.apply(this, arguments)
          }
      } else if (type == 'AFTER') {
          descripotor.value = function () {
              let result = oldMethod.apply(this, arguments)
              fun(...arguments)
              return result
          }
      }
  }
}
```
注意，这里的切点只能是同步函数，如果要异步的函数需要进行额外的处理，是否为异步函数同样可以通过注解表明。这里也只能用函数表达式，不能使用箭头函数，否则会造成this的丢失。

## 总结
1. 装饰器提供了对类的属性、方法、入参修改的能力，但是单独靠装饰器是不够的，还要通过注解配合，这样才能动态的修改原来的表现行为。因此我们可以封装一些常用的装饰器方法，达到复用的能力。但要切记，装饰器的行为是发生在编译时
2. 这里的装饰器修饰是在TS上完成的，在不涉及Reflec时TS和ES的目前表现一致。那么在涉及Reflect时的表现是什么样的呢？我也不知道啊o_O。并且TS和ES的装饰器是有不同的，未来的版本可能也会发生根本的改变。

以上都是我瞎编的