const { GraphQLDate } = require('graphql-iso-date');

// From context after auth middlware, [userId] exists in context vars
module.exports = {
    Date: GraphQLDate,
};
