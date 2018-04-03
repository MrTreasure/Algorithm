import { Rabbit } from '../Rabbit'
import * as amqp from 'amqplib'
import chalk from 'chalk'


const URL = 'amqp://guest:Sunshine@localhost:5672'

// 创建一个连接
const connection = amqp.connect(URL)

// 创建生产者
connection.then(conn => {
  // 创建一个通道
  return conn.createChannel()
}).then(ch => {
  // 指定一个消息队列如果不存在则新建
  return ch.assertQueue('node').then(ok => {
    ch.sendToQueue('node', Buffer.from('始终相信美好的事情即将发生'))
    ch.sendToQueue('node', Buffer.from('用心就能看见'))
    ch.sendToQueue('node', Buffer.from('从陌生的脸看到明天'))
  })
}).catch(err => {
  console.error(err)
})

// 创建消费者
connection.then(conn => {
  // 创建一个通道
  return conn.createChannel()
}).then(ch => {
  ch.assertQueue('node').then(ok => {
    ch.consume('node', msg => {
      if (msg) {
        console.log(chalk.green(msg.content.toString()))
        ch.ack(msg)
      }
    })
  })
}).catch(err => {
  console.error(err)
})
