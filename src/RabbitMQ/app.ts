import * as Koa from 'koa'
import * as Router from 'koa-router'
import { rabbit } from './Rabbit'
import chalk from 'chalk'
import * as body from 'koa-body'

const app = new Koa()
const router = new Router()
const log = console.log

const Queue = 'node'
app.use(body())

router.post('/send', async ctx => {
  const ch = await rabbit.getChannel()
  ch.assertQueue(Queue, { durable: true })

  if (typeof ctx.request.body.content !== 'string') {
    ctx.status = 400
    ctx.body = {
      status: 'faild'
    }
    return
  }

  ch.sendToQueue(Queue, Buffer.from(ctx.request.body.content))
  ctx.body = {
    result: 'success'
  }
  log(chalk.magenta`[x] Sent${ctx.request.body.content}`)
})

app.use(router.routes())

const server = app.listen(3000, () => {
  const address = server.address()
  log(chalk.green`Server is lisitening at ${address.address}:${address.port.toString()}`)
})

