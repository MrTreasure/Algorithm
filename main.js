Promise.resolve('promise').then(res => {
  console.log(res)
})

process.nextTick(() => {
  console.log('nextTick')
})