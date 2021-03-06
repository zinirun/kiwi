/**
 * 알림 상태 Update
 * @author 신창우
 * @param (id: ID!)
 * seenNotification(id: ID!): Boolean
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ id }, { id: userId }) => {
    return await models.notification
        .update(
            {
                count: 1,
                isDeleted: 1,
            },
            { where: { id, userId } },
        )
        .then(() => true)
        .catch(() => ConflictError('Update error occured'));
};
