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
    getPostsByLikeCount: require('./post/getPostsByLikeCount'),
    getPostsByLikeCountWithDay: require('./post/getPostsByLikeCountWithDay'),
    createPost: require('./post/createPost'),
    updatePost: require('./post/updatePost'),
    deletePost: require('./post/deletePost'),
    getMyPosts: require('./post/getMyPosts'),
    getRecentPosts: require('./post/getRecentPosts'),
    searchPostsByBoardId: require('./post/searchPostsByBoardId'),
    getPostsCountByBoardId: require('./post/getPostsCountByBoardId'),
    getPostsCountByLikeCount: require('./post/getPostsCountByLikeCount'),
    getMyPostsCount: require('./post/getMyPostsCount'),
    getSearchPostsCount: require('./post/getSearchPostsCount'),

    // Comment
    getCommentsByPostId: require('./comment/getCommentsByPostId'),
    getMyComments: require('./comment/getMyComments'),
    createComment: require('./comment/createComment'),
    deleteComment: require('./comment/deleteComment'),
    getMyCommentsCount: require('./comment/getMyCommentsCount'),

    // PostLike
    handlePostLike: require('./postLike/handlePostLike'),

    // CommentLike
    handleCommentLike: require('./commentLike/handleCommentLike'),

    // Board
    getBoardById: require('./board/getBoard'),
    getBoards: require('./board/getBoards'),
    getBoardByName: require('./board/getBoardByName'),

    // Category
    getCategoryById: require('./category/getCategory'),
    getCategoriesByBoardId: require('./category/getCatogriesByBoardId'),
};
