# RabbitMQ 在node下的使用
> 确保主机已经安装 RabbitMQ 并映射到 5762 端口

* 多 worker 下默认调度是 RR

## RabbitMQ 的一些名词定义
* **Producer** 生产者是一个用户端程序，用来发送消息
* **Queue** 队列是一个 Buffer，用来存储消息
* **Consumer** 消费者是一个服务端程序，用来接收消息