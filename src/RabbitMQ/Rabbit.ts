import * as amqp from 'amqplib'

/**
 * 
 * 
 * @export
 * @class Rabbit
 */
export class Rabbit {
  private connect
  private url: string

  /**
   * Creates an instance of Rabbit.
   * @param {string} [url] 
   * @memberof Rabbit
   */
  constructor (url?: string) {
    url = url || 'amqp://guest:guest@localhost:5672'
    this.url = url
    this.connect = this.initConnect(url)
  }

  /**
   * @method getConnection
   * @returns {Promise<amqp.Connection>} 
   * @memberof Rabbit
   */
  async getConn (): Promise<amqp.Connection> {
    try {
      const conn = await (this.connect as Promise<amqp.Connection>)
      return conn
    } catch (error) {
      console.log(error)
      this.connect = this.initConnect(this.url)
      return this.getConn()
    }
  }

  /**
   * @method getChannel
   * @returns {Promise<amqp.Channel>} 
   * @memberof Rabbit
   */
  async getChannel (): Promise<amqp.Channel> {
    const conn = await this.getConn()
    const ch = await conn.createChannel()
    return ch    
  }

  private initConnect (url): any {
    return amqp.connect(url)
  }
}


export const rabbit = new Rabbit()

interface IOption {
  url: string
  [key: string]: any
}
