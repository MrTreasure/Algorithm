import 'reflect-metadata'
import chalk from 'chalk'
import { STATUS_CODES } from 'http'
const log = console.log

let key = Symbol.for('key')

@modifyClass('new Prop')
class A {

  @modifyProp type: string
  name: string

  constructor (name) {
    this.name = name
  }
  
  @AOP('BEFORE', console.log)
  say (word) {
    console.log(this)
    console.log(this.name, word)
  }
}



function modifyClass (name) {
  return (target) => {
    target.prototype.extra = name
  }
}
 
function modifyProp (target, propertyKey) {
  // 修改属性
  // console.log(target)
  // console.log(propertyKey)
  target[propertyKey] = 'modfiyed by decorator'
}

// 我们在 ts 版本的 vuex 装饰器中看到的 @state('key') key
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
    const arr = [...arguments]
    console.log(this) // 运行时确定因此这里是的 this 指向实例的。如果这里是箭头函数，this则指向undefined
    return fun.apply(null, arguments)
  }
}

// 修饰入参
// index 是这个参数的顺序
function modifyParam (target, propertyKey, index) {
  // console.log(target)
  // console.log(propertyKey)
  // console.log(index)
}

function AOP (type, func) {
  return (target, propetyKey, descriptor) => {
    let oldMethod = descriptor.value
    if (type === 'BEFORE') {
      descriptor.value = function () {
        func(...arguments)
        console.log(this)
        return oldMethod.apply(this, arguments)
      }
    } else if (type === 'AFTER') {
      descriptor.value = function () {
        oldMethod.apply(target, arguments)
        func(...arguments)
      }
    }
  }
}

const a = new A('hello')

a.say('AOP')
