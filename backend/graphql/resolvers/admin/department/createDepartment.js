/**
 * 학과 추가
 */

const models = require('../../../../models');
const isAdmin = require('../../../middlewares/isAdmin');
const { ConflictError } = require('../../../errors/errors');
const { createAdminLog } = require('../../../services/log.service');

module.exports = async ({ deptName }, { id: userId }) => {
    await isAdmin(userId);
    return await models.department
        .create({
            deptName,
        })
        .then(() => {
            createAdminLog(userId, `[${deptName}] 학과 추가`);
            return true;
        })
        .catch(() => ConflictError());
};
