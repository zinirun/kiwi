/**
 * 학과 추가
 */

const models = require('../../../../models');
const isAdmin = require('../../../middlewares/isAdmin');
const { ConflictError } = require('../../../errors/errors');

module.exports = async ({ deptName }, { id: userId }) => {
    await isAdmin(userId);
    return await models.department
        .create({
            deptName,
        })
        .then(() => true)
        .catch(() => ConflictError());
};
