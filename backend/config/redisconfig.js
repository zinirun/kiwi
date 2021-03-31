const path = require('path');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: path.join(__dirname, '../.env') });
} else {
    dotenv.config({ path: path.join(__dirname, '../.env.dev') });
}

module.exports = {
    redisHost: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASS,
    },
    cachingLimits: {
        POST_MAX_LENGTH: 2048,
        POST_LIST_MAX_LENGTH: 4096,
        USER_MAX_LENGTH: 2048,
    },
    cachingExpires: {
        POST_TTL: 60 * 30,
        POST_LIST_TTL: 60 * 10,
        USER_TTL: 60 * 60 * 12,
    },
};
