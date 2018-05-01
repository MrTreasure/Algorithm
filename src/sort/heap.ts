function adjustHeap (arr: number[], pos: number, len: number) {
  let current = arr[pos]
  let child = pos * 2 + 1
  while (child < len) {
    if (child + 1 < len && arr[child] < arr[child + 1]) {
      child += 1
    }
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
