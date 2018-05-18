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
    this.onResolveCallbacks.push(onFulfilled)
    if (onReject) {
      this.onRejectCallbacks.push(onReject)
      return
    }
    return this
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
  console.log(res)
  return 4
}).then((res) => {
  console.log(res)
})
