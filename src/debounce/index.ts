const debounce = (dealy: number, fun: Function): Function => {
  let timer = null
  return function (...args) {
    if (timer) {
      global.clearTimeout(timer)
      timer = null
    }
    timer = global.setTimeout(() => {
      fun.apply(null, args)
    }, dealy)
  }
}

const throttle = (dealy: number, fun: Function): Function => {
  let timer = null
  return function (...args) {
    if (timer) return
    timer = global.setTimeout(() => {
      fun.apply(null, args)
      timer = null
    }, dealy)
  }
}

const decoratorDebounce = (dealy: number) => {
  
  return (target, propertyKey, descriptor) => {
    let timer = null
    let method = descriptor.value
    descriptor.value = function (...args) {
      if (timer) {
        // console.log(timer)
        global.clearTimeout(timer)
      } else {
        console.log('here')
        timer = global.setTimeout(() => {
          console.log('excute')
          method.apply(target, args)
        }, dealy)
      }
    }
  }
}

const decoratorThrottle = (dealy: number) => {
  let timer = null
  return (target, propertyKey, descriptor) => {
    let method = descriptor.value
    descriptor.value = function (...args) {
      if (timer) {
        return
      } else {
        timer = global.setTimeout(() => {
          return method.apply(target, args)
        }, dealy)
      }
    }
  }
}


// test
function log (str: string | number) {
  console.log(str)
}

// const debounceLog = debounce(2000, log)
// const throttleLog = throttle(1, log)

// debounceLog(1)
// debounceLog(2)
// debounceLog(3)

class Test {
  @decoratorDebounce(1000)
  say (str) {
    console.log(str)
  }
}

const test1 = new Test()
test1.say(1)
test1.say(2)
test1.say(3)

