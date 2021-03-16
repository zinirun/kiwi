const { GraphQLDate } = require('graphql-iso-date');

// From context after auth middlware, type User exists in context vars
module.exports = {
    Date: GraphQLDate,

    // User
    getUser: require('./user/getUser'),
    updateUser: require('./user/updateUser'),
    updateUserStatus: require('./user/updateUserStatus'),

    // Post
    getPostById: require('./post/getPost'),
    createPost: require('./post/createPost'),
    updatePost: require('./post/updatePost'),
    deletePost: require('./post/deletePost'),
    getCommentsByPostId: require('./comment/getCommentsByPostId'),
    getPostsByBoardId: require('./post/getPostsByBoardId'),

    // PostLike
    handlePostLike: require('./postLike/handlePostLike'),

    // Board
    getBoardById: require('./board/getBoard'),

    // Category
    getCategoryById: require('./category/getCategory'),

    // Comment
    createComment: require('./comment/createComment'),
};
