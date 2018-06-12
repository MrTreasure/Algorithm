import 'reflect-metadata'
import * as moment from 'moment'
import { createConnection, getConnection } from 'typeorm'
import { User } from './entities/User'

const mysql = createConnection({
  name: 'mysql',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Sunshine',
  database: 'xiaoai',
  entities: [User],
  synchronize: true
})

const main = async () => {
  await mysql
  const conn = getConnection('mysql')
  let user = new User()
  user.lastActived = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  user.openId = 'Treasure'
  user = await conn.manager.save(user)
  const result = await conn.manager.find(User)
  console.log(user.id)
  conn.close()
}

process.on('unhandledRejection', (reason, p) => {
  console.error(reason)
  process.exit(0)
})

main()
