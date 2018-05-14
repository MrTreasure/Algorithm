class Foo {
  propA: any
  propB: any

  constructor () {
    this.propA = 'A'
    this.propB = 'B'
  }

  attrA () {
    console.log('A')
  }
  attrB () {
    console.log('B')
  }
}

class Bar extends Foo {
  propC: any

  constructor () {
    super()
    this.propC = 'C'
  }

  attrC () {
    console.log('C')
  }
}

const bar = new Bar()

for (let key in bar) {
  console.log(key)
}

Object.keys(bar).map(item => {
  console.log(item)
})

