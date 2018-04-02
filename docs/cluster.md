# Cluster集群学习

## 结论
* 虽然平常通过设置为CPU线程数的工作线程，但是可以超过这个数，并且并不是主线程先创建
```javascript
if (cluster.isMaster) {
  // 循环 fork 任务 CPU i5-7300HQ 四核四线程
  for (let i = 0; i < 6; i++) {
    cluster.fork()
  }
  console.log(chalk.green(`主进程运行在${process.pid}`))
} else {

  console.log(chalk.green(`子进程运行在${process.pid}`))
}
#子进程运行在17768
#子进程运行在5784
#子进程运行在11232
#子进程运行在7904
#主进程运行在12960
#子进程运行在4300
#子进程运行在16056
```