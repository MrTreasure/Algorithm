import * as net from 'net'
import chalk from 'chalk'

const log = console.log

const server = net.createServer(socket => {
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

server.listen(2001, () => {
  log(chalk.green('服务器已启动'))
})


