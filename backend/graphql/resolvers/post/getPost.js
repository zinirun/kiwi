/**
 * 게시물 정보 추출
 * @author 이건욱
 * @param (boardId: ID!)
 * @returns {Post}
 * type Post {
        id: ID!
        boardId: ID!
        categoryId: ID!
        authorId: ID!
        title: String!
        content: String!
        isDeleted: Int!
        likeCount: Int!
        dislikeCount: Int!
        createdAt: Date!
        updatedAt: Date!
    }
 */

const models = require('../../../models');
const { BadRequestError } = require('../../errors/errors');

module.exports = async ({ id }, {}) => {
    const user = await models.post.findOne({
        attributes: [
            'boardId',
            'categoryId',
            'authorId',
            'title',
            'content',
            'isDeleted',
            'likeCount',
            'dislikeCount',
            'createdAt',
            'updatedAt',
        ],
        where: { id },
        raw: true,
    });
    if (!user) {
        throw BadRequestError('Post not exists');
    }
    return user;
};
