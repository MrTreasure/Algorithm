import 'reflect-metadata'
import chalk from 'chalk'
const log = console.log

@modifyClass('new Prop')
class A {

  @modifyProp name: string

  constructor (name) {
    this.name = name
  }
  
  @modifyMethod
  say (@modifyParam word) {
    log('default', word)
    return 1
  }
}



function modifyClass (name) {
  return (target) => {
    target.prototype.extra = name
  }
}
 
function modifyProp (target, propertyKey) {
  console.log(target)
  console.log(propertyKey)
}

function modifyMethod (target, propertyKey, descriptor) {
  const fun = descriptor.value
  descriptor.value = function () {
    const arr = [...arguments]
    console.log(this) // 运行时确定因此这里是的 this 指向实例的。如果这里是箭头函数，this则指向undefined
    return fun.apply(null, arguments)
  }
  // return descriptor
}

function modifyParam (target, propertyKey, index) {
  console.log(target)
  console.log(propertyKey)
  console.log(index)
}

const a = new A('hello')
console.log(a['extra'])

// Reflect.defineMetadata('CLASS_PROP', 'CLASS_A',A.prototype)
// console.log(Reflect.getMetadata('CLASS_PROP', A.prototype))
