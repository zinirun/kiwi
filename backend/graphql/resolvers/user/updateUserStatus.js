/**
 * 유저 정보 Delete (status = 0)
 * @author 이건욱
 * @param (id: ID!)
 *
 * updateUserStatus(status: Int!): Boolean
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');
const { setCachedUserUpdated } = require('../../../api/caching');

module.exports = async ({ status }, { id }) => {
    return await models.user
        .update(
            {
                status,
            },
            { where: { id } },
        )
        .then(async () => {
            await setCachedUserUpdated(id);
            return true;
        })
        .catch(() => {
            throw ConflictError('Delete(Update) error occured');
        });
};
