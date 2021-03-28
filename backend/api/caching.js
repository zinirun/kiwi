const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);

const { redisHost } = require('../config/redisconfig');
const client = redis.createClient(redisHost);

client.on('error', (error) => {
    console.error(`Error occured at Redis connection, ${error}`);
});
client.on('ready', () => {
    console.log('Redis is ready.');
});

const getCachedPostUpdated = async (id) => {
    return +(await client.getAsync(`post-updated:${id}`)) === 1 ? true : false;
};

const setCachedPostUpdated = async (id) => {
    await client.setAsync(`post-updated:${id}`, 1);
};

const disableCachedPostUpdated = async (id) => {
    await client.setAsync(`post-updated:${id}`, 0);
};

const getCachedPost = async (id) => {
    if (!(await getCachedPostUpdated(id))) {
        const cachedPost = JSON.parse(await client.getAsync(`post:${id}`));
        return cachedPost;
    }
    console.log('must read mysql');
};

const setCachedPost = async (id, post) => {
    await client.setAsync(`post:${id}`, JSON.stringify(post));
    disableCachedPostUpdated(id);
};

module.exports = {
    getCachedPost,
    setCachedPost,
    setCachedPostUpdated,
};
