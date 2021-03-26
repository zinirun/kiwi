const { GraphQLDate } = require('graphql-iso-date');

// From context after auth middlware, type User exists in context vars
module.exports = {
    Date: GraphQLDate,

    // User
    getUser: require('./user/getUser'),
    updateUser: require('./user/updateUser'),
    updateUserStatus: require('./user/updateUserStatus'),
    updateUserPassword: require('./user/updateUserPassword'),
    updateType: require('./admin/user/updateType'),

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

    // Group
    getGroup: require('./group/getGroup'),
    createGroup: require('./group/createGroup'),
    getMyMasterGroups: require('./group/getMyMasterGroups'),
    getMyGroups: require('./group/getMyGroups'),
    getGroupComments: require('./group/getGroupComments'),
    inviteGroupMember: require('./group/inviteGroupMember'),
    quitGroupMember: require('./group/quitGroupMember'),
    createGroupComment: require('./group/createGroupComment'),
    deleteGroupComment: require('./group/deleteGroupComment'),
    deleteGroup: require('./group/deleteGroup'),
    selfQuitGroupMember: require('./group/selfQuitGroupMember'),

    // Notification
    getMyNotifications: require('./notification/getMyNotifications'),
    seenNotification: require('./notification/seenNotification'),
    seenAllNotifications: require('./notification/seenAllNotifications'),
    getNotificationsCount: require('./notification/getNotificationsCount'),

    // Scrap
    getScrapById: require('./scrap/getScrap'),
    scrapPost: require('./scrap/scrapPost'),
    getScrapCount: require('./scrap/getScrapCount'),

    // Report
    createReport: require('./report/createReport'),
    completeReport: require('./report/completeReport'),
    getReports: require('./report/getReports'),

    // Admin
    getAllUsers: require('./admin/user/getAllUsers'),
    searchUserByStudentNumber: require('./admin/user/searchUserByStudentNumber'),
    searchUserByUserId: require('./admin/user/searchUserByUserId'),
    updateStatus: require('./admin/user/updateStatus'),
};
