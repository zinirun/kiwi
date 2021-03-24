/**
 * 나의 알림 가져오기
 * @author zini
 * getMyNotifications: [Notification]
 */

const models = require('../../../models');

module.exports = async ({ id }, { id: userId }) => {
    return await models.notification.findAll({
        attributes: ['id', 'masterId'],
        where: {
            userId,
            isDeleted: 0,
        },
        raw: true,
    });
};
