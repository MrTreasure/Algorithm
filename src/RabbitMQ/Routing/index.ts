import { rabbit } from '../Rabbit'
import chalk from 'chalk'

const log = console.log

const ex = 'direct_logs'

rabbit.getChannel().then(ch => {
  ch.assertExchange(ex, 'direct', { durable: false })
  ch.assertQueue('', { exclusive: true }).then(q => {
    log(chalk.blue`[*] Waiting for messages in ${q.queue}. To exit press CTRL+C`)
    ch.bindQueue(q.queue, ex, 'info')

    ch.consume(q.queue, msg => {
      log(chalk.green`[x] Received${msg.content.toString()}`)
      ch.ack(msg)
    }, { noAck: true })
  })
})
