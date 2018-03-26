process.on('uncaughtException', err => {
  console.log(JSON.stringify(err))
})
console.log('hello')
throw new Error('error')
console.log('world')
