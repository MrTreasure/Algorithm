## net.Socket 类不包含pid信息
我通过 net 模块创建一个 IPC 服务器，希望实现多进程间的通信，但是请求过来的 socket 实例不携带进程的 pid 信息，因此我需要再发次请求定义它的pid，代码如下
```javascript
// server.js
const clientList: IClient[] = []
enum MSG_TYPE {
  INIT,
  DATA,
  COMMUNICATE
}

interface IClient {
  id: number | string
  socket: net.Socket
}

const handleClientMsg = (msg, current) => {
  switch (msg.type) {
    case MSG_TYPE.INIT:
      let client = clientList.find(item => item.socket === current)
      if (client) {
        client.id = msg.id
      }
      break
    
    case MSG_TYPE.COMMUNICATE: {
      let client = clientList.find(item => item.id === msg.id)
      if (client) {
        client.socket.write(msg.data)
      } 
    }
      break
    default:
      break
  }
}

server.on('connection', socket => {
  clientList.push({ id: undefined, socket })
  socket.on('data', function (msg) {
    let message = JSON.parse(msg.toString())
    handleClientMsg(message, this)
  })
})
```
```javascript
// client.js
const client = net.connect(DEBUG, () => {
  log(chalk.green('服务已连接——' + '当前进程ID为：' + process.pid))
  client.write(JSON.stringify({ id: process.pid, type: MSG_TYPE.INIT, data: {} }))

  client.write(JSON.stringify({ id: 17284, type: MSG_TYPE.COMMUNICATE, data: 'Hello client' }))
})
```
在 connection 事件中请求的 socket 没有能够确定身份的唯一信息，因此我第一次只是存储了这个 socket，接着我让客户端发送了一个信息，这个信息携带了它的 pid，我再把这个 pid 与之前的 socket 绑定，这样接下来就能够和请求在 IPC服务器的其它客户端进行通信了。
这个现象只存在 IPC服务器中，在 TCP服务器中，可以通过 socket 的address相关信息确定它的身份

## 类上绑定事件时不应该使用箭头函数
这个问题同样出现在使用 装饰器编写切面函数，使用箭头函数以后，导致方法内的this指向不对
```javascript
server.on('connection', socket => {
  clientList.push({ id: undefined, socket })
  // socket.on('data', msg => {
  //   let message = JSON.parse(msg.toString())
  //   handleClientMsg(message, this)
  //   console.log(this, this === socket) // false
  //   log(chalk.green(clientList.map(item => item.id).toString()))
  // })
  socket.on('data', function (msg) {
    let message = JSON.parse(msg.toString())
    handleClientMsg(message, this)
    console.log(this, this === socket) // true
    log(chalk.green(clientList.map(item => item.id).toString()))
  })
})
```
在注释的代码中，使用了箭头函数，导致this指向不对，只能传递 socket，改为普通的function以后就可以使用this了。值得注意的是，在 socket 的data事件内部，这里的socket是来自connection事件传递过来的socket，每一个请求的 socket 是不同的，说明这里形成了闭包