import { BinaryNode, ICompare } from './BinaryNode'

export class Tree {
  private root: BinaryNode
  private left: BinaryNode
  private right: BinaryNode

  private list: any [] = []

  constructor() {
    this.root = null
  }

  public getRoot(): BinaryNode {
    return this.root
  }

  public insert(data) {
    let node = new  BinaryNode(data)
    if (this.root === null) {
      this.root = node
    } else {
      let current = this.root
      let parent: BinaryNode = null
      while(current) {
        parent = current
        if (data < current.data) {
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

  public inOrder(node: BinaryNode) {
    if (! (node === null)) {
      this.inOrder(node.left)
      this.list.push(node.show())
      this.inOrder(node.right)
    }
  }

  public preOrder(node: BinaryNode) {
    if (!(node === null)) {
      this.list.push(node.show())
      this.preOrder(node.left)
      this.preOrder(node.right)
    }
  }

  public postOrder(node: BinaryNode) {
    if (!(node === null)) {
      this.preOrder(node.left)
      this.preOrder(node.right)
      this.list.push(node.show())
    }
  }

  public getList(): any[] {
    return this.list
  }

  public clearList() {
    this.list = []
  }

  public getMin(node): BinaryNode {
    let current = node
    while(current.left) {
      current = current.left
    }
    return current
  }

  public getMax(node): BinaryNode {
    let current = node
    while(current.right) {
      current = current.right
    }
    return current
  }

  public find(data): BinaryNode {
    let current = this.root
    while(current) {
      if(current.data === data) {
        return current
      } else if (data <　current.data) {
        current = current.left
      } else {
        current = current.right
      }
    }

    return null
  }
}