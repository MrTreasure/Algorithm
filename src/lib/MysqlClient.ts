import { Connection, Pool, ConnectionConfig, PoolConnection } from 'mysql'

const INTRANSATION = 'inTransation'
export class MysqlClient {
  private pool: Pool

  constructor (pool: Pool) {
    this.pool = pool
  }

  /**
   * Get db connection
   * @returns {Promise<PoolConnection>} Return connection;
   */
  getConnection (): Promise<PoolConnection> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, conn) => {
        if (err) {
          return reject(err)
        }
        resolve(conn)
      })
    })
  }

  /**
   * Begin database transaction
   */
  beginTransaction (): Promise<any> {
    return this.getConnection().then((conn: PoolConnection) => {
      return new Promise((resolve, reject) => {
        conn.beginTransaction(err => {
          if (err) {
            return reject(err)
          }
          conn[INTRANSATION] = true
          resolve(conn)
        })
      })
    })
  }
  /**
   * Commit transaction
   * @param {any} conn
   */
  commitTransaction (conn: PoolConnection): Promise<void> {
    return new Promise((resolve, reject) => {
      conn.commit(err => {
        if (err) {
          conn.rollback(() => {
            this.releaseConnection(conn, true)
            resolve()
          })
        }
      })
    })
  }

  execteQuery (sqlString: string, values, conn: PoolConnection = null): Promise<Array<any>> {
    return this.execute(sqlString, values, conn)
  }

  executeScalar (sqlString, values, conn: PoolConnection = null): Promise<object> {
    return this.execute(sqlString, values, conn).then(results => {
      if (results.length === 0) {
        return null
      }
      return results[0]
    })
  }

  excuteNonQuery (sqlString, values, conn: PoolConnection = null): Promise<any> {
    return this.execute(sqlString, values, conn).then(results => results.affectedRows)
  }

  excuteInsert (sqlString: string, values, conn: PoolConnection = null): Promise<string> {
    return this.execute(sqlString, values, conn).then(results => results.insertId)
  }

  /**
   * Release connection
   * @param {PoolConnection} conn 
   * @param {boolean} closeTran 
   */
  private releaseConnection (conn: PoolConnection, closeTran = false): void {
    if (closeTran) {
      conn[INTRANSATION] = false
    }
    conn.release()
  }

  /**
   * Execute sql, return resuluts;
   * @param {string} sqlString 
   * @param {Array<any> | object} values 
   * @param {PoolConnection} conn 
   */
  private execute (sqlString, values, conn: PoolConnection): Promise<any> {
    let { sql, params } = this.processSqlAndParameter(sqlString, values)
    let p = conn ? Promise.resolve(conn) : this.getConnection()
    return p.then(conn => {
      return new Promise((resolve, reject) => {
        conn.query(sql, params, (err, results, fieds) => {
          if (!conn[INTRANSATION]) {
            this.releaseConnection(conn)
          }
          if (err) {
            return reject(err)
          }
          resolve(results)
        })
      })
    })
  }

  /**
   * Format params
   * @param {string} sqlString 
   * @param {Array<any> | object} params 
   */
  private processSqlAndParameter (sqlString: string, params: Array<any> | object): {sql: string, params: Array<any>} {
    let result
    if (Array.isArray(params)) {
      result = {
        sql: sqlString,
        params: params.slice()
      }
    } else {
      let paramArr = []
      if (params) {
        let paramKeys = Object.keys(params)
        sqlString = sqlString.replace(/@[a-zA-Z0-9_]+/g, (match, offset, str) => {
          let matchKey = match.replace('@', '')
          if (paramKeys.indexOf(matchKey) >= 0) {
            paramArr.push(params[matchKey])
            return '?'
          }
          return match
        })
      }
      result = {
        sql: sqlString,
        params: paramArr
      }
    }
    return result
  }


}
