![事件循环](https://yjhjstz.gitbooks.io/deep-into-node/content/chapter5/5fee18eegw1ewjpoxmdf5j20k80b1win.jpg)
![EventLoop](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100803.png)

> 主线程拥有一个执行栈以及一个任务队列
，主线程会依次执行代码，当遇到异步函数时候，会先将该函数入栈，所有主线程函数运行完毕后再将异步函数出栈，直到所有的异步函数执行完毕即可。


## 事件循环
事件循环被称作循环的原因在于，它一直在查找新的事件并且执行。一次循环的执行称之为 tick， 在这个循环里执行的代码称作 task
```js
while (eventLoop.waitForTask()) {
  eventLoop.processNextTask()
}
```
任务(Tasks)中同步执行的代码可能会在循环中生成新的任务。一个简单的生成新任务的编程方式就是 ```setTimtout(taskFn, deley)```,当然任务也可以从其他的资源产生，比如用户的事件、网络事件或者DOM的绘制。
![Event loop](http://blog-assets.risingstack.com/2016/Aug/Execution_timing_event_lopp_with_tasks-1470127590983.svg)

## 任务队列
让事情变得复杂的情况是，事件循环可能有几种任务任务队列。唯一的两个限制是同一个任务源中的事件必须属于同一个队列，并且必须在每个队列中按插入顺序处理任务。除了这些之外，执行环境可以自由地做它所做的事情。例如，它可以决定下一步要处理哪些任务队列。
```js
while (eventLoop.waitForTask()) {
  const taskQueue = eventLoop.selectTaskQueue()
  if (taskQueue.hasNextTask()) {
    taskQueue.processNextTask()
  }
}
```
基于这个模型，我们失去了对事件执行时间的控制权。浏览器可能决定在执行我们设定的```setTimeout```之前先清空其他几个队列.
![TaskQueue](http://blog-assets.risingstack.com/2016/Aug/Execution_timing_event_loop_with_task_queues-1470127624172.svg)

## Microtask queue
幸运的是，事件循环也有一个单独的队列叫做 microtask，microtask 将会在百分百在当前task队列执行完毕以后执行
```js
while (eventLoop.waitForTask()) {
  const taskQueue = eventLoop.selectTaskQueue()
  if (taskQueue.hasNextTask()) {
    taskQueue.processNextTask()
  }

  const microtaskQueue = eventLoop.microTaskQueue
  while (microtaskQueue.hasNextMicrotask()) {
    microtaskQueue.processNextMicrotask()
  }
}
```
最简单的方式生成一个 microtask 任务是 ```Promise.resolve().then(microtaskFn)```, Microtasks 的插入执行是按照顺序的，而且因为只有一个唯一的 microtask 队列。执行环境不会再搞错执行的时间了。
另外，microtask任务 也可以生成新的 microtask任务 并且插入到同样的队列中（插入当前microtask）并且在同一个 tick 里执行
![microtask](http://blog-assets.risingstack.com/2016/Aug/Execution_timing_event_loop_with_microtask_queue-1470127679393.svg)