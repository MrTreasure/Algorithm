import { produceNums } from './nums'
 
function quick (arr: any[]): any[] {
  const less = []
  const more = []
  let current = arr[0]
  if (arr.length < 2) {
    return arr
  } else {
    for (let i = 1;i < arr.length;i++) {
      if (arr[i] <= current) {
        less.push(arr[i])
      } else {
        more.push(arr[i])
      }
    }
    return [].concat(quick(less), current, quick(more))
  }
}

const arr = produceNums(20)
console.log(quick(arr))
