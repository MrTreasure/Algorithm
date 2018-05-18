import { produceNums } from './nums'
// 冒泡排序时间复杂度O(n^2)
function bubble (arr: number[]): number[] {
  // -1是因为不需要把下标移动到最后一个
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}

const arr = produceNums(10, 20)
console.log(bubble(arr))
