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

module.exports = async ({ id, type }, { id: userId }) => {
    await isAdmin(userId);
    return await models.user
        .update(
            {
                type,
            },
            { where: { id } },
        )
        .then(() => {
            createAdminLog(userId, `[User: ${id}] type 변경`);
            return true;
        })
        .catch(() => {
            throw ConflictError('Delete(Update) error occured');
        });
};
