module.exports = {
    redisHost: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASS,
    },
    cachingLimits: {
        POST_MAX_LENGTH: 2048,
        POST_LIST_MAX_LENGTH: 4096,
    },
    cachingExpires: {
        POST_TTL: 60 * 60 * 6,
        POST_LIST_TTL: 60 * 60 * 3,
    },
};
