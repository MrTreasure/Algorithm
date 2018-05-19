## 前言
```javascript
const p = new Promise((resolve, reject) => {
  console.log('A')
  setTimeout(() => {
    console.log('B')
    resolve('C')
  })
})

p.then(res => {
  console.log(res)
})

// A B C D
```
尽管工作中用了无数次Promise async await，但是在写下这篇文章之前，却不知道Promise背后发生了些什么，我一直以为的逻辑是先等待Promise构造方法中的异步函数完成后，再调用then方法执行其中的函数。然而事情并没有这么简单，这篇文章将以深入浅出的方式理解Promise背后究竟发生了什么

### 构造一个Promise
按照Promise/A+规范，一个Promise应该包含以下数据结构
```javascript
interface IPromise {
  status: STATUS // 表明当前Promise的状态，不可逆，在进行then添加方法时，会根据这个状态做出不同的处理
  value: any // 异步函数执行成功后返回的值
  reason: any // 异步函数执行失败后返回的值
  onResolvedCallbacks: Function[] // 保存then方法添加的成功后执行函数
  onRejectCallbacks: Function[] // 保存then方法添加的失败后的执行函数
}

enum STATUS {
  PENDING,
  FULFILLED,
  REJECTED
}
```
接着动手实现一个Promise，因为在TS环境中Promise已经有了，为了避免和已有的冲突，我把自己构造的对象命名为MyPromise
```javascript
class MyPromise {
  private status: STATUS
  private value: any
  private reason: any
  private onResolvedCallBacks: Function [] = []
  private onRejectCallBacks: Function [] = []

  constructor(executor: Function) {
    const self = this
    function resolve(value: any) {
      // 改变当前Promise的状态
      if (p.status === STATUS.PENDING) {
        p.stats = STATUS.FULFILLED
        p.value = value
        p.onResolveCallbacks.forEach(fun => {
          fun(p.value)
        })
      }
    }
    function reject(reason: any) {
      if (p.status === STATUS.PENDING) {
        p.status = STATUS.REJECTED
        p.reason = reason
        p.onRejectCallbacks.forEach(fun => fun(reason))
      }
    }
  }

  public then(onFulfilled: Function, onReject?: Function) {
    this.onResolveCallbacks.push(onFulfilled)
    if (onReject) {
      this.onRjectCallback.push(onRject)
      return
    }
    return this
  }
}
```
这是一个最最基本的Promise实现，写到这里我们试着从代码中了解下Promise究竟干了些什么。
我们知道JS是异步非阻塞单线程的语言，遇到异步任务时，将会向事件队列添加一个函数，直到异步任务完成时，线程再执行这个函数，基于此，在JS中很多地方用到了订阅者模式。

Promise正好是一个订阅者模式的实现```executor```就是我们添加的订阅的数据源，我们向这个源注册了两个钩子```resolve, reject```,分别在异步事件的成功和失败时执行，相当于订阅者的```notify```方法。

而```then```方法则是向订阅者注册事件。这样就能初步理解Promise干了什么。

### resolve,reject方法的改进
按照Promise预期的设计，then方法时同步的向Promise的待处理队列添加函数，而executor函数则是异步的执行一个函数，再调用其中的resolve或者reject方法，也就是说then一定先于executor执行。上面的代码中如果executor是一个同步的方法，那么新建这个MyPromise实例时，resolve就已经被调用了，导致then添加的方法无法执行。所以我们需要做出一定的处理，保证resolve之前，已经注册了事件处理函数
```javascript
function reject (value: any) {
  // 调用setImmediate方法，保证resolve一定会在通过then同步的注册的方法后调用
  // setImmediate将会把回调中的函数加入到下一个task，优先级要比setTimeout高
  // JS中的Promise.resolve方法时将回调中的函数加入到当前的microtask队列，优先级要比前者高
  setImmediate(() => {
    if (p.status === STATUS.PENDING) {
      p.stats = STATUS.FULFILLED
      p.value = value
      p.onResolveCallbacks.forEach(fun => {
        fun(p.value)
      })
    }
  })
}
```

