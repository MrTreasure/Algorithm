export const produceNums = (num: number, range: number): any[] => {
  const arr = []
  for (let index = 0; index < num; index++) {
    arr.push(~~(Math.random() * range))
  }
  return arr
}
