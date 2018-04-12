import 'reflect-metadata'
import chalk from 'chalk'
const log = console.log

@setCheck
class A {
  name: string
  check: boolean
  constructor (name) {
    this.name = name
  }
  
  @modifyFun
  say (word) {
    log('default', word)
    return 1
  }
}



function setCheck (target) {
  target.prototype.check = true
}

function modifyFun (target, name, descriptor) {
  const fun = descriptor.value
  descriptor.value = function () {
    const arr = [...arguments]
    console.log(this) // 运行时确定因此这里是的 this 指向实例的。如果这里是箭头函数，this则指向undefined
    return fun.apply(null, arguments)
  }
  // return descriptor
}

Reflect.defineMetadata('CLASS_PROP', 'CLASS_A',A.prototype)

const a = new A('A')
a.say('hello')

console.log(Reflect.getMetadata('CLASS_PROP', A.prototype))
