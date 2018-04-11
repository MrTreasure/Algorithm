import * as net from 'net'
import chalk from 'chalk'

const log = console.log

const clientList: net.Socket[] = []

const server = net.createServer(socket => {
  // 这里的 socket 和下面 connection 事件中的 client 等价
  socket.setTimeout(0)
  socket.on('end', () => {
    log(chalk.red('服务器已关闭'))
  })
  socket.on('error', err => {
    log(chalk.red(err.toString()))
  })
  socket.on('data', msg => {
    log(chalk.blue(msg.toString()))
    socket.write('I recived your message')
    socket.pipe(socket)
  })
})

server.on('connection', client => {
  client['name'] = client.remoteAddress + ':' + client.remotePort
  clientList.push(client)
  client.write('Hello' + client['name'])
  client.on('end', () => {
    clientList.splice(clientList.indexOf(client), 1) // 删除数组中的制定元素。
  })
  client.on('data', msg => {
    log(chalk.yellow('Message from ' + msg.toString()))
  })
})

server.listen(2001, () => {
  log(chalk.green('服务器已启动'))
})


