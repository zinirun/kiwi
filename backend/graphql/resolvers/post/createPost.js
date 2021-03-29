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
const { createNotificationPostSpecial } = require('../../services/notification.service.js');
const { setCachedPostListUpdated } = require('../../../api/caching');

module.exports = async ({ post }, { id: authorId, departmentId, type: userType }) => {
    const isSpecial = await canAccessSpecialBoard(post.boardId, userType);
    return await models.post
        .create({
            authorId,
            ...post,
            categoryId: post.categoryId || null,
            departmentId,
        })
        .then(async (result) => {
            const data = result.get({ plain: true });
            await setCachedPostListUpdated(departmentId, post.boardId);
            if (isSpecial) {
                createNotificationPostSpecial(data.id, departmentId, authorId);
            }
            return {
                ...data,
            };
        })
        .catch(() => {
            throw ConflictError('Update error occured');
        });
};
