class Compile {
  private el: HTMLElement
  private vm: MVVM

  constructor (el: any, vm: MVVM) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    if (this.el) {
      const fragment = this.node2fragment(this.el)

      this.compile(fragment)

      this.el.appendChild(fragment)
    }
  }

  // 辅助方法
  private isElementNode (node) {
    return node.nodeType === 1
  }

  private isDirective (name: string) {
    return name.includes('v-')
  }

  // 核心方法
  private compileElement (node: Element) {
    let attrs = node.attributes
    Array.from(attrs).forEach(attr => {
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        let expr = attr.value
        let [, type] = attrName.split('-')

        CompileUtil[type](node, this.vm, expr)
      }
    })
  }

  private compileText (node: Element) {
    let expr = node.textContent
    let reg = /\{\{([^}]+)\}\}/g
    if (reg.test(expr)) {
      CompileUtil['text'](node, this.vm, expr)
    }
  }

  private compile (fragment: any) {
    let childNodes = fragment.childNodes
    Array.from(childNodes).forEach((node: Element) => {
      if (this.isElementNode(node)) {
        this.compileElement(node)
        this.compile(node)
      } else {
        this.compileText(node)
      }
    })
  }

  private node2fragment (el): DocumentFragment {
    const fragment = document.createDocumentFragment()
    let firstChild
    while (firstChild === el.firstChild) {
      fragment.appendChild(firstChild)
    }
    return fragment
  }
}

class CompileUtil {
  static updater = {
    textUpdate (node: Element, value: any) {
      node.textContent = value
    },
    modelUpdater (node: Element, value) {
      node.nodeValue = value
    }
  }

  static text (node: Element, vm: MVVM, expr: any) {
    let updateFn = this.updater['textUpdater']
    let value = this.getTextVal(vm, expr)
    expr.replace(/\{\{([^}]+)\}\}/g, (...args) => {
      const _ = new Watcher(vm, args[1], newValue => {
        updateFn && updateFn(node, this.getTextVal(vm, expr))
      })
    })
    updateFn && updateFn(node, value)
  }

  static setVal (vm: MVVM, expr, value) {
    expr = expr.split('.')
    return expr.reduce((prev, next, currentIndex) => {
      if (currentIndex === expr.length - 1) {
        return prev[next] = value
      }
      return prev[next]
    }, vm.$data)
  }

  static model (node: Element, vm: MVVM, expr: any) {
    let updateFn = this.updater['modelUpdater']
    const _ = new Watcher(vm, expr, newValue => {
      updateFn && updateFn(node, newValue)
    })
    node.addEventListener('input', (e: any) => {
      let newValue = e.target.value
      this.setVal(vm, expr, newValue)
    })
    updateFn && updateFn(node, this.getVal(vm, expr))
  }

  static getTextVal (vm, expr) {
    return expr.replace(/\{\{([^}]+)\}\}/g, (...args) => {
      return this.getTextVal(vm, args[1])
    })
  }

  static getVal (vm, expr) {
    expr = expr.split('.')
    return expr.reduce((prev, next) => {
      return prev[next]
    }, vm.$data)
  }
}

class Observer {
  constructor (data) {
    this.observe(data)
  }

  private observe (data) {
    if (!data || typeof data !== 'object') {
      return
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
      this.observe(data[key])
    })
  }

  private defineReactive (obj, key, value) {
    const self = this
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get () {
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set (newValue) {
        if (newValue !== value) {
          self.observe(newValue)
          value = newValue
          dep.notify()
        }
      }
    })
  }
}

class Watcher {
  private vm: MVVM
  private expr: string
  private cb: Function
  private value: any

  constructor (vm: MVVM, expr: string, cb: Function) {
    this.vm = vm
    this.expr = expr
    this.cb = cb
    this.value = this.get()
  }

  public update () {
    let newValue = this.getVal(this.vm, this.expr)
    let oldValue = this.value
    if (newValue !== oldValue) {
      this.cb(newValue)
    }
  }

  private getVal (vm: MVVM, expr) {
    expr = expr.split('.')
    return expr.reduce((prev, next) => {
      return prev[next]
    }, vm.$data)
  }

  private get () {
    Dep.target = this
    let value = this.getVal(this.vm, this.expr)
    Dep.target = null
    return value
  }
}

class Dep {
  static target: Watcher

  private subs: Watcher[] = []

  public addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  public notify () {
    this.subs.forEach(watcher => watcher.update())
  }

}

class MVVM {
  public $data: any
  private $el: HTMLElement
  

  constructor (options) {
    this.$el = options.el
    this.$data = options.data

    if (this.$el) {
      let _
      _ = new Observer(this.$data)
      this.proxyData(this.$data)
      _ = new Compile(this.$el, this)
    }
  }

  private proxyData (data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get () {
          return data[key]
        },
        set (newValue) {
          data[key] = newValue
        }
      })
    })
  }
}



// 主程序开始
const app = document.querySelector('#app')
const options = {
  el: app,
  data: {
    name: 'Treasure',
    age: 22,
    school: {
      name: '成都大学',
      profession: '数字媒体技术'
    }
  }
}
const vm = new MVVM(options)
console.log(vm)
