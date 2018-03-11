import { Tree } from '../src/Tree/BinaryTree'
let arr = []
let tree: Tree = new Tree()
beforeAll(() => {
  for (let i = 0; i < 100000; i ++) {
    arr.push(~~(Math.random() * 100))
  }
  // console.log(arr)
  for(let i = 0; i < arr.length; i ++) {
    tree.insert(arr[i])
  }
})

describe('树的操作', () => {
  // test('常规排序', () => {
  //   console.log(arr.sort())
  //   expect(tree.getRoot()).not.toBe(null)
  // })

  // test('中序遍历', () => {
  //   tree.inOrder(tree.getRoot())
  //   console.log(tree.getList())
  //   tree.clearList()
  //   expect(tree.getRoot()).not.toBe(null)
  // })

  // test('先序遍历', () => {
  //   tree.preOrder(tree.getRoot())
  //   console.log(tree.getList())
  //   tree.clearList()
  //   expect(tree.getRoot()).not.toBe(null)
  // })

  // test('后序遍历', () => {
  //   tree.postOrder(tree.getRoot())
  //   console.log(tree.getList())
  //   tree.clearList()
  //   expect(tree.getRoot()).not.toBe(null)
  // })

  test('常规查找最大值', () => {
    let max = Math.max(...arr)
    console.log(max)
    expect(max).not.toBe(null)
  })

  test('二叉树查找最大值', () => {
    let maxNode = tree.getMax(tree.getRoot())
    console.log(maxNode.show())
    expect(maxNode).not.toBe(null)
  })

  test('常规查找给定值', () => {
    let val = arr.find(item => item === 99)
    expect(val).not.toBe(null)
  })

  test('二叉树查找给定值', () => {
    let node = tree.find(99)
    expect(node).not.toBe(null)
  })
  
})