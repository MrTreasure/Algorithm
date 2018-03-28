import * as amqp from 'amqplib/callback_api'

declare module amqp {
  export function connect(url: string): Promise<amqp.Connection>;
}