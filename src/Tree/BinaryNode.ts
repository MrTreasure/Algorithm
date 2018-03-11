export class BinaryNode{
  public left: BinaryNode
  public right: BinaryNode
  public parent: BinaryNode
  public data: any

  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
    this.parent = null
  }

  public show() {
    return this.data
  }
}


export interface ICompare {
  compare(a, b): boolean
}