@setCheck
class A {
  constructor(name) {
    this.name = name
  }
}

function setCheck(target) {
  target.check = true
}

const a = new A('A')
console.log(a.name)
console.log(a.check)