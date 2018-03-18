import { cutRod } from '../src/DynamicProgramming'

let price: number[] = [1, 5, 8, 9, 10, 17, 17, 20, 24, 30]

describe('动态规划', () => {
  test.only('朴素算法', () => {
    console.time('time')
    let max = cutRod(price, 10)
    console.timeEnd('time')
    console.log(max)
    expect(max).toBeGreaterThan(0)
  })
})
