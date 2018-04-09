# RabbitMQ 在node下的使用
## 相关代码
[src](./app.ts)
> 确保主机已经安装 RabbitMQ 并映射到 5762 端口

* 多 worker 下默认调度是 RR

## RabbitMQ 的一些名词定义
* **Producer** 生产者是一个用户端程序，用来发送消息
* **Consumer** 消费者是一个服务端程序，用来接收消息
* **Queue** 队列是一个RabbitMQ的内部对象，用来存储消息

**Message acknowledgment** 消息回执

在实际应用中，可能会发生消费者收到Queue中的消息，但没有处理完成就宕机（或出现其他意外）的情况，这种情况下就可能会导致消息丢失。为了避免这种情况发生，我们可以要求消费者在消费完消息后发送一个回执给RabbitMQ，RabbitMQ收到消息回执（Message acknowledgment）后才将该消息从Queue中移除；如果RabbitMQ没有收到回执并检测到消费者的RabbitMQ连接断开，则RabbitMQ会将该消息发送给其他消费者（如果存在多个消费者）进行处理。这里不存在timeout概念，一个消费者处理消息时间再长也不会导致该消息被发送给其他消费者，除非它的RabbitMQ连接断开。

**Message durability** 消息持久化

将队列中的消息进行本地持久化存储，避免因为意外原因导致丢失的大部分消息，通过设置*durable: true*

**Prefetch count** 消息处理树

通过设置每一个消费者处理消息的数量，如果没有完成确认，就不再派发消息给消费者

**exchange** 交换器

生产者并不直接将消息发送到对应队列中，而是先发送到exchange 交换器中，交换器再通过一定的规则分发给一个或多个队列。交换器有四种类型：
* 1
* 2
* 3
* 4

**routing key** 路由key(生产者定义)

生产者在将消息发送给Exchange的时候，一般会指定一个routing key，来指定这个消息的路由规则，而这个routing key需要与Exchange Type及binding key联合使用才能最终生效。
在Exchange Type与binding key固定的情况下（在正常使用时一般这些内容都是固定配置好的），我们的生产者就可以在发送消息给Exchange时，通过指定routing key来决定消息流向哪里。
RabbitMQ为routing key设定的长度限制为255 bytes。

routing key 作用于发送的消息上
```javascript
ch.publish('direct_logs', 'info', Buffer.from(ctx.request.body.content))
// 其中的 info 就是 binding key
```

**Binding**
Bindg将exchange和Queue联系起来

Bing作用于消息队列Queue上
```js
ch.bindQueue(queue.queue, ex, '')
```

**Exchange Types** 交换器的类型
* *fanout* 将所有的消息发送到订阅的消息队列中
* *direct* 将 binding key 与 routing key 完全相等的消息发送到订阅的队列中
* *topic* 按照一定的规则匹配路由
> 1. routing key为一个句点号“. ”分隔的字符串（我们将被句点号“. ”分隔开的每一段独立的字符串称为一个单词），如“stock.usd.nyse”、“nyse.vmw”、“quick.orange.rabbit”
> 2. binding key与routing key一样也是句点号“. ”分隔的字符串
> 3. binding key中可以存在两种特殊字符“ * ”与“#”，用于做模糊匹配，其中“ * ”用于匹配一个单词，“#”用于匹配多个单词（可以是零个）
* *headers* 根据消息内容中的 header 值进行匹配，该 header 是一个键值对，在建立队列与exchange的链接时，会生成一个键值对，exchange将发送消息到键值对完全匹配的队列中

**RPC** 远程过程调用
消息队列本身并不具备回调的功能，即发出一个消息后，生产者并不知道消费者返回的消息（能够知道是否消费，通过 ch.ack(msg) ），通过RPC能够返回消费者的消息。其原理在于新建一个replyQueue，消费者在之前订阅该队列

思考：在HTTP1.1的情况下，server 接收到前端响应提交消息，与接收到replyQueue的消息是两个独立的事件，没办法在前者的响应中加上后者返回的信息。因此只能通过ws协议实现推送。

## Node下的RabbitMQ应用
```js
# 一个最简单的生产者与消费者建立过程
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
    // 消息只能发送二进制
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
```
```js
# Koa下RabbitMQ的应用，省略部分koa的代码
// 定义一个 Promise 避免每次都重复调用(利用Promise的状态不可逆)
const CHANNEL = rabbit.getChannel()
const Queue = 'node'
const ex = 'logs'
const key = 'anonymous.info'
// 普通的消息队列  WorkQueues
router.post('/send', async ctx => {
  const ch = await CHANNEL
  // 定义durable属性使得信道具有持久性
  ch.assertQueue(Queue, { durable: true })

  if (typeof ctx.request.body.content !== 'string') {
    ctx.status = 400
    ctx.body = {
      status: 'faild'
    }
    return
  }

  ch.sendToQueue(Queue, Buffer.from(ctx.request.body.content))
  ctx.body = {
    result: 'success'
  }
  log(chalk.magenta`[x] Sent${ctx.request.body.content}`)
})

// 使用 exchange 的消息队列 
router.post('/exchange', async ctx => {
  const ch = await CHANNEL
  // 定义类型 fanout，所有订阅的队列都会收到接受消息
  ch.assertExchange(ex, 'fanout', { durable: false })
  try {
    // 默认为空的名字
    ch.publish(ex, '', Buffer.from(ctx.request.body.content))
    ctx.body = {
      result: 'success'
    }
  } catch (error) {
    console.error(chalk.red`${error.toString()}`)
    ctx.body = error
  }
})

// 带routing的exchange
router.post('/routing', async ctx => {
  const ch = await CHANNEL
  // 设置 exchange 的名字 以及分发方法
  ch.assertExchange('direct_logs', 'direct', { durable: false })
  try {
    // 向管道分发 info 级的方法
    ch.publish('direct_logs', 'info', Buffer.from(ctx.request.body.content))
    ctx.body = {
      result: 'success'
    }
  } catch (error) {
    console.error(chalk.red`${error.toString()}`)
    ctx.body = error
  }
})

// topic的exchange
router.post('/topic', async ctx => {
  const ch = await CHANNEL
  ch.assertExchange(ex, 'topic', { durable: false })
  ch.publish(ex, key, Buffer.from(ctx.request.body.content))
})
```
```js
#订阅 fanout 类型的队列
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

#订阅 direct 类型的队列
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

#设置 prefetch 的消费者
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
```

P.S 参考资料[RabbitMQ基础概念详细介绍](http://www.diggerplus.org/archives/3110)
