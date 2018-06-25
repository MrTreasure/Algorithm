const removeDuplicates = (nums: number[]) => {
  nums.reduce((prev, current, currentIndex) => {
    if (prev === current) {
      nums.splice(currentIndex,1)
      return prev
    } else {
      return current
    }
  }, nums[0])
  return nums
}

class A {
  static c: number = 3
  a: number = 1
  
  say () {
    return null
  }
}

class B extends A {
  static d: number = 3
  b: number = 2
  hello () {
    return null
  }
}
// B.prototype['d'] = 1

const b = new B()

console.log(Object.keys(b))

for (let key in b) {
  console.log(key)
}


console.log(Object.getOwnPropertyNames(b))

const dealy = (dealy: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    global.setTimeout(() => {
      resolve()
    }, dealy)
  })
}

