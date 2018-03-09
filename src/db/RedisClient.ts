import * as Redis from 'ioredis';
import Config from '../config';

const { redisConfig } = Config;

export default new Redis(redisConfig);