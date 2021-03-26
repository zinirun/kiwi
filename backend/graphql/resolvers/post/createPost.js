/**
 * 게시물 Create
 * @author 이건욱
 * @param input PostInput {
        boardId: ID!
        categoryId: ID!
        title: String!
        content: String!
    }
* createPost(post: PostInput!): PostAfterCreate
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');
const canAccessSpecialBoard = require('../../middlewares/canAccessSpecialBoard');

module.exports = async ({ post }, { id: authorId, departmentId, type: userType }) => {
    canAccessSpecialBoard(post.boardId, userType);
    return await models.post
        .create({
            authorId,
            ...post,
            categoryId: post.categoryId || null,
            departmentId,
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
