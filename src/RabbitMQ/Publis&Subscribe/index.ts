import { rabbit } from '../Rabbit'
import chalk from 'chalk'

const log = console.log
const Queue: string = 'node'
const ex = 'ex'

rabbit.getChannel().then(ch => {
  // 将通道绑定到名为 ex 路由方法为 fanout(监听所有)的 exchange 上
  ch.assertExchange(ex, 'fanout', { durable: false })
  // 将通道绑定到匿名的队列上
  ch.assertQueue('', { exclusive: false }).then(queue => {
    log(chalk.blue`[*] Waiting for messages in ${queue.queue}. To exit press CTRL+C`)
    ch.bindQueue(queue.queue, ex, '')

    ch.consume(queue.queue, msg => {
      log(chalk.green`[x] Received${msg.content.toString()}`)
      ch.ack(msg)
    }, { noAck: false })
  })
})

