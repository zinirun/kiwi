/**
 * 카테고리 추가
 */

const models = require('../../../../models');
const isAdmin = require('../../../middlewares/isAdmin');
const { ConflictError } = require('../../../errors/errors');
const { createAdminLog } = require('../../../services/log.service');

module.exports = async ({ category }, { id: userId }) => {
    await isAdmin(userId);
    return await models.category
        .create({
            ...category,
        })
        .then(() => {
            createAdminLog(
                userId,
                `[${category.categoryName}] 카테고리 [ID ${category.boardId}] 게시판에 추가`,
            );
            return true;
        })
        .catch(() => ConflictError());
};
