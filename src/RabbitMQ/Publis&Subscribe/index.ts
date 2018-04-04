import { rabbit } from '../Rabbit'
import chalk from 'chalk'

const log = console.log
const Queue: string = 'node'
const ex = 'logs'

rabbit.getChannel().then(ch => {
  // 将通道绑定到名为 ex 路由方法为 fanout(监听所有)的 exchange 上
  ch.assertExchange(ex, 'fanout', { durable: false })
  // 获取队列
  ch.assertQueue('', { exclusive: false }).then(queue => {
    log(chalk.blue`[*] Waiting for messages in ${queue.queue}. To exit press CTRL+C`)

    // 将通道绑定到具体的队里上
    ch.bindQueue(queue.queue, ex, '')

    // 消费
    ch.consume(queue.queue, msg => {
      log(chalk.green`[x] Received${msg.content.toString()}`)
      ch.ack(msg)
    }, { noAck: false })
  })
})

