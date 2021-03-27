const models = require('../../models');

/**
 * 관리자 LOG 추가
 */
const createAdminLog = async (userId, log) => {
    return await models.admin_log.create({
        userId,
        log,
    });
};

module.exports = {
    createAdminLog,
};
