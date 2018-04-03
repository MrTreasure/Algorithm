import * as amqp from 'amqplib'

/**
 * 
 * 
 * @export
 * @class Rabbit
 */
export class Rabbit {
  private connect

  /**
   * Creates an instance of Rabbit.
   * @param {string} [url] 
   * @memberof Rabbit
   */
  constructor (url?: string) {
    url = url || 'amqp://guest:Sunshine@localhost:5672'
    this.connect = amqp.connect(url)
  }

  /**
   * @method getConnection
   * @returns {Promise<amqp.Connection>} 
   * @memberof Rabbit
   */
  async getConn (): Promise<amqp.Connection> {
    const conn = await (this.connect as Promise<amqp.Connection>)
    return conn
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
}


export const rabbit = new Rabbit()

interface IOption {
  url: string
  [key: string]: any
}
