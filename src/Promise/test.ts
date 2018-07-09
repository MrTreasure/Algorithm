class NPromise {
  private status: STATUS = STATUS.IPENDING
  private value: any = null
  private reason: any = null
  private fulfillCallback: Function[] = []
  private rejectCallback: Function[] = []


  constructor (excutor: Function) {
    const self = this

    const resolve = (res) => {
      setImmediate(() => {
        self.status = STATUS.IFULFILLED
        self.value = res
        self.fulfillCallback.forEach(fun => {
          fun(res)
        })
      })
    }

    const reject = (err) => {
      setImmediate(() => {
        self.status = STATUS.IREJECTED
        self.reason = err
        self.rejectCallback.forEach(fun => {
          fun(err)
        })
      })
    }

    excutor(resolve, reject)
  }

  public then (onFulfilled, onReject) {
    const self = this
    let promise

    if (this.status === STATUS.IFULFILLED) {
      promise = new NPromise((reslove, reject) => {
        setImmediate(() => {
          try {
            let res = onFulfilled(self.value)
            resolvePromise(promise, res, reslove, reject)
          } catch (error) {
            onReject(error)
          }
        })
      })
    }
    
    if (this.status === STATUS.IREJECTED) {
      promise = new NPromise((resolve, reject) => {
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
    
    if (this.status === STATUS.IPENDING) {
      promise = new NPromise((resolve, reject) => {
        self.fulfillCallback.push(value => {
          try {
            let res = onFulfilled(value)
            resolvePromise(promise, res, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
        self.rejectCallback.push(reason => {
          try {
            let res = onReject(reason)
            resolvePromise(promise, res, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      })
    }
  }
}

function resolvePromise (promise, res, resolve, reject) {
  let then
  let called
  if (res && (typeof res === 'object' || typeof res === 'function')) {
    try {
      then = res.then
      if (typeof then === 'function') {
        then.call(res, res2 => {
          if (called) return
          called = true
          resolvePromise(promise, res2, resolve, reject)
        }, err => {
          if (called) return
          called = true
          reject(err)
        })
      } else {
        resolve(res)
      }
    } catch (error) {
      reject(error)
    }
  } else {
    resolve(res)
  }
}

enum STATUS {
  IPENDING,
  IFULFILLED,
  IREJECTED
}
