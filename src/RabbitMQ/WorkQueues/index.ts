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

  // 将该消费者设定到 Queue 队列中
  ch.assertQueue(Queue, { durable: true })
  // 该消费者最多同时消费两条信息
  ch.prefetch(2)
  // 进行消费
  ch.consume(Queue, (msg) => {

    // 模拟一个消耗时间较长的任务
    global.setTimeout(() => {
      log(chalk.green`[x] Received ${msg.content.toString()}`)

      // 消息被消费后一定要调用 channel 的 ack 方法确认消费，否则会一直停在队列中
      ch.ack(msg)
    }, 2000)
    
    
  }, { noAck: false })
})
