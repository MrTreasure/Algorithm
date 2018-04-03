import { rabbit } from '../Rabbit'
import chalk from 'chalk'
const log = console.log


const Queue: string = 'node'
const msg = '始终相信美好的事情即将发生'

// Producer
// rabbit.getChannel().then(ch => {
//   ch.assertQueue(Queue, { durable: true })
//   ch.sendToQueue(Queue, Buffer.from(msg), { persistent: true })
//   log(chalk.magenta`[x] Sent ${msg}`)
// })

// Consumer
rabbit.getChannel().then(ch => {
  ch.consume(Queue, (msg) => {
    const secs = msg.content.toString().split('.').length - 1

    log(chalk.green`[x] Received ${msg.content.toString()}`)
    global.setTimeout(() => {
      log(chalk.green`[x] Done`)
    }, secs * 1000)
  }, { noAck: true })
})
