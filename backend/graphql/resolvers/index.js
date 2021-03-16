const { GraphQLDate } = require('graphql-iso-date');

// From context after auth middlware, type User exists in context vars
module.exports = {
    Date: GraphQLDate,

    getUser: require('./user/getUser'),
    getPostById: require('./post/getPost'),
    createPost: require('./post/createPost'),
    updatePost: require('./post/updatePost'),
    deletePost: require('./post/deletePost'),
    getCommentsByPostId: require('./comment/getCommentsByPostId'),
    handlePostLike: require('./postLike/handlePostLike'),
    getBoardById: require('./board/getBoard'),
    getCategoryById: require('./category/getCategory'),
    getDepartmentById: require('./department/getDepartment'),
    createComment: require('./comment/createComment'),
};
