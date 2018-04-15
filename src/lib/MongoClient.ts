import { Collection, MongoClient as Mongo, Db, Cursor, MongoError, FindAndModifyWriteOpResultObject, UpdateWriteOpResult, DeleteWriteOpResultObject } from 'mongodb'
import { ObjectID } from 'bson'
/**
 * 
 * 
 * @class MongoClient
 */
export class MongoClient {
  clientPromise: Promise<Mongo>
  dbName: string

  constructor (client: Promise<Mongo>, dbName) {
    this.clientPromise = client
    this.dbName = dbName
  }

  /**
   * Get collection
   * @param {string} collectionName
   * @returns {Collection}
   */
  public async getCollenction (collectionName: string): Promise<Collection> {
    const db: Db = await this.getDatabase()
    return db.collection(collectionName)
  }

  /**
   * Insert single document
   * @param {string} collectionNmae 
   * @param {object} doc 
   * @param {*} options
   * @returns {Promise<IInsertOneResult>} 
   */
  async insertOne (collectionNmae: string, doc, options = {}): Promise<IInsertOneResult> {
    const collection = await this.getCollenction(collectionNmae)
    const commandResult = await collection.insertOne(doc, options)
    return {
      ops: commandResult.ops,
      insertedCount: commandResult.insertedCount,
      insertedId: commandResult.insertedId
    }
  }

  /**
   * 
   * @param {string} collectionName 
   * @param {object[]} docs 
   * @param {object} options 
   * @returns {Promise<IInsertOneResult>}
   */
  async insertMany (collectionName: string, docs: object[], options = {}): Promise<IInsertOneResult> {
    const collection = await this.getCollenction(collectionName)
    return collection.insertMany(docs, options)
  }

  /**
   * Query the data list
   * @param {string} collectionName 
   * @param {object} query 
   * @param {object} fields 
   * @param {(array|object)} sortObj 
   * @param {IPageObj} pageObj 
   * @param {number} [pageObj.index=1]
   * @param {number} [pageObj.size=20]
   * @param {object} options 
   * @returns {Promise<Cursor<any>>}
   */
  async find (collectionName: string, query: object, fields: object, sortObj: any, pageObj: IPageObj, options = {}): Promise<Cursor<any>> {
    const collection = await this.getCollenction(collectionName)
    const { skip, limit } = await this.getPagingInfo(pageObj)
    options = Object.assign({}, { sort: sortObj, projection: fields, skip, limit }, options)
    return collection.find(query, options)
  }

  /**
   * Query thie single object
   * @param {string} collectionName 
   * @param {object} query 
   * @param {object} fields 
   * @param {object} options 
   */
  async findOne (collectionName: string, query, fields = {}, options = {}): Promise<IResult> {
    const collection = await this.getCollenction(collectionName)
    options = Object.assign({}, options, { projection: fields })
    return collection.findOne(query, options)
  }

  /**
   * Find a document and delete it in one atomic operation, requires a write lock for the duration of the operation.
   * @param {string} collectionName 
   * @param {*} filter 
   * @param {*} options 
   */
  async findOneAndDelete (collectionName: string, filter, options = {}): Promise<FindAndModifyWriteOpResultObject> {
    const collection = await this.getCollenction(collectionName)
    return collection.findOneAndDelete(filter, options)
  }

  /**
   * Find a document and replace it in one atomic operation, requires a write lock for the duration of the operation.
   * @param {string} collectionName 
   * @param {*} filter 
   * @param {object} replacement 
   * @param {object} options 
   */
  async findOneAndReplace (collectionName: string, filter, replacement, options = {}): Promise<FindAndModifyWriteOpResultObject> {
    const collection = await this.getCollenction(collectionName)
    return collection.findOneAndReplace(filter, replacement, options)
  }

  /**
   * Find a document and update it in one atomic operation, requires a write lock for the duration of the operation.
   * @param {string} collectionName 
   * @param {object} filter 
   * @param {object} update 
   * @param {object} options 
   */
  async findOneAndUpdate (collectionName: string, filter, update, options = {}): Promise<FindAndModifyWriteOpResultObject> {
    const collection = await this.getCollenction(collectionName)
    return collection.findOneAndUpdate(filter, update, options)
  }

  /**
   * Update multiple documents on MongoDB
   * @param {string} collectionName 
   * @param {object} filter 
   * @param {object} update 
   * @param {options} options 
   */
  async updateMany (collectionName: string, filter, update, options = {}): Promise<UpdateWriteOpResult> {
    const collection = await this.getCollenction(collectionName)
    return collection.updateMany(filter, update, options)
  }

  /**
   * Update a single document on MongoDB
   * @param {string} collectionName 
   * @param {object} filter 
   * @param {object} update 
   * @param {object} options 
   */
  async updateOne (collectionName: string, filter, update, options = {}): Promise<UpdateWriteOpResult> {
    const collection = await this.getCollenction(collectionName)
    return collection.updateOne(filter, update, options)
  }

  /**
   * Delete a document on MongoDB
   * @param {string} collectionName 
   * @param {object} filter 
   * @param {object} options 
   */
  async deleteOne (collectionName: string, filter, options = {}): Promise<DeleteWriteOpResultObject> {
    const collection = await this.getCollenction(collectionName)
    return collection.deleteOne(filter, options)
  }

  /**
   * Delete multiple documents on MongoDB
   * @param {string} collectionName 
   * @param {object} filter 
   * @param {object} options 
   */
  async deleteMany (collectionName: string, filter, options = {}): Promise<DeleteWriteOpResultObject> {
    const collection = await this.getCollenction(collectionName)
    return collection.deleteMany(filter, options)
  }

  /**
   * Count number of matching documents in the db to a query.
   * @param {string}collectionName 
   * @param {object} query 
   * @param {object} options 
   */
  async count (collectionName: string, query, options = {}): Promise<number> {
    const collection = await this.getCollenction(collectionName)
    return collection.count(query, options)
  }

  private async getDatabase (): Promise<Db> {
    let count = 0
    try {
      const client = await this.clientPromise
      return client.db(this.dbName)
    } catch (e) {
      console.error('mongo error',e)
      if (count < 10) {
        this.getDatabase()
        count++
      } else {
        process.exit(27017)
      }
    }
    
  }

  /**
   * Get the positive integer, if n is positive integer, return defaultVal
   * @param {number} n The param n
   * @param {number} defaultVal The defaultVal will be return when n is not positive integer 
   * @returns {number}  
   */
  private getPositiveInteger (n: number, defaultVal: number): number {
    n = +n
    if (n === n && n % 1 === 0 && n > 0) {
      return n
    }
    return defaultVal
  }
  
  /**
   * Get paging info by pageObj
   * @param {object} pageObj The paging object
   * @param {number} pageObj.index The page start
   * @param {number} pageObj.size Size of page
   * @returns {object}
   */
  private getPagingInfo (pageObj: IPageObj): {skip: number, limit: number} {
    const index = this.getPositiveInteger(pageObj.index, 1)
    const size = this.getPositiveInteger(pageObj.size, 20)
    const skip = size * (index - 1)
    return { skip, limit: size }
  }

}

interface IPageObj {
  index: number
  size: number
}

interface IInsertOneResult {
  insertedCount: number
  ops: object[]
  insertedId?: ObjectID
  insertedIds?: any[]
  result?: object
  connection?: object
}

interface IResult {
  error: MongoError
  result: object
}
