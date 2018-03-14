import { Tree } from './Tree/BinaryTree'
import { RBTree } from './Tree/RBTree'
const arr = []
for (let i = 0; i < 10; i ++) {
  arr.push(~~(Math.random() * 100))
}

let rbTree = new RBTree()


let tree = new Tree()
for(let i = 0; i < arr.length; i ++) {
  tree.insert(arr[i])
}
tree.inOrder(tree.getRoot())
