const redis = require('redis');
const { redisHost } = require('../config/redisconfig');
const { promisify } = require('util');
const redisClient = redis.createClient(redisHost);
const getCache = promisify(redisClient.get).bind(redisClient);
const setCache = promisify(redisClient.set).bind(redisClient);
