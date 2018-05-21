import { createPool } from 'mysql2'
import { Pool } from 'mysql'
import config from '../config'
import { MysqlClient } from './MysqlClient'

const { mysqlConfig } = config

const pool: Pool = createPool({
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  debug: false,
  database: mysqlConfig.database,
  connectionLimit : mysqlConfig.connectionLimit
})

const mysql = new MysqlClient(pool)

export default mysql
