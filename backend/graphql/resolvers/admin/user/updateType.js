/**
 * 유저 타입 update
 * @author 이건욱
 * @param (id: ID!, type: Int!)
 *
 * updateType(id: ID!, type: Int!): Boolean
 */

const models = require('../../../../models');
const { ConflictError } = require('../../../errors/errors');
const isAdmin = require('../../../middlewares/isAdmin');
const { createAdminLog } = require('../../../services/log.service');
const { setCachedUserUpdated } = require('../../../../api/caching');

module.exports = async ({ id, type }, { id: userId }) => {
    await isAdmin(userId);
    return await models.user
        .update(
            {
                type,
            },
            { where: { id } },
        )
        .then(async () => {
            createAdminLog(userId, `회원 [ID ${id}] 타입 [${type}]으로 변경`);
            await setCachedUserUpdated(id);
            return true;
        })
        .catch(() => {
            throw ConflictError('Delete(Update) error occured');
        });
};
