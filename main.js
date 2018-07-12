const obj = new Proxy({}, {
  get(target, key) {
    if (key in target) {
      console.log(key, typeof key)
      return target[key]
    } else {
      // console.log(`didn't find ${key} in ${target}, set it undefined`)
      target[key] = undefined
    }
  },
  set(target, key, val) {
    target[key] = val
  }
})

console.log(obj.a)
console.log(obj.a)
console.log(obj)