import { Rabbit } from '../Rabbit'
import * as amqp from 'amqplib'

const URL = 'amqp://localhost:5672'

// 创建一个连接
const connection = amqp.connect(URL)

// 创建生产者
connection.then(conn => {
  // 创建一个通道
  return conn.createChannel()
}).then(ch => {
  // 指定一个消息队列如果不存在则新建
  return ch.assertQueue('queue').then(ok => {
    ch.sendToQueue('queue', Buffer.from('始终相信美好的事情即将发生'))
    ch.sendToQueue('queue', Buffer.from('用心就能看见'))
    ch.sendToQueue('queue', Buffer.from('从陌生的脸看到明天'))
  })
}).catch(err => {
  console.error(err)
})

// 创建消费者
connection.then(conn => {
  return conn.createChannel()
}).then(ch => {
  ch.assertQueue('queue').then(ok => {
    ch.consume('queue', msg => {
      if (msg) {
        console.log(msg.content.toString())
        ch.ack(msg)
      }
      process.exit(0)
    })
  })
}).catch(err => {
  console.error(err)
})
