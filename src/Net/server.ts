import * as net from 'net'
import * as path from 'path'
import * as Router from 'koa-router'


import chalk from 'chalk'

const log = console.log

const clientList: net.Socket[] = []

const IPC = path.join('\\\\?\\pipe', process.cwd())

const server = net.createServer()

server.on('connection', client => {
  log(client)
})



server.listen(IPC, () => {
  log(chalk.bgRedBright(`服务器运行在：${IPC}\nPID: ${process.pid.toString()}`))
})
