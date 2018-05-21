// class Observer {
//   private data: object
  
//   constructor (data) {
//     this.data = data
//   }

//   private walk (data) {
//     const self = this
//     Object.keys(data).forEach(key => {
//       self.defineReactive(data, key, data[key])
//     })
//   }

//   private defineReactive (obj: object, key: string, val: any) {
//     const dep = new Dep()
//     const childObj = observe(val)
//     Object.defineProperty(obj, key, {
//       enumerable: true,
//       configurable: true,
//       get () {
//         if (Dep.target) {
//           dep.addSub(Dep.target)
//         }
//         return val
//       },
//       set (newVal) {
//         val = newVal
//         console.log(`属性${key}已经被监听，值为：${val.toString()}`)
//         dep.notify()
//       }
//     })
//   }
// }

// function observe (obj: object) {
//   if (!obj || typeof obj !== 'object') return
//   return new Observer(obj)
// }

// class Dep {

//   static target: Watcher

//   private subs: any = []

//   public addSub (sub) {
//     this.subs.push(sub)
//   }

//   public notify () {
//     this.subs.forEach(sub => {
//       sub.update()
//     })
//   }
// }

// class Watcher {
//   private cb: Function
//   private vm: MyVue
//   private exp: string
//   private value: any

//   constructor (vm, exp, cb) {
//     this.vm = vm
//     this.exp = exp
//     this.cb = cb
//     this.value = this.get()
//   }

//   private update () {
//     let value = this.vm.data[this.exp]
//     let oldVal = this.value
//     if (value !== oldVal) {
//       this.value = value
//       this.cb.call(this.vm, value, oldVal)
//     }
//   }

//   private get () {
//     Dep.target = this
//     let value = this.vm.data[this.exp]
//     Dep.target = null
//     return value
//   }
// }

// class MyVue {
//   public data: object
//   private el: HTMLElement
//   private exp: string

//   constructor (data, el, exp) {
//     this.data = data
//     this.el = el
//     this.exp = exp
//     this.el.innerHTML = this.data[exp]
//     const _ = new Watcher(this, exp, value => {
//       this.el.innerHTML = value
//     })
//   }
// }

// const dep = new Dep()

// // 代码运行开始
// const app = document.querySelector('#app')

// const data = {
//   name: 'Treasure'
// }
// const vm = new MyVue(data, app, 'name')

// window.setTimeout(() => {
//   console.log('change')
//   data.name = 'Sunshine'
// }, 2000)
