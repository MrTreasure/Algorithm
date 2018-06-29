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

namespace Coin {
  const coins = [1, 3, 5]
  export const minCoin = (price): number => {
    if (price <= 0) {
      return 0
    }
    if (price === 1) {
      return 1
    }
    if (price === 2) {
      return 2
    }
    if (price === 3) {
      return 1
    }
    if (price === 4) {
      return 2
    }
    if (price === 5) {
      return 1
    }
    return Math.min(...[minCoin(price - 1) + 1, minCoin(price - 3) + 1, minCoin(price - 5) + 1])
  }
}

const Fibonacci = (n: number) => {
  const map = new Map()
  map.set(1, 1)
  map.set(2, 1)

  const solve = num => {
    if (num === 1 || num === 2) {
      return map.get(1)
    }
    for (let i = 3; i < num; i++) {
      let A = map.get(num - 2)
      let B = map.get(num - 1)
      console.log(A, B)
      map.set(num, A + B)
    }
    return map.get(num)
  }
  return solve(n)
}

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

console.log(Fibonacci(4))
