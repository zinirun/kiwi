const models = require('../../models');

// type: POST_COMMENT
const createNotificationPostComment = async (postId, triggerId) => {
    const type = 'POST_COMMENT';
    const { authorId } = await models.post.findOne({
        attributes: ['id', 'authorId'],
        where: { id: postId },
        raw: true,
    });
    if (+authorId === +triggerId) return;

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
                { where: { userId: authorId, postId, type } },
            );
        } else {
            return await models.notification.update(
                {
                    count: data.count + 1,
                    isDeleted: 0,
                },
                { where: { userId: authorId, postId, type } },
            );
        }
    } else {
        return models.notification.create({
            userId: authorId,
            postId,
            type,
        });
    }
};

// type: COMMENT_LIKE
const createNotificationCommentLike = async (commentId, triggerId) => {
    const type = 'COMMENT_LIKE';
    const { authorId } = await models.comment.findOne({
        attributes: ['id', 'authorId'],
        where: { id: commentId },
        raw: true,
    });
    if (+authorId === +triggerId) return;
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
                { where: { userId: authorId, commentId, type } },
            );
        } else {
            return await models.notification.update(
                {
                    count: data.count + 1,
                    isDeleted: 0,
                },
                { where: { userId: authorId, commentId, type } },
            );
        }
    } else {
        return models.notification.create({
            userId: authorId,
            commentId,
            type,
        });
    }
};

// type: POST_LIKE
const createNotificationPostLike = async (postId, triggerId) => {
    const type = 'POST_LIKE';
    const { authorId } = await models.post.findOne({
        attributes: ['id', 'authorId'],
        where: { id: postId },
        raw: true,
    });
    if (+authorId === +triggerId) return;
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
                { where: { userId: authorId, postId, type } },
            );
        } else {
            return await models.notification.update(
                {
                    count: data.count + 1,
                    isDeleted: 0,
                },
                { where: { userId: authorId, postId, type } },
            );
        }
    } else {
        return models.notification.create({
            userId: authorId,
            postId,
            type,
        });
    }
};
// type: GROUP_INVITED
const createNotificationGroupInvite = async (groupId, memberId) => {
    const type = 'GROUP_INVITED';

    const data = await models.notification.findOne({
        attributes: ['isDeleted', 'groupId', 'type', 'count'],
        where: { groupId, type, userId: memberId },
        raw: true,
    });
    if (data) {
        const { isDeleted } = data.isDeleted;

        if (isDeleted === 0) {
            return await models.notification.update(
                {
                    count: data.count + 1,
                },
                { where: { userId: memberId, groupId, type } },
            );
        } else {
            return await models.notification.update(
                {
                    count: data.count + 1,
                    isDeleted: 0,
                },
                { where: { userId: memberId, groupId, type } },
            );
        }
    } else {
        return models.notification.create({
            userId: memberId,
            groupId,
            type,
        });
    }
};
// type: GROUP_COMMENT
const createNotificationGroupComment = async (groupId, memberId) => {
    const type = 'GROUP_COMMENT';
    const master = await models.groups.findOne({
        attributes: ['masterId'],
        where: { id: groupId },
        raw: true,
    });
    const members = await models.group_member.findAll({
        attributes: ['memberId'],
        where: { groupId },
        raw: true,
    });
    const targets = [master.masterId, ...members.map((member) => member.memberId)].filter(
        (target) => target !== memberId,
    ); // [1, 2, 4, 5]

    const notificationOfTargets = await models.notification.findAll({
        attributes: ['userId', 'isDeleted', 'groupId', 'type', 'count'],
        where: { groupId, type },
        raw: true,
    });

    const toUpdateCount = []; // NOT에 있고 isDeleted===0
    const toUpdateCountAndIsDeleted = []; // NOT에 있고 isDeleted===1
    const toCreate = []; // NOT에 없음

    targets.forEach((targetUserId) => {
        const { userId, isDeleted } = notificationOfTargets.find((t) => t.userId === targetUserId);
        if (userId) {
            if (isDeleted === 0) {
                toUpdateCount.push(targetUserId);
            } else {
                toUpdateCountAndIsDeleted.push(targetUserId);
            }
        } else toCreate.push(targetUserId);
    });

    console.log(toUpdateCount);
    console.log(toUpdateCountAndIsDeleted);
    console.log(toCreate);

    // if (data) {
    //     const { isDeleted } = data.isDeleted;

    //     if (isDeleted === 0) {
    //         return await models.notification.update(
    //             {
    //                 count: data.count + 1,
    //             },
    //             { where: { userId: memberId, groupId, type } },
    //         );
    //     } else {
    //         return await models.notification.update(
    //             {
    //                 count: data.count + 1,
    //                 isDeleted: 0,
    //             },
    //             { where: { userId: memberId, groupId, type } },
    //         );
    //     }
    // } else {
    //     return models.notification.create({
    //         userId: memberId,
    //         groupId,
    //         type,
    //     });
    // }
};
module.exports = {
    createNotificationPostComment,
    createNotificationCommentLike,
    createNotificationPostLike,
    createNotificationGroupInvite,
    createNotificationGroupComment,
};
