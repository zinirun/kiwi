const { GraphQLDate } = require('graphql-iso-date');

// From context after auth middlware, type User exists in context vars
module.exports = {
    Date: GraphQLDate,

    getUserInfo: require('./user/getUserInfo'),
    getPostById: require('./post/getPost'),
    createPost: require('./post/createPost'),
    updatePost: require('./post/updatePost'),
    deletePost: require('./post/deletePost'),
    getCommentsByPostId: require('./comment/getCommentsByPostId'),
    getPostLikeById: require('./postLike/getPostLike'),
    handlePostLike: require('./postLike/handlePostLike'),
};
