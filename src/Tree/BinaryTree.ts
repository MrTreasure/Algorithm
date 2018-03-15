import { Node } from './Node'

export class Tree {
  private root:Node<number>

  private list: any [] = []

  constructor() {
    this.root = null
  }

  public getRoot(): Node<number> {
    return this.root
  }

  public insert(data: number) {
    let node = new  Node<number>(data)
    if (this.root === null) {
      this.root = node
    } else {
      let current = this.root
      let parent: Node<number> = null
      while(current) {
        parent = current
        if (data < current.getData()) {
          current = current.left
          if (current === null) {
            parent.left = node
            break
          }
        } else {
          current = current.right
          if (current === null) {
            parent.right = node
            break
          }
        }
      }
    }
  }

  public inOrder(node: Node<number>) {
    if (! (node === null)) {
      this.inOrder(node.left)
      this.list.push(node.getData())
      this.inOrder(node.right)
    }
  }

  public preOrder(node: Node<number>) {5
    if (!(node === null)) {
      this.list.push(node.getData())
      this.preOrder(node.left)
      this.preOrder(node.right)
    }
  }

  public postOrder(node: Node<number>) {
    if (!(node === null)) {
      this.preOrder(node.left)
      this.preOrder(node.right)
      this.list.push(node.getData())
    }
  }

  public getList(): any[] {
    return this.list
  }

  public clearList() {
    this.list = []
  }

  public getMin(node): Node<number> {
    let current = node
    while(current.left) {
      current = current.left
    }
    return current
  }

  public getMax(node): Node<number> {
    let current = node
    while(current.right) {
      current = current.right
    }
    return current
  }

  public find(data): Node<number> {
    let current = this.root
    while(current) {
      if(current.getData() === data) {
        return current
      } else if (data <　current.getData()) {
        current = current.left
      } else {
        current = current.right
      }
    }
    return null
  }

  public removeNode(node, data) {
    if (node === null) {
      return null
    }
    if (data == node.getData()) {
      if (node.left === null && node.right === null) {
        return null
      }
      if (node.left === null) {
        return  node.right
      }
      if (node.right === null) {
        return  node.left
      }
      let tempNode: Node<number> = this.getMin(node.right)
      node.setData(tempNode.getData())
      node.right = this.removeNode(node.right, tempNode.getData())
      return node
    } else if (data < node.getData()) {
      node.left = this.removeNode(node.right, data)
      return node
    } else {
      node.right = this.removeNode(node.right, data)
      return node
    }
  }

  public iterativePreOrder(node: Node<number>) {
    const stack: Node<number>[] = []
    if (!(node === null)) {
      stack.push(node)
      while(stack.length !== 0) {
        node = stack.pop()
        this.list.push(node.getData())
        if (node.right !== null) {
          stack.push(node.right)
        }
        if (node.left !== null) {
          stack.push(node.left)
        }
      }
    }
  }

  public iterativeInOrder(node: Node<number>) {
    const stack: Node<number>[] = []
    while (node !== null || stack.length > 0) {
      while (node !== null) {
        stack.push(node)
        node = node.left
      }
      if (stack.length > 0) {
        node = stack.pop()
        this.list.push(node.getData())
        node = node.right
      }
    }
  }
}