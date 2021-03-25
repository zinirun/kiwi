/**
 * 알림 상태 Update
 * @author 신창우
 * @param (id: ID!)
 * seenNotification(id: ID!): Boolean
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ id }, { id: authorId }) => {
    return await models.notification
        .update(
            {
                count: 1,
                isDeleted: 1,
            },
            { where: { id, userId: authorId } },
        )
        .then(() => true)
        .catch(() => ConflictError('Update error occured'));
};
