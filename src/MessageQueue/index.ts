import { EventEmitter } from 'events'
import { Stack } from '../Stack'

class MessageQueue extends EventEmitter {
  /**
   * @property {Stack<T>} stack 内置的队列
   * @property {any[]} subscribes 订阅者
   */
  private stack: Stack<any> = new Stack()

  private subscribes: any[] = []

  constructor () {
    super()
  }

  /**
   * subscribe
   * @param {}
   */
  public subscribe (subscriber) {
    this.subscribes.push(subscriber)
  }
}
