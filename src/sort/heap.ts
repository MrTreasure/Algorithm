import { produceNums } from './nums'

/* 排序思路：（降序）
 * 将堆根保存于尾部，并对剩余序列调用调整函数，调整完成后，再将最大跟保存于尾部-1（-1，-2，...，-i），
 * 再对剩余序列进行调整，反复进行该过程，直至排序完成。
 */

 /* 将最大的元素调整到堆顶*/
function adjustHeap (arr: number[], pos: number, len: number) {
  // 保存当前节点
  let current = arr[pos]
  // 定位到当前节点的左边的子节点
  let child = pos * 2 + 1
  // 递归遍历所有的子节点
  while (child < len) {
    // 判断当前节点是否有右节点，若右节点较大，就采用右节点和当前节点进行比较
    if (child + 1 < len && arr[child] < arr[child + 1]) {
      child += 1
    }
    // 比较当前节点和最大的子节点，小于就交换，交换后将当前节点定位到子节点上
    if (arr[pos] < arr[child]) {
      arr[pos] = arr[child]
      pos = child
      child = pos * 2 + 1
    } else {
      break
    }
    arr[pos] = current
  }
}

function heapSort (arr: number[]) {
  /* 构建堆：
  * 满足：树中任一非叶子结点的关键字均不大于（或不小于）其左右孩子结点的关键字。
  * 实现：从最后一个拥有子节点的节点开始，将该节点和其他节点进行比较，将最大的数交换给该节点，
  *      交换后再依次向前节点进行相同的交换处理，直到构建出大顶堆。
  */
  for (let i = Math.floor(arr.length / 2 - 1);i >= 0;i--) {
    adjustHeap(arr, i, arr.length)
  }

   // 从数组的尾部进行调整
  for (let i = arr.length - 1; i > 0; i--) {
    // 堆顶永远是最大的元素,将堆顶和尾部元素交换，最大元素就保存在尾部，并且不参与后面的调整
    let tail = arr[i]
    arr[i] = arr[0]
    arr[0] = tail
    // 将最大的元素进行调整，将最大的元素调整到堆顶
    adjustHeap(arr, 0, i)
  }
  return arr
}


const arr = produceNums(5, 10)
console.log(arr)
console.log(heapSort(arr))
