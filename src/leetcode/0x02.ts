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

export class Tree {
  public preOrder (node) {
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

  public inOrder (node) {
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

  public postOrder (node) {
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

  public postOrder2 (node) {
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

  public levelOrder (root) {
    const queue = []
    const output = []
    let current = null
    queue.push(root)

    while (queue.length > 0) {
      const arr = []
      let count = queue.length
      
      while (count--) {
        current = queue.shift()
        arr.push(current.val)
        
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
}
