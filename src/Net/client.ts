import * as net from 'net'
import chalk from 'chalk'

const log = console.log

const IPC = '\\\\?\\pipe\\E:\\Node\\Algorithm\\dist\\Net'
const DEBUG = '\\\\?\\pipe\\e:\\Node\\Algorithm'

const client = net.connect(DEBUG, () => {
  log(chalk.green('服务已连接——' + '当前进程ID为：' + process.pid))
  client.write(JSON.stringify({ id: process.pid, type: MSG_TYPE.INIT, data: {} }))

  client.write(JSON.stringify({ id: 17284, type: MSG_TYPE.COMMUNICATE, data: 'Hello client' }))
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

interface IMsg {
  id: string | number
  data: any
  type: MSG_TYPE
}

enum MSG_TYPE {
  INIT,
  DATA,
  COMMUNICATE
}
