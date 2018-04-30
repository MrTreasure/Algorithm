export const produceNums = (num: number): any[] => {
  const arr = []
  for (let index = 0; index < num; index++) {
    arr.push(~~(Math.random() * 100))
  }
  return arr
}
