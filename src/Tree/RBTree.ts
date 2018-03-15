/**
 * @class RBTree
 * @description 
 * 1.节点是红色或者黑色
 * 2.根节点是黑色
 * 3.每个叶子节点都是黑色的空节点
 * 4.每个红色节点的两个子节点都是黑色（从每个叶子到根的所有路径上不能有两个连续的红色节点）
 * 5.从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点
 */
export class RBTree {
  public root: RBNode
  /**
   * @prop {RBNode} nil 一个nil节点 任何叶子节点及空几点都指向这个节点（节约内存）
   */
  private readonly nil: RBNode = new RBNode(null, Type.BLACK)

  constructor() {
    this.root = this.nil
  }
  
  /**
   * 
   * @param {RBNode} node 左旋的操作节点
   */
  private leftRotate(node: RBNode) {
    let temp = node.right // 定义 temp 为 node 的右节点 A
    node.right = temp.left // 把 temp 节点的左节点移动到 node 节点的右节点 B
    if (temp.left !== this.nil) {
      temp.left.parent = node // 如果 temp 节点有左节点则指定其父节点为 node
    }
    temp.parent = node.parent
    if (node.parent === this.nil) {
      this.root = temp
    } else if (node === node.parent.left) { // 如果 node 节点是其父节点的左节点 则 temp 指向 node 节点父节点的作节点
      node.parent.left = temp
    } else {
      node.parent.right = temp
    }
    temp.left = node // BB
    node.parent = temp // AA
  }

  private rightRotate(node: RBNode) {
    let temp = node.left
    node.left = temp.right
    if (temp.right !== this.nil) {
      temp.right.parent = node
    }
    temp.parent = node.parent
    if (node.parent === this.nil) {
      this.root = temp
    } else if (node === node.parent.left) {
      node.parent.left = temp
    } else {
      node.parent.right = temp
    }
    temp.right = node
    node.parent = temp
  }

  private insertFixUp(node: RBNode) {
    while (node.parent.color === Type.RED) {
      if (node.parent === node.parent.parent.left) {
        let temp = node.parent.parent.right
        if (temp.color === Type.RED) {
          node.parent.color = Type.BLACK
          temp.color = Type.BLACK
          node.parent.parent.color = Type.RED
          node = node.parent.parent
        } else if (node === node.parent.right) {
          node = node.parent
          this.leftRotate(node)
        }
        node.parent.color = Type.BLACK
        node.parent.parent.color = Type.RED
        this.rightRotate(node.parent.parent)
      } else {
        let temp = node.parent.parent.left
        if (temp.color === Type.RED) {
          node.parent.color = Type.BLACK
          temp.color = Type.BLACK
          node.parent.parent.color = Type.RED
          node = node.parent.parent
        } else if (node === node.parent.left) {
          node = node.parent
          this.rightRotate(node)
        }
        node.parent.color = Type.BLACK
        node.parent.parent.color = Type.RED
        this.leftRotate(node.parent.parent)
      }
    }
    this.root.color = Type.BLACK
  }

  public insert(data) {
    let insert = new RBNode(data, Type.BLACK)
    let temp = this.nil
    let node = this.root
    while (node !== this.nil) {
      temp = node
      if (data < node.data) {
        temp = node.left
      } else {
        temp = node.right
      }
    }
    insert.parent = temp
    if (temp === this.nil) {
      this.root = insert
    } else if (data < temp.left) {
      temp.left = insert
    } else {
      temp.right = insert
    }
    insert.left = this.nil
    insert.right = this.nil
    insert.color = Type.RED
    this.insertFixUp(insert)
  }

  private transplant(x: RBNode, y: RBNode) {
    if (x.parent === this.nil) {
      this.root = x
    } else if (x === x.parent.left) {
      x.parent.left = y
    } else {
      x.parent.right = y
      y.parent = x.parent
    }
  }

} 


class RBNode {
  public left: RBNode
  public right: RBNode
  public parent: RBNode
  public color: Type
  public data: any

  /**
   * 
   * @param {any} data 保存的数据
   * @param {Type} color 节点的颜色
   * @param {RBNode} nil 由树生成的全局空节点
   */
  constructor(data, color: Type) {
    this.data = data
    this.left = null
    this.right = null
    this.color = color
    this.parent = null
  }
}

enum Type {
  RED,
  BLACK
}