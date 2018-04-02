import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as cluster from 'cluster'

const app: Koa = new Koa()
const router = new Router()

router.get('/pid', async (ctx) => {
  ctx.body = {
    pid: process.pid
  }
})

router.get('/msg/:type', async ctx => {
  process.send(ctx.params.type, err => {
    if (err) {
      ctx.body = err
    } else {
      ctx.body = {
        status: 'success'
      }
    }
    
  })
  ctx.body = {
    status: 'success'
  }
})

app.use(router.routes())

export default app
