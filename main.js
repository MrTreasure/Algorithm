
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
