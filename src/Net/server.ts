import * as net from 'net'
import * as path from 'path'
import * as Router from 'koa-router'
import * as LRU from 'lru-cache'


import chalk from 'chalk'

const log = console.log

const clientList: IClient[] = []

const IPC = path.join('\\\\?\\pipe', process.cwd())

const server = net.createServer()

server.on('connection', socket => {
  clientList.push({ id: undefined, socket })
  // socket.on('data', msg => {
  //   let message = JSON.parse(msg.toString())
  //   handleClientMsg(message, this)
  //   console.log(this)
  //   log(chalk.green(clientList.map(item => item.id).toString()))
  // })
  socket.on('data', function (msg) {
    let message = JSON.parse(msg.toString())
    handleClientMsg(message, this)
    console.log(this, this === socket)
    log(chalk.green(clientList.map(item => item.id).toString()))
  })
})



server.listen(IPC, () => {
  log(chalk.bgRedBright(`服务器运行在：${IPC}\nPID: ${process.pid.toString()}`))
})


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

enum MSG_TYPE {
  INIT,
  DATA,
  COMMUNICATE
}

interface IClient {
  id: number | string
  socket: net.Socket
}
