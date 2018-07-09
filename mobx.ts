class NPromise {
  private status: STATUS = STATUS.PENDING
  private value: any
  private reason: any
  private onFulFillCallback: Function[] = []
  private onRejectCllback: Function[] = []


  constructor (exector) {
    const self = this
    const resolve = res => {
      setImmediate(() => {
        self.status = STATUS.FULFILLED
        self.onFulFillCallback.forEach(fun => {
          fun(self.value)
        })
      })
    }
    const reject = res => {
      setImmediate(() => {
        self.status = STATUS.REJECTED
        self.onRejectCllback.forEach(fun => {
          fun(self.reason)
        })
      })
    }
  }

  static race (promiseList: NPromise[]) {
    return new NPromise((resolve, reject) => {
      for (let p of promiseList) {
        p.then(resolve, reject)
      }
    })
  }

  static all (promiseList: NPromise[]) {
    return new NPromise((resolve, reject) => {
      let i = 0
      let len = promiseList.length
      let count = len
      const result = []

      const resolveAll = (index, value) => {
        result[index] = value
        if (--count === 0) {
          resolve(result)
        }
      }

      const resolver = index => value => resolveAll(index, value)
      const rejecter = reason => reject(reason)

      for (; i < len; i++) {
        promiseList[i].then(resolver(i), rejecter)
      }
    })
  }

  public then (onFulFilled, onRject) {
    const self = this
    let promise: NPromise
    
    if (this.status === STATUS.FULFILLED) {
      promise = new NPromise((resolve, reject) => {
        try {
          let res = onFulFilled(self.value)
          resolvePromise(promise, res, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    }

    if (this.status === STATUS.REJECTED) {
      promise = new NPromise((resolve, reject) => {
        try {
          let res = onRject(self.reason)
          resolvePromise(promise, res, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    }

    if (this.status === STATUS.PENDING) {
      promise = new NPromise((resolve, reject) => {
        self.onFulFillCallback.push(value => {
          try {
            let res = onFulFilled(self.value)
            resolvePromise(promise, res, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
        self.onRejectCllback.push(reason => {
          try {
            let res = onRject(self.reason)
            resolvePromise(promise, res, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      })
    }
    
    return promise
  }
}

function resolvePromise (promise, res, resolve, reject) {
  let then
  let called = false
  if (res && (typeof res === 'object' || typeof res === 'function')) {

    then = res.then

    if (typeof then === 'function') {
      try {
        then.call(res, (value) => {
          if (called) return
          called = true
          resolvePromise(promise, value, resolve, reject)
        }, err => {
          if (called) return
          called = true
          reject(err)
        })
      } catch (error) {
        reject(error)
      }
    } else {
      resolve(res)
    }
    
  } else {

    resolve(res)
  }
}

enum STATUS {
  PENDING,
  FULFILLED,
  REJECTED
}

const inOrder = (root, callback) => {
  const stack = []
  let current = root
  
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current)
      current = current.left    
    }
    if (stack.length > 0) {
      current = stack.pop()
      callback(current.val)
      current = current.right
    }
  }
}

const preOrder = (root, callback) => {
  const stack = []
  let current

  stack.push(root)

  while (stack.length > 0) {
    current = stack.pop()
    callback(current.val)

    if (current.right) {
      stack.push(current.right)
    }

    if (current.left) {
      stack.push(current.left)
    }
  }
}

const postOrder = (root, callback) => {
  const stack = []
  let current = root
  let prev

  while (current || stack.length > 0) {
    if (current) {
      stack.push(current.left)
      current = current.left
    } else {
      current = stack[stack.length - 1]
      if (current.rihgt && current.right !== prev) {
        stack.push(current.right)
        current = current.left
      } else {
        current = stack.pop()
        callback(current.val)
        prev = current
        current = null
      }
    }
  }
}

const insert = (root, val) => {
  const node = { val }
  let parent
  let current = root
  if (!root) {
    root = node
    return
  }

  while (current) {
    parent = current
    if (current.left.val > val) {
      current = current.left
      if (!current) {
        parent.left = node
        break
      }
    } else {
      current = current.right
      if (!current) {
        parent.right = node
        break
      }
    }
  }
}
