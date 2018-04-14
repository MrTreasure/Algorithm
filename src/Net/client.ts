import * as net from 'net'
import chalk from 'chalk'

const log = console.log

const IPC = '\\\\?\\pipe\\E:\\Node\\Algorithm\\dist\\Net'

const client = net.connect(IPC, () => {
  log(chalk.green('服务已连接'))
  client.write(JSON.stringify({ id: process.pid }))
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
