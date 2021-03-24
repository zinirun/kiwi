/**
 * 나의 안 읽은 알림 가져오기
 * @author zini
 * getMyNotifications: [Notification]
 */

const models = require('../../../models');

module.exports = async ({}, { id: userId }) => {
    return await models.notification.findAll({
        attributes: ['id', 'type', 'postId', 'commentId', 'groupId', 'count', 'updatedAt'],
        where: {
            userId,
            isDeleted: 0,
        },
        raw: true,
    });
};
