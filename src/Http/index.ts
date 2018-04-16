import * as http from 'http'
import * as stream from 'stream'
import * as fs from 'fs-extra'
import * as path from 'path'

import chalk from 'chalk'

const log = console.log


const server = http.createServer((req, res) => {
  console.dir(req.rawHeaders)
  const img = fs.createReadStream(path.resolve(__dirname, '../../views/index.html'))
  img.pipe(res)
})

server.listen(1002, () => {
  log(chalk.green('服务已启动在:' + server.address().port))  
})

