import { produceNums } from './nums'

// 算法时间复杂度 O(n^2)
function select (arr: any[]): any[] {
  const sortedArr = []
  while (arr.length > 0) {
    // 每次选择最小的树放进数组
    let min = Math.min(...arr)
    // 找到这个数的下标并删除
    let index = arr.findIndex(item => item === min)
    sortedArr.push(min)
    arr.splice(index, 1)
  }
  return sortedArr
}

const arr = produceNums(20, 20)
console.log(arr)
console.time('sort')
console.log(select(arr))
console.timeEnd('sort')
