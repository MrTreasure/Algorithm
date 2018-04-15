import { MongoClient } from './MongoClient'
import * as mongodb from 'mongodb'

const clientPromise = mongodb.MongoClient.connect('mongodb://localhost:27017')

export default new MongoClient(clientPromise, 'docker')
