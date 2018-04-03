import { rabbit } from '../Rabbit'
import chalk from 'chalk'

const Queue: string = 'node'
const msg = '始终相信美好的事情即将发生'

// Producer
rabbit.getChannel().then(ch => {
  ch.assertQueue(Queue, { durable: true })
  ch.sendToQueue(Queue, Buffer.from(msg), { persistent: true })
  
})
