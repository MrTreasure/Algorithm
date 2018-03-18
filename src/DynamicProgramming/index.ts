export const cutRod = (p: number[], n: number) => {
  let q: number = 0
  let maxIndex: number = 0
  if (n === 0) {
    return 0
  }
  for (let i = 1; i < n; i++) {
    let temp = Math.max(q, p[i] + cutRod(p, n - i))
    if (temp !== q) {
      maxIndex = i
    }
    q = temp
  }
  return maxIndex
}
