// 两数相加
const twoSum = (nums: number[], target: number) => {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], i)
  }
  for (let index = 0; index < nums.length; index++) {
    if (map.has(target - nums[index]) && map.get(target - nums[index]) !== index) {
      return [index, map.get(target - nums[index])]
    }
  }
}

// 两数相加
const addTwoNumbers = (l1, l2) => {
  let length1 = 0
  let length2 = 0

  let current = l1

  while (current.next) {
    length1++    
  }

  current = l2
  while (current.next) {
    length2++
  }

  let max = Math.max(length1, length2)
  const arr = []
  
  for (let i = 0; i < max;i++) {
    let A = l1.val  
  }

 
}

// 最小硬币问题
const coin = price => {
  const map = new Map<number, number>()
  map.set(0, 0)
  map.set(1, 1)
  map.set(2, 2)
  map.set(3, 1)
  map.set(4, 2)
  map.set(5, 1)
  for (let i = 6; i <= price; i++) {
    map.set(i, Math.min(...[map.get(i - 1) + 1, map.get(i - 3) + 1, map.get(i - 5) + 1]))
  }
  return map.get(price)
}

// 斐波那契数列
const Fibonacci = (n: number) => {
  const map = new Map()
  map.set(1, 1)
  map.set(2, 1)

  const solve = num => {
    if (num === 1 || num === 2) {
      return map.get(1)
    }
    for (let i = 3; i <= num; i++) {
      let A = map.get(i - 2)
      let B = map.get(i - 1)
      // console.log(A, B)
      map.set(i, A + B)
    }
    return map.get(num)
  }
  return solve(n)
}

// 小偷问题
const robber = nums => {
  const map = new Map()
  map.set(0, nums[0])
  map.set(1, Math.max(nums[0], nums[1]))


  const solve = (index, nums) => {
    if (index === 0) {
      return map.get(0)
    }
    if (index === 1) {
      return map.get(1)
    }
    
    for (let i = 2; i < nums.length; i++) {
      let A = map.get(i - 2)
      let B = map.get(i - 1)
      map.set(i, Math.max(A, B))
    }
    
    return map.get(nums.length - 1)
  }
  
  if (nums.length === 0) return 0
  return solve(nums.length - 1, nums)
}

// 切割钢铁
// const cutRod = size => {
//   const price = [1, 5, 8, 10, 13, 17, 18, 22, 25, 30]
//   const map = new Map()



