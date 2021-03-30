/**
 * Redis Caching
 * @author zini
 */
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);

const { redisHost, cachingLimits, cachingExpires } = require('../config/redisconfig');
const { POST_MAX_LENGTH, POST_LIST_MAX_LENGTH, USER_MAX_LENGTH } = cachingLimits;
const { POST_TTL, POST_LIST_TTL, USER_TTL } = cachingExpires;
const client = redis.createClient(redisHost);

client.on('error', (error) => {
    console.error(`Error occured at Redis connection, ${error}`);
});
client.on('ready', () => {
    console.log('Redis is ready.');
});

// 모든 캐시 삭제
const flushAllCache = async () => {
    await client.flushallAsync();
    console.log('Flushed all of Redis Cache.');
};

/**
 * Caching Part 1. Post Content
 */

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
    await client.setexAsync(`post:${id}`, POST_TTL, JSON.stringify(post));
};

/**
 * Caching Part 2. Post List
 */

/**
 * 게시글 목록 캐시 삭제
 * 추가 케이스: Post에 대한 CUD, User 정보 변경
 * @param {deptId, boardId}
 */
const setCachedPostListUpdated = async (deptId, boardId) => {
    await client.delAsync(`postlist:${deptId}:${boardId}`);
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
    await client.setexAsync(
        `postlist:${deptId}:${boardId}`,
        POST_LIST_TTL,
        JSON.stringify(postlist),
    );
};

/**
 * Caching Part 3. Board Menu
 */

/**
 * 게시판 캐시 삭제
 * 추가 케이스: Admin 게시판 추가
 */
const setCachedBoardAllUpdated = async () => {
    await client.delAsync(`board:all`);
};

/**
 * 전체 게시판 캐시 가져오기
 * @param {*}
 * @returns {board}
 */
const getCachedBoardAll = async () => {
    return JSON.parse(await client.getAsync(`board:all`));
};

/**
 * 게시판 캐시 가져오기
 * @param {*} id
 * @returns {board}
 */
const getCachedBoardById = async (id) => {
    return JSON.parse(await client.getAsync(`board:${id}`));
};

/**
 * 게시판 캐시 저장
 * @param {id, board}
 */
const setCachedBoardById = async (id, board) => {
    await client.setAsync(`board:${id}`, JSON.stringify(board));
};

/**
 * 게시판 캐시 가져오기
 * @param {*} boardName
 * @returns {board}
 */
const getCachedBoardByName = async (boardName) => {
    return JSON.parse(await client.getAsync(`board:${boardName}`));
};

/**
 * 게시판 캐시 저장
 * @param {id, board}
 */
const setCachedBoardByName = async (boardName, board) => {
    await client.setAsync(`board:${boardName}`, JSON.stringify(board));
};

/**
 * 전체 게시판 캐시 저장
 * @param {id, board}
 */
const setCachedBoardAll = async (board) => {
    await client.setAsync(`board:all`, JSON.stringify(board));
};

/**
 * Caching Part 4. User
 */

/**
 * 유저 캐시 삭제
 * 추가 케이스: User 정보 변경, Admin user 정보 변경
 * @param {*} id
 */
const setCachedUserUpdated = async (id) => {
    await client.delAsync(`user:${id}`);
};

/**
 * 유저 캐시 가져오기
 * @param {*} id
 * @returns {Post}
 */
const getCachedUser = async (id) => {
    return JSON.parse(await client.getAsync(`user:${id}`));
};

/**
 * 유저 캐시 저장
 * @param {id, post}
 */
const setCachedUser = async (id, user) => {
    const cachedKeys = await client.keysAsync('user:*');
    if (cachedKeys.length > USER_MAX_LENGTH) {
        await client.delAsync(cachedKeys[0]);
    }
    await client.setexAsync(`user:${id}`, USER_TTL, JSON.stringify(user));
};

module.exports = {
    getCachedPost,
    setCachedPost,
    setCachedPostUpdated,
    getCachedPostList,
    setCachedPostList,
    setCachedPostListUpdated,
    setCachedBoardAllUpdated,
    getCachedBoardAll,
    getCachedBoardByName,
    setCachedBoardById,
    setCachedBoardAll,
    setCachedBoardByName,
    getCachedBoardById,
    setCachedUserUpdated,
    getCachedUser,
    setCachedUser,
    flushAllCache,
};
