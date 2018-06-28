/**
 * @name 二叉树的迭代遍历
 */

const root = {
  val: 3,
  left: {
    val: 9
  },
  right: {
    val: 20,
    left: {
      val: 15
    },
    right: {
      val: 7
    }
  }
}

const arr = [3, 9, 20, null, null, 15, 9]

export class Tree {
  static preOrder (node) {
    const stack = []
    let current
    stack.push(node)
    while (stack.length > 0) {
      current = stack.pop()
      console.log(current.val)
      if (current.right) {
        stack.push(current.right)
      }
      if (current.legt) {
        stack.push(current.left)
      }
    }
  }

  static inOrder (node) {
    const stack = []
    let current = node
    while (current || stack.length > 0) {
      while (current) {
        stack.push(current)
        current = current.left
      }
      if (stack.length > 0) {
        current = stack.pop()
        console.log(current.val)
        current = current.right
      }
    }
  }

  static postOrder (node) {
    const stack = []
    let current = node
    let prev = null
    while (current || stack.length > 0) {
      if (current) {
        stack.push(current)
      } else {
        current = stack[stack.length - 1]
        if (current.right && current.right !== prev) {
          current = current.right
        } else {
          current = stack.pop()
          console.log(current.val)
          prev = current
          current = null
        }
      }
    }
  }

  static postOrder2 (node) {
    const stack = []
    const arr = []
    let current = null
    stack.push(node)
    while (stack.length > 0) {
      current = stack.pop()
      arr.push(current.val)
      if (current.left) {
        stack.push(current.left)
      }
      if (current.right) {
        stack.push(current.right)
      }
    }

    return arr.reverse()
  }

  static levelOrder (root) {
    const queue = []
    const output = []
    let current = null
    queue.push(root)

    while (queue.length > 0) {
      const arr = []
      let count = queue.length
      
      while (count--) {
        current = queue.shift()
        if (current.val) {
          arr.push(current.val)
        }
        
        if (current.left) {
          queue.push(current.left)
        }

        if (current.right) {
          queue.push(current.right)
        }
      }

      output.push(arr)
    }

    return output
  }

  static arr2Tree (arr: number[]) {
    const nodeList = arr.map(val => ({ val, left: null, right: null }))
    const MAX = Math.floor(arr.length / 2 - 1)
    const LEN = arr.length

    for (let i = 0; i <= MAX; i++) {
      if (2 * i + 1 <= LEN) {
        // nodeList[i].left = nodeList[2 * i + 1]
        if (nodeList[2 * i + 1] && nodeList[2 * i + 1].val) {
          nodeList[i].left = nodeList[2 * i + 1]
        }
      }
      if (2 * i + 2 <= LEN) {
        if (nodeList[2 * i + 2] && nodeList[2 * i + 2].val) {
          nodeList[i].right = nodeList[2 * i + 2]
        }
      }
    }

    return nodeList[0]
  }

  static filterNullNode (root) {
    const stack = []
    let current
    stack.push(root)

    while (stack.length > 0) {
      current = stack.pop()
      if (current.right && current.right.val) {
        stack.push(current.right)
      } else {
        Reflect.deleteProperty(current, 'right')
      }
      if (current.left && current.left.val) {
        stack.push(current.left)
      } else {
        Reflect.deleteProperty(current, 'left')
      }
    }

    return root
  }

  static tree2Arr (root) {
    // 树转数组
    const arr = []
    const queue = []
    let current
    queue.push(root)

    while (queue.length > 0) {
      current = queue.shift()
      arr.push(current.val)
      if (current.left && current.left.val) {
        queue.push(current.left)
      } else if (current.val) {
        queue.push({ val: null })
      }
      if (current.right && current.right.val) {
        queue.push(current.right)
      } else if (current.val) {
        queue.push({ val: null })
      }
    }

    // 清理无用节点
    const MAX = Math.floor(arr.length / 2 - 1)
    const removeList = []
    for (let i = 0; i <= MAX; i++) {
      if (!arr[i]) {
        removeList.push(2 * i + 1)
        removeList.push(2 * i + 2)
      }
    }
    return arr.filter((item, index) => !removeList.includes(index))
  }
}


// const tree = Tree.filterNullNode(Tree.arr2Tree(arr))
const tree = Tree.arr2Tree([ 3, 9, 20, null, null, 15, 9])
console.log(Tree.tree2Arr(Tree.filterNullNode(tree)))
// console.log(Tree.preOrder(tree))
// console.log(Tree.inOrder(tree))

