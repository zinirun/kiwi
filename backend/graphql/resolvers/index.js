const { GraphQLDate } = require('graphql-iso-date');

// From context after auth middlware, type User exists in context vars
module.exports = {
    Date: GraphQLDate,

    getUserInfo: require('./user/getUserInfo'),
};
