/**
 * Redis Caching
 * @author zini
 */
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);

const { redisHost, cachingLimits } = require('../config/redisconfig');
const { POST_MAX_LENGTH, POST_LIST_MAX_LENGTH } = cachingLimits;
const client = redis.createClient(redisHost);

client.on('error', (error) => {
    console.error(`Error occured at Redis connection, ${error}`);
});
client.on('ready', () => {
    console.log('Redis is ready.');
});

////////////////////////////////////
////////// 게시글 내용 캐싱 //////////
////////////////////////////////////

/**
 * 게시글 캐시 삭제
 * 추가 케이스: Post에 대한 CUD, User 정보 변경
 * @param {*} id
 */
const setCachedPostUpdated = async (id) => {
    await client.delAsync(`post:${id}`);
};

/**
 * 게시글 캐시 가져오기
 * @param {*} id
 * @returns {Post}
 */
const getCachedPost = async (id) => {
    return JSON.parse(await client.getAsync(`post:${id}`));
};

/**
 * 게시글 캐시 저장
 * @param {id, post}
 */
const setCachedPost = async (id, post) => {
    const cachedKeys = await client.keysAsync('post:*');
    if (cachedKeys.length > POST_MAX_LENGTH) {
        await client.delAsync(cachedKeys[0]);
    }
    await client.setAsync(`post:${id}`, JSON.stringify(post));
};

////////////////////////////////////
////////// 게시글 목록 캐싱 //////////
////////////////////////////////////

/**
 * 게시글 목록 캐시 삭제
 * 추가 케이스: Post에 대한 CUD, User 정보 변경
 * @param {deptId, boardId}
 */
const setCachedPostListUpdated = async (deptId, boardId) => {
    await client.delAsync(`postlist:${deptId}:${boardId}`, 1);
};

/**
 * 게시글 목록 캐시 가져오기
 * @param {deptId, boardId}
 * @returns {Post}
 */
const getCachedPostList = async (deptId, boardId) => {
    return JSON.parse(await client.getAsync(`postlist:${deptId}:${boardId}`));
};

/**
 * 게시글 목록 캐시 저장
 * @param {deptId, boardId, postlist}
 */
const setCachedPostList = async (deptId, boardId, postlist) => {
    const cachedKeys = await client.keysAsync('postlist:*');
    if (cachedKeys.length > POST_LIST_MAX_LENGTH) {
        await client.delAsync(cachedKeys[0]);
    }
    await client.setAsync(`postlist:${deptId}:${boardId}`, JSON.stringify(postlist));
};

module.exports = {
    getCachedPost,
    setCachedPost,
    setCachedPostUpdated,
    getCachedPostList,
    setCachedPostList,
    setCachedPostListUpdated,
};
