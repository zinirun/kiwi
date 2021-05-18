/**
 * 유저 타입 update
 * @author 조정민
 * @param (departmentId: ID!)
 *
 * updateDept(departmentId: ID!): Boolean
 */

const models = require('../../../../models');
const { ConflictError } = require('../../../errors/errors');
const isAdmin = require('../../../middlewares/isAdmin');
const { createAdminLog } = require('../../../services/log.service');
const { setCachedUserUpdated } = require('../../../../api/caching');

module.exports = async ({ id, departmentId }, { id: userId }) => {
    await isAdmin(userId);
    return await models.user
        .update(
            {
                departmentId,
            },
            { where: { id } },
        )
        .then(async () => {
            createAdminLog(userId, `회원 [ID ${id}] 학과 [${departmentId}]으로 변경`);
            await setCachedUserUpdated(id);
            return true;
        })
        .catch(() => {
            throw ConflictError('Delete(Update) error occured');
        });
};
