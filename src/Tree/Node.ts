export class Node<T> {
  public left: Node<T> = null
  public right: Node<T> = null
  public parent: Node<T>
  private data: T

  constructor (data: T) {
    this.data = data
  }

  public getData (): T {
    return this.data
  }

  public setData (data: T): void {
    this.data = data
  }
}
