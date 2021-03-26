/**
 * 카테고리 추가
 */

const models = require('../../../../models');
const isAdmin = require('../../../middlewares/isAdmin');
const { ConflictError } = require('../../../errors/errors');

module.exports = async ({ category }, { id: userId }) => {
    await isAdmin(userId);
    return await models.category
        .create({
            ...category,
        })
        .then(() => true)
        .catch(() => ConflictError());
};
