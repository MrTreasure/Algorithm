import { produceNums } from './nums'

const arr = produceNums(10, 50)

export const bucket = (arr: number[]) => {
  const sorted = []
  const max = Math.max(...arr)
  const buckets = new Array(max).fill(0)

  arr.forEach(item => {
    buckets[item] += 1
  })

  buckets.forEach((item, index) => {
    if (item === 0) return
    for (let i = 0; i < item; i++) {
      sorted.push(index)
    }
  })
  return sorted
}

console.log(bucket(arr))
