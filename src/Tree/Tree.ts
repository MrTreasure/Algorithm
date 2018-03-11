export class Tree {
  private left: Tree = null
  private right: Tree = null
  private parent: Tree
  private data: any
  
  constructor() {
  
  }

  /**
   * setLeft
  */
  private setLeft(leaf: Tree) {
    this.left = leaf
    leaf.parent = this
  }

  /**
   * setRight
   */
  private setRight(leaf: Tree) {
    this.right = leaf
    leaf.parent = this    
  }

  /**
   * setData
   */
  public setData(data: any) {
    this.data = data
  }

  public addChild(leaf: Tree) {
    // Todo
  }

  public delete() {
    if(!this.left && !this.right) {
      this.parent = null
    } else if(!this.right) {
      this.left.parent = this.parent
    }
  }
}