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

