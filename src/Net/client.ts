import * as net from 'net'
import chalk from 'chalk'

const log = console.log

const client = net.connect({ port: 2001 }, () => {
  log(chalk.green('服务已连接'))
  client.write('Hello,Baby !\r\n')
})
client.on('data', data => {
  log(chalk.green(data.toString()))
})
client.on('end', function () {
  console.log('客户端断开连接') 
}) 
client.on('error', err => {
  log(chalk.red(err.toString()))
})

client.write('another message')
