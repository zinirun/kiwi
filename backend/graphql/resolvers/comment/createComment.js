/**
 * 댓글 작성
 * @author 신창우
 * @param input CommentInput {
        postId: ID!
        content: String!
    }
* type Comment {
        id: ID!
        postId: ID!
        authorId: ID!
        userName: String!
        content: String!
        gradeName: String!
        isDeleted: Int!
        likeCount: Int!
        createdAt: Date!
        updatedAt: Date
    }   
* createComment(comment: CommentInput!): CommentAfterCreate
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');
const { createNotificationPostComment } = require('../../services/notification.service.js');
const { setCachedPostUpdated } = require('../../../api/caching');

module.exports = async ({ comment }, { id: authorId }) => {
    return await models.comment
        .create({
            authorId,
            ...comment,
        })
        .then(async (result) => {
            const data = result.get({ plain: true });
            createNotificationPostComment(data.postId, authorId);
            await setCachedPostUpdated(data.postId);
            return {
                ...data,
            };
        })
        .catch(() => {
            throw ConflictError('Update error occured');
        });
};
