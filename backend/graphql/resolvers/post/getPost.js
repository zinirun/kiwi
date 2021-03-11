/**
 * 게시물 정보 추출
 * @author 이건욱
 * @param (id: ID!)
 * @returns {Post}
 * type Post {
        id: ID!
        boardId: ID!
        categoryId: ID!
        authorId: ID!
        title: String!
        content: String!
        isDeleted: Int!
        createdAt: Date!
        updatedAt: Date!
    }
 */

const models = require('../../../models');
const { NotFoundError } = require('../../errors/errors');

module.exports = async ({ id }, {}) => {
    const post = await models.post.findOne({
        attributes: [
            'boardId',
            'categoryId',
            'authorId',
            'title',
            'content',
            'isDeleted',
            'createdAt',
            'updatedAt',
        ],
        where: { id },
        raw: true,
    });
    if (!post) {
        throw NotFoundError('Post not exists');
    }
    return user;
};
