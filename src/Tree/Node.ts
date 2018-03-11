export abstract class Node<T> {
  public left: Node<T> = null
  public right: Node<T> = null
  public parent: Node<T>
  public data: T
  
  constructor(data:T) {
    this.data = data
  }
}