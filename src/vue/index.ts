function defineReactive (obj: object, key: string, val: any) {
  observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get () {
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return val
    },
    set (newVal) {
      val = newVal
      console.log(`属性${key}已经被监听，值为：${val.toString()}`)
      dep.notify()
    }
  })
}

function observe (obj: object) {
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

class Dep {

  static target: Watcher

  private subs: any = []

  public addSub (sub) {
    this.subs.push(sub)
  }

  public notify () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

class Watcher {
  private cb: Function
  private vm: any
  private exp: any
  private value: any

  constructor () {
    this.value = this.get()
  }

  private run () {
    let value = this.vm.data[this.exp]
    let oldVal = this.value
    if (value !== oldVal) {
      this.value = value
      this.cb.call(this.vm, value, oldVal)
    }
  }

  private get () {
    Dep.target = this
    let value = this.vm.data[this.exp]
    Dep.target = null
    return value
  }
}

const dep = new Dep()
const watcher = new Watcher()
