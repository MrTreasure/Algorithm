import 'reflect-metadata'
import * as moment from 'moment'
import { createConnection, getConnection } from 'typeorm'
import { User } from './entities/User'
import { Todo } from './entities/Todo'

const mysql = createConnection({
  name: 'mysql',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Sunshine',
  database: 'xiaoai',
  entities: [User, Todo],
  synchronize: true
})

const main = async () => {
  await mysql
  const conn = getConnection('mysql')

  const userList = await conn.manager.find(User, { id: 1 })

  for (let i = 0 ; i < 10 ; i++) {
    let todo = new Todo()
  }
 
  conn.close()
}

process.on('unhandledRejection', (reason, p) => {
  console.error(reason)
  process.exit(0)
})

main()
