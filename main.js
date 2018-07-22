const chalk = require('chalk')
function A() {
  this.name = 'Treasure'
}

A.prototype.say = function() {
  console.log(this.name)
}

const a = new A()

function B () {
  this.age = 22
}

B.prototype = new A()
B.prototype.run = function () {
  console.log('run')
}

class classA {
  constructor() {
    this.name = 'Treasure'
  }

  say() {
    console.log(this.name)
  }
}

class classB extends classA {
  constructor(props) {
    super(props)
    this.age = 22
  }
  run() {
    console.log(run)
  }
}

const b = new B()
const classb = new classB()

const print = (obj) => {
  const result = []
  for (let key in obj) {
    result.push(key)
  }
  console.log(chalk.red(result.join(',')))

  console.log(chalk.green(Object.keys(obj).reduce((prev, next) => { return prev + ',' + next})))

  console.log(chalk.yellow(Object.getOwnPropertyNames(obj).reduce((prev, next) => { return prev + ',' + next})))

  console.log(chalk.blue(Reflect.ownKeys(obj).reduce((prev, next) => { return prev + ',' + next})))
}

console.log('ES5 -> B')
print(b)

console.log('ES6 -> B')
print(classb)