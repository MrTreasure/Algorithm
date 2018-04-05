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

**Prefetch count**

通过设置每一个消费者处理消息的数量，如果没有完成确认，就不再派发消息给消费者

**exchange**

生产者并不直接将消息发送到对应队列中，而是先发送到exchange 交换器中，交换器再通过一定的规则分发给一个或多个队列。交换器有四种类型：
* 1
* 2
* 3
* 4

