const models = require('../../../../models');
const { ConflictError } = require('../../../errors/errors');
const isAdmin = require('../../../middlewares/isAdmin');
const { createAdminLog } = require('../../../services/log.service');

module.exports = async ({ status, id }, { id: userId }) => {
    await isAdmin(userId);
    return await models.user
        .update(
            {
                status,
            },
            { where: { id } },
        )
        .then(() => {
            createAdminLog(userId, `회원 [ID ${id}] 상태 [${status}]으로 변경`);
            return true;
        })
        .catch(() => {
            throw ConflictError('Delete(Update) error occured');
        });
};
