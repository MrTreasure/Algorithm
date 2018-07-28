function observe (obj) {
  if (obj.__ob__) {
    return obj
  } else {
    return new Proxy(obj, {
      get (target, key) {
        if (typeof target[key] === 'object' && !target.__ob__) {
          target[key] = observe(target[key])
          target.__ob__ = true
        }
        console.log(`get : ${target[key]}`)
        return target[key]
      },
      set (target, key, val) {
        console.log(`set ${key} to ${val}`)
        target[key] = val
      }
    })
  }
}

const obj = { a: 1 }

const p = observe(obj)
p.a
p.a = 3