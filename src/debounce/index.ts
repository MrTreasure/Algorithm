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


// test
function log (str: string | number) {
  console.log(str)
}

const debounceLog = debounce(2000, log)
const throttleLog = throttle(1, log)

debounceLog(1)
debounceLog(2)
debounceLog(3)

