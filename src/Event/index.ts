// const file = require('./file')
// const a = require('./file')

import b, { a } from './file'
console.log(b, a)

// const EventEmitter = require('events').EventEmitter

// const A = new EventEmitter()

// A.on('msg', (msg, callback) => {
//   console.log(msg)
//   callback('Back Message:' + msg)
// })

// const sendMsg = msg => {
//   return new Promise((resolve, reject) => {
//     A.emit('msg', msg, (res) => {
//       resolve(res)
//     })
//   })
// }

// sendMsg('Hello Event').then(res => {
//   console.log(res)
// })

