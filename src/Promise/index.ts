interface IExecutor {
  (resolve: Function, reject: Function): void
}

enum STATUS {
  PENDING,
  FULFILLED,
  REJECTED
}

class MyPromise {
  private status: STATUS = STATUS.PENDING
  private value: any
  private reason: any
  private onResolveCallbacks: Function[] = []
  private onRejectCallbacks: Function[] = []
  private executor: Function
  private resolve: Function
  private reject: Function

  constructor (executor: IExecutor) {
    let p = this
    function resolve (value: any) {
      setImmediate(() => {
        if (p.status === STATUS.PENDING) {
          p.status = STATUS.FULFILLED
          p.value = value
          p.onResolveCallbacks.forEach(fun => fun(value))
        }
      })
    }

    function reject (reason: any) {
      setImmediate(() => {
        if (p.status === STATUS.PENDING) {
          p.status = STATUS.REJECTED
          p.reason = reason
          p.onRejectCallbacks.forEach(fun => fun(reason))
        }
      })
    }

    // this.executor = executor
    // this.resolve = resolve
    // this.reject = reject
    executor(resolve, reject)
  }

  /**
   * @method then 将异步执行完后的方法添加到 Promise 执行队列中
   * @param {onFulfilled: Function} 异步执行成功时的函数
   * @param {onReject: Function} 异步执行失败时的函数
   */
  public then (onFulfilled: Function, onReject?: Function) {
    // 包装一个Promise
    let promise2: MyPromise
    // 保存当前this，外部的Promise
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
    if (this.status === STATUS.REJECTED) {
      promise2 = new MyPromise((resolve, reject) => {
        setImmediate(() => {
          try {
            let res = onReject(self.reason)
            resolvePromise(promise2, res, resolve, reject)
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
    return promise2
  }

  /**
   * @description 和then方法的区别在于不再返回promise，一旦调用catch表示当前promise调用链的终结(原始的promise中没有这个限制，在未来的版本，catch之后还会条件finally事件)
   * @param onReject 异步发生错误时执行的回调
   */
  public catch (onReject) {
    const self = this
    const promise = new MyPromise((resolve, reject) => {
      setImmediate(() => {
        try {
          let res = onReject(self.reason)
          resolvePromise(promise, res, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    })
  }
}

/**
 * @function resolvePromise
 * @param promise 
 * @param res 
 * @param resolve 
 * @param reject 
 */
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

// 测试代码
let p = new MyPromise((resolve, reject) => {
  console.log(1)
  setTimeout(() => {
    console.log(2)
    resolve(3)
  }, 1000)
})


p.then((res) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(res)
      resolve(4)
    }, 1000)
  })
}).then((res) => {
  console.log(res)
})

p.then(res => {
  console.log('p1:', res)
})

p.then(res => {
  console.log('p1:', res)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('p2 1')
    resolve(4)
  })
})

p2.then((res) => {
  console.log('p2:' + res)
})

setTimeout(() => {
  p2.then((res) => {
    console.log('p2:' + res)
  })
}, 2000)

