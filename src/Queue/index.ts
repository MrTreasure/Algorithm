export class Queue<T> {
  private list: T[]

  constructor() {
    this.list = []
  }

  public enQueue(data: T) {
    this.list.push(data)
  }

  public deQueue(): T {
    return this.list.shift()
  }

  public sizeOf(): number {
    return this.list.length
  }

  public clearAll() {
    this.list = []
  }
}