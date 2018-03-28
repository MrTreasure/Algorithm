import * as amqp from 'amqplib/callback_api'

export class Rabbit {
  private connect: Promise<amqp.Connection>

  constructor (url: string) {
    this.connect = new Promise((resolve, reject) => {
      amqp.connect(url, (err, connection) => {
        if (err) reject(err)
        resolve(connection)
      })
    })
  }

  async getConn (): Promise<amqp.Connection> {
    const conn = await this.connect
    return conn
  }
}

interface IOption {
  url: string
  [key: string]: any
}
