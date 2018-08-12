
setImmediate(() => {
  console.log(5)
})
setTimeout(() => {
  console.log('1')
  Promise.resolve().then(() => {
    console.log(2)
  })
}, 0);

Promise.resolve().then(() => {
  console.log(3)
})

process.nextTick(() => {
  console.log(4)
})

Array.prototype.flatten = function() {
  return this.reduce((flat, next) => flat.concat(Array.isArray(next) ? next.flatten() : next), [])
}

console.log([1, [2,3,[4,5]]].flatten())