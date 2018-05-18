class MyPromise {
  private status: STATUS = STATUS.PENDING
  private value: any
  private reason: any
  private onResolveCallbacks: Function[] = []
  private onRejectCallbacks: Function[] = []

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

    executor(resolve, reject)
  }

  public then (onFulfilled, onReject?) {

    function resolvePromise (promise, res, resolve, reject) {
      if (promise === res) {
        return reject(new TypeError('循环引用'))
      }
      let then
      let called

      if (res !== null && ((typeof res === 'object' || typeof res === 'function'))) {
        try {
          then = res.then
          if (typeof then === 'function') {
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

    let promise2
    const self = this
    if (this.status === STATUS.FULFILLED) {
      promise2 = new MyPromise((resovle, reject) => {
        setImmediate(() => {
          try {
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

  public catch (onReject) {
    this.onResolveCallbacks.push(onReject)
  }
}

interface IExecutor {
  (resolve: Function, reject: Function): void
}

enum STATUS {
  PENDING,
  FULFILLED,
  REJECTED
}

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
