![事件循环](https://yjhjstz.gitbooks.io/deep-into-node/content/chapter5/5fee18eegw1ewjpoxmdf5j20k80b1win.jpg)
![EventLoop](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100803.png)

* 主线程拥有一个执行栈以及一个任务队列
，主线程会依次执行代码，当遇到异步函数时候，会先将该函数入栈，所有主线程函数运行完毕后再将异步函数出栈，直到所有的异步函数执行完毕即可。