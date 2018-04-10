const clientA

const clientB

clientA.on('message', msg => {
  console.log(msg)
})

clientB.on('message', msg => {
  console.log(msg)
})

clientA.send('Hello B')

clientB.send('Hello A')