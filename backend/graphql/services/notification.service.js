const models = require('../../models');
const { ConflictError } = require('../errors/errors');

// type: POST_COMMENT
const createNotificationPostComment = async (postId) => {
    const type = 'POST_COMMENT';
    const { authorId } = await models.post.findOne({
        attributes: ['id', 'authorId'],
        where: { id: postId },
        raw: true,
    });
    const data = await models.notification.findOne({
        attributes: ['isDeleted', 'postId', 'type', 'count'],
        where: { postId, type, userId: authorId },
        raw: true,
    });
    if (data) {
        const { isDeleted } = data.isDeleted;

        if (isDeleted === 0) {
            return await models.notification.update(
                {
                    count: data.count + 1,
                },
                { where: { userId, postId, type } },
            );
        } else {
            return await models.notification.update(
                {
                    count: data.count + 1,
                    isDeleted: 0,
                },
                { where: { userId, postId, type } },
            );
        }
    } else {
        return models.notification.create({
            userId,
            postId,
            type,
        });
    }
};

// type: COMMENT_LIKE
const createNotificationCommentLike = async (commentId) => {
    const type = 'COMMENT_LIKE';
    const { authorId } = await models.comment.findOne({
        attributes: ['id', 'authorId'],
        where: { id: commentId },
        raw: true,
    });
    const data = await models.notification.findOne({
        attributes: ['isDeleted', 'commentId', 'type', 'count'],
        where: { commentId, type, userId: authorId },
        raw: true,
    });
    if (data) {
        const { isDeleted } = data.isDeleted;

        if (isDeleted === 0) {
            return await models.notification.update(
                {
                    count: data.count + 1,
                },
                { where: { userId, commentId, type } },
            );
        } else {
            return await models.notification.update(
                {
                    count: data.count + 1,
                    isDeleted: 0,
                },
                { where: { userId, commentId, type } },
            );
        }
    } else {
        return models.notification.create({
            userId,
            commentId,
            type,
        });
    }
};

// type: POST_LIKE
const createNotificationPostLike = async (postId) => {
    const type = 'POST_LIKE';
    const { authorId } = await models.post.findOne({
        attributes: ['id', 'authorId'],
        where: { id: postId },
        raw: true,
    });
    const data = await models.notification.findOne({
        attributes: ['isDeleted', 'postId', 'type', 'count'],
        where: { postId, type, userId: authorId },
        raw: true,
    });
    if (data) {
        const { isDeleted } = data.isDeleted;

        if (isDeleted === 0) {
            return await models.notification.update(
                {
                    count: data.count + 1,
                },
                { where: { userId, postId, type } },
            );
        } else {
            return await models.notification.update(
                {
                    count: data.count + 1,
                    isDeleted: 0,
                },
                { where: { userId, postId, type } },
            );
        }
    } else {
        return models.notification.create({
            userId,
            postId,
            type,
        });
    }
};
module.exports = {
    createNotificationPostComment,
    createNotificationCommentLike,
    createNotificationPostLike,
};
