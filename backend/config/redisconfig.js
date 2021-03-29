module.exports = {
    redisHost: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASS,
    },
    cachingLimits: {
        POST_MAX_LENGTH: 2000,
        POST_LIST_MAX_LENGTH: 4000,
    },
};
