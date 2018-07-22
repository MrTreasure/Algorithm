const obj = {
  name: 'Treasure',
  say() {
    console.log(this.name)
  }
}


class A {
  constructor() {
    this.name = 'Treasure'
  }

  say() {
    console.log(this.name)
  }
}

class B extends A {
  run() {
    console.log('run')
  }
}

const b = new B()

console.log(B.prototype.say)

const print = (obj) => {
  for (let key in obj) {
    console.log(key)
  }

  Object.keys(obj).forEach(key => console.log(key))

  Object.getOwnPropertyNames(obj).forEach(key => console.log(key))

  Reflect.ownKeys(obj).forEach(key => console.log(key))
}

print(b)
console.log(b.name)