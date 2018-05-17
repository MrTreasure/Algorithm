import { produceNums } from './nums'

// 插入排序的思路
// 分为左右两个数组，左边是排序好的数组，右边是需要待插入的数组
function insert (arr: number[]): number[] {
  // 选择第 1 位数组元素
  for (let j = 1; j < arr.length; j++) {
    // 记录待插入元素的值
    let key = arr[j]
    // 从已排序数组选择最大的元素进行比较
    let i = j - 1
    // 如果当前比较的元素下标大于等于0或者元素值大于待插入元素
    while (i >= 0 && arr[i] > key) {
      // 将这个元素往右移动（因为key已经保存了待插入元素的值，如果当前的元素比这个值大，就往右移动）
      arr[i + 1] = arr[i]
      i = i - 1
    }
    // 最后i的下标会比插入的位置小1，因为 i--，将这个待插入元素插入指定位置
    arr[i + 1] = key
  }
  return arr
}

const arr = produceNums(5, 20)
console.log(arr)
console.log(insert(arr))