### then方法中添加Promise的链式调用
之前的MyPromise通过then方法注册事件后，虽然返回了this能够进行链式调用，但是如果注册的事件返回的是Promise，包含异步的事件则会出错。针对这种状况我们需要进行特殊的处理
```javascript
public then (onFulfilled: Function, onReject?: Function) {
  // 包装一个Promise
  let promise2: MyPromise
  // 保存当前this——外部的Promise
  const self: MyPromise = this
  // 如果当前异步函数执行成功，得到了值
  if (this.status === STATUS.FULFILLED) {
    // 声明一个新的 promise2
    promise2 = new MyPromise((resovle, reject) => {
      setImmediate(() => {
        try {
          // then添加的方法返回一个promise
          let res = onFulfilled(self.value)
          resolvePromise(promise2, res, resovle, reject)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  if (this.status === STATUS.PENDING) {
    promise2 = new MyPromise((reslove, reject) => {
      self.onResolveCallbacks.push(value => {
        try {
          let res = onFulfilled(value)
          resolvePromise(promise2, res, reslove, reject)
        } catch (error) {
          reject(error)
        }
      })
      self.onRejectCallbacks.push(reason => {
        try {
          let res = onReject(reason)
          resolvePromise(promise2, res, reslove, reject)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  function resolvePromise (promise: MyPromise, res: any, resolve: Function, reject: Function) {
    // 暂时不清楚什么情况下会出现循环应用
    if (promise === res) {
      return reject(new TypeError('循环引用'))
    }
    let then
    let called
    
    // 如果onFulfilled方法返回的res不为空，并且可能是object（可能是一个Promise或者一般对象）或者function
    if (res !== null && ((typeof res === 'object' || typeof res === 'function'))) {
      try {
        then = res.then
        // 如果res具有then属性，并且是一个function，说明可能是一个Promise(这里应该用类型判断)
        if (typeof then === 'function') {
          // 重复调用then方法, 直到res不再是一个Promise
          then.call(res, function (res2) {
            // 每次调用then方法都会返回一个新的Promise，如果当前的Promise已经注册过事件了，将会直接return
            if (called) return
            called = true
            resolvePromise(promise, res2, resolve, reject)
          }, function (err) {
            if (called) return
            called = true
            reject(err)
          })
        } else {
          // 调用resolve
          resolve(res)
        }
      } catch (error) {
        if (called) return
        called = true
        reject(error)
      }
    } else {
      resolve(res)
    }
  }
  
  return promise2
}
```
改进后的then方法改进了两个地方
1. 判断通过then方法注册事件时Promise的状态，一个Promise的状态应该是确定的不可逆的，即只能从PENDING状态转换为fulfilled或者reject，当调用then方法注册事件时，如果此时这个Promise已经不是PENDING了，将会根据现在的Promise类型执行then注册的函数
2. 每次调用then方法进行函数注册的时候都会返回一个新的Promise，这个Promise保证了then的链式调用。接着我们考虑了注册的onFulfilled函数，如果这个函数返回的是一个Promise，则继续向它注册事件

### 小结
1. Promise本质就是一个发布订阅模式，异步函数是整个模型的驱动器，完成时调用resolve执行成功方法，then是向该模型注册事件
2. Promise巧妙的利用发布订阅模式，将异步事件的发生与发生之后的执行解耦了，通过resolve钩子触发注册的函数，使得我们的关注点在then之后的方法
3. Typescript用起来真是爽

这篇文章只是简单的介绍了Promise背后执行的原理，还有Promise.all Promise.race方法没有实现，不过已经不重要了，我们只需要记得Promise是一个发布订阅模式就OK，generator和 async await的方法也没有实现。不过基于此，可以大胆的猜测。通过await执行的Promise，是将原本resolve我们注册的函数改为了执行await方法中的函数，再把值取出来给我们调用。大抵应该是这个原理。实现上需要写一个generator runtime这也超过大部分人的能力。因此能够用好async await就好了。

本文的源代码在 [Github](../src/Promise/index.ts) 欢迎star

本文参考自文章 [确认过眼神，你就是我的Promise~~](https://juejin.im/post/5af8ee2bf265da0b8f62a757#heading-10)

以上都是我瞎编的