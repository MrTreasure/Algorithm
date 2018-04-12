// const EventEmitter = require('events').EventEmitter

// const A = new EventEmitter()

// A.on('msg', (msg, callback) => {
//   console.log(msg)
//   callback('Back Message:' + msg)
// })


// const promiseA = msg => {
//   return new Promise((resolve, reject) => {
//     A.emit('msg', msg, (res) => {
//       resolve(res)
//     })
//   })
// }


// promiseA('Hello Event').then(res => {
//   console.log(res)
// })

class Base {

}

class A extends Base {
  constructor() {
    this.name = name
  }
  prop(){}
}

class B extends A {

}

console.log(A)
console.log(A.prototype)