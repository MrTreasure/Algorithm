import config from '../config';
import { MongoClient } from './MongoClient';
import * as mongodb from 'mongodb';

const { mongoConfig } = config;

const clientPromise = mongodb.MongoClient.connect(mongoConfig.address);

export default new MongoClient(clientPromise, mongoConfig.dbName);