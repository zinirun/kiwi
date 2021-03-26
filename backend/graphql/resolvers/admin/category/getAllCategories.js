/**
 * 모든 카테고리 추출
 */

const models = require('../../../../models');
const isAdmin = require('../../../middlewares/isAdmin');

module.exports = async ({}, { id: userId }) => {
    await isAdmin(userId);
    return await models.category.findAll({
        attributes: [['id', 'categoryId'], 'categoryName', 'boardId', 'createdAt'],
        raw: true,
    });
};
