import * as cluster from 'cluster'
import * as OS from 'os'
import chalk from 'chalk'
import app from './koa'

const nums = OS.cpus().length

if (cluster.isMaster) {
  for (let i = 0; i < nums; i++) {
    cluster.fork()
  }
  console.log(chalk.green(`主进程运行在${process.pid}`))
} else {
  app.listen(2001)
  console.log(chalk.blue(`子进程运行在${process.pid}`))
}

console.log(chalk.red('项目已启动'))
