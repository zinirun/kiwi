/**
 * 게시물 생성
 * @author 이건욱
 * @param input PostInput {
        boardId: ID!
        categoryId: ID!
        title: String!
        content: String!
    }
* type Post {
        id: ID!
        boardId: ID!
        categoryId: ID!
        authorId: ID!
        title: String!
        content: String!
        isDeleted: Int!
        createdAt: Date!
        updatedAt: Date
    }   
* createPost(post: PostInput!): Post
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ post }, { id: authorId }) => {
    return await models.post
        .create({
            authorId,
            ...post,
        })
        .then((result) => {
            const data = result.get({ plain: true });
            return {
                ...data,
            };
        })
        .catch(() => {
            throw ConflictError('Update error occured');
        });
};
