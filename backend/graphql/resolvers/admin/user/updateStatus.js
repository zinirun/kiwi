const models = require('../../../../models');
const { ConflictError } = require('../../../errors/errors');
const isAdmin = require('../../../middlewares/isAdmin');
const { createAdminLog } = require('../../../services/log.service');
const { setCachedUserUpdated } = require('../../../../api/caching');

module.exports = async ({ status, id, reason }, { id: userId }) => {
    await isAdmin(userId);
    return await models.user
        .update(
            {
                status,
            },
            { where: { id } },
        )
        .then(async () => {
            createAdminLog(userId, `회원 [ID ${id}] 상태 [${status}]으로 변경: 사유[${reason}]`);
            await setCachedUserUpdated(id);
            return true;
        })
        .catch(() => {
            throw ConflictError('Delete(Update) error occured');
        });
};
