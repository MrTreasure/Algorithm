export class Stack<T> {
  private list: T[]

  constructor() {
    this.list = []
  }

  public pop(): T {
    return this.list.pop()
  }

  public push(data: T) {
    this.list.push(data)
  }

  public sizeOf(): number {
    return this.list.length
  }

  public clear() {
    this.list = []
    
  }
}