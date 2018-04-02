import * as cluster from 'cluster'
import * as OS from 'os'
import chalk from 'chalk'
import app from './koa'

// 获取CPU数量
const nums = OS.cpus().length

// 当前如果是主进程
if (cluster.isMaster) {
  // 循环 fork 任务
  for (let i = 0; i < nums; i++) {
    const worker = cluster.fork()
  }


  
  // 打印当前主进程
  console.log(chalk.green(`主进程运行在${process.pid}`))
  // 监听 exit 事件
  cluster.on('exit', (worker: cluster.Worker, code: number, signal: string) => {
    console.log(chalk.bgWhite(`工作进程${worker.process.pid}已退出`))
  })
  cluster.on('message', (worker, msg) => {
    console.log(chalk.red(worker.id + ''), msg)
  })
// 当前如果是工作进程
} else {
  app.listen(2001)
  // 打印当前子进程
  // process.send({ cmd: '1', data: 'Hello Master' })
  console.log(chalk.green(`子进程运行在${process.pid}`))
}
