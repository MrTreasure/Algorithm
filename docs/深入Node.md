# 深入Node
> 本篇是深入的Node的读书笔记，相关知识点的归纳以及自己的简介[《深入Node》](https://yjhjstz.gitbooks.io/deep-into-node)
## Node架构一览
![Node架构](https://yjhjstz.gitbooks.io/deep-into-node/content/chapter1/a9e67142615f49863438cc0086b594e48984d1c9.jpeg)
## libuv架构
![libuv架构](https://yjhjstz.gitbooks.io/deep-into-node/content/chapter1/FuX1qcGJgwYtX9zNbBAOSaQeD8Qz.png)
## V8架构
![V8架构](https://yjhjstz.gitbooks.io/deep-into-node/content/chapter2/e09d7b330d9e754f7ff1282a1af55295.png)

现代JS引擎执行： 源代码(.js)→抽象语法树(AST)→字节码→JIT→本地代码

V8直接将AST通过JIT编译为本地代码，并且在生成本地代码以后采集相关信息，优化本地代码
## Isolate
![Isolate](https://yjhjstz.gitbooks.io/deep-into-node/content/chapter2/Context.png)

一个 Isolate 是一个独立的虚拟机。对应一个或多个线程。但同一时刻 只能被一个线程进入。所有的 Isolate 彼此之间是完全隔离的, 它们不能够有任何共享的资源。如果不显示创建 Isolate, 会自动创建一个默认的 Isolate。
## 堆的构成
![v8的堆](http://alinode-assets.oss-cn-hangzhou.aliyuncs.com/2336435d-bdd4-4d86-8e28-b253e7d7ad6a.png)

* 新生区
大多数对象开始时被分配在这里。新生区是一个很小的区域，垃圾回收在这个区域非常频繁，与其他区域相独立。
* 老生指针区
包含大多数可能存在指向其他对象的指针的对象。大多数在新生区存活一段时间之后的对象都会被挪到这里。
* 老生数据区
这里存放只包含原始数据的对象（这些对象没有指向其他对象的指针）。字符串、封箱的数字以及未封箱的双精度数字数组，在新生区经历一次 Scavenge 后会被移动到这里。
* 大对象区
这里存放体积超过 1MB 大小的对象。每个对象有自己 mmap 产生的内存。垃圾回收器从不移动大对象。
* Code区
代码对象，也就是包含 JIT 之后指令的对象，会被分配到这里。
* Cell 区、属性 Cell 区、Map 区
这些区域存放 Cell、属性 Cell 和 Map，每个区域因为都是存放相同大小的元素，因此内存结构很简单。

## 模块加载
1. 如果模块在缓存中，返回它的exports对象
2. 如果是原生的模块，通过 NativeModule.require() 返回结果
3. 否则，创建一个新的模块，并保存到缓存中

可见，被缓存命中的程序拥有最高加载权

## 事件循环
![事件循环](https://yjhjstz.gitbooks.io/deep-into-node/content/chapter5/5fee18eegw1ewjpoxmdf5j20k80b1win.jpg)

## Net网络
五元组 **<remoteAddress, remotePort, addressType, localAddress, localPort>** 标识一个唯一网络连接

主要 net 监听4个事件
* **connection事件** server 传回来一个 socket 对象
* **data事件** 服务器发回数据，data 是返回的事件
* **close事件** 监听服务器关闭
* **error事件** 监听传输中的错误事件