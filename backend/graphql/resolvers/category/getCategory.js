/**
 * 카테고리 정보 read
 * @author 이건욱
 * @param (id: ID!)
 * @returns {Category}
 * type Category {
        id: ID!
        boardId: ID!
        categoryName: String!
        createdAt: Date!
        updatedAt: Date
    }
* getCategoryById(id: ID!): Category!
 */

const models = require('../../../models');
const { NotFoundError } = require('../../errors/errors');

module.exports = async ({ id }, {}) => {
    const category = await models.category.findOne({
        attributes: ['boardId', 'categoryName', 'createdAt', 'updatedAt'],
        where: { id },
        raw: true,
    });
    if (!category) {
        throw NotFoundError('Category not exists');
    }
    return category;
};
