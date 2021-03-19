const { GraphQLDate } = require('graphql-iso-date');

// From context after auth middlware, type User exists in context vars
module.exports = {
    Date: GraphQLDate,

    // User
    getUser: require('./user/getUser'),
    updateUser: require('./user/updateUser'),
    updateUserStatus: require('./user/updateUserStatus'),
    updateUserPassword: require('./user/updateUserPassword'),

    // Post
    getPostById: require('./post/getPost'),
    getPostsByBoardId: require('./post/getPostsByBoardId'),
    getPostsByLikecount: require('./post/getPostsByLikecount'),
    createPost: require('./post/createPost'),
    updatePost: require('./post/updatePost'),
    deletePost: require('./post/deletePost'),
    getMyPosts: require('./post/getMyPosts'),
    getRecentPosts: require('./post/getRecentPosts'),

    // Comment
    getCommentsByPostId: require('./comment/getCommentsByPostId'),
    getMyComments: require('./comment/getMyComments'),
    createComment: require('./comment/createComment'),
    deleteComment: require('./comment/deleteComment'),

    // PostLike
    handlePostLike: require('./postLike/handlePostLike'),

    // CommentLike
    handleCommentLike: require('./commentLike/handleCommentLike'),

    // Board
    getBoardById: require('./board/getBoard'),

    // Category
    getCategoryById: require('./category/getCategory'),
    getCategoriesByBoardId: require('./category/getCatogriesByBoardId'),
};
