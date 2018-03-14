/**
 * 1.节点是红色或者黑色
 * 2.根节点是黑色
 * 3.每个叶子节点都是黑色的空节点
 * 4.每个红色节点的两个子节点都是黑色（从每个叶子到根的所有路径上不能有两个连续的红色节点）
 * 5.从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点
 */

export class RBTree {
  public left: RBNode
  public right: RBNode
  public root: RBNode
}


class RBNode {
  public left: RBNode
  public right: RBNode
  public type: Type
  public data: any

  constructor(data, type: Type) {
    this.data = data
    this.left = null
    this.right = null
    this.type = type
  }
}

enum Type {
  RED,
  BLACK
}