/**
 * 모든 알림 읽음 처리 (삭제)
 * @author zini
 * seenAllNotifications: Boolean
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({}, { id: userId }) => {
    return await models.notification
        .update(
            {
                count: 1,
                isDeleted: 1,
            },
            { where: { userId } },
        )
        .then(() => true)
        .catch(() => ConflictError('Update error occured'));
};
