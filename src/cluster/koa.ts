import * as Koa from 'koa'
import * as Router from 'koa-router'

const app = new Koa()
const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = {
    pid: process.pid
  }
})

app.use(router.routes())

export default app
