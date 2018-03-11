import { Tree } from './Tree/BinaryTree'

const arr = []
for (let i = 0; i < 10; i ++) {
  arr.push(~~(Math.random() * 100))
}

console.log(arr)

let tree = new Tree()
for(let i = 0; i < arr.length; i ++) {
  tree.insert(arr[i])
}
tree.inOrder(tree.getRoot())