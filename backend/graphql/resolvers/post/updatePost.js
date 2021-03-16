/**
 * 게시물 Update
 * @author 이건욱
 * @param input PostUpdateInput {
        id: ID!
        title: String!
        content: String!
    }
 * UpdateInput!): Boolean
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ post }, { id: authorId }) => {
    return await models.Post.update(
        {
            title: post.title,
            content: post.content,
        },
        { where: { id: post.id, authorId } },
    )
        .then(() => {
            return true;
        })
        .catch(() => {
            throw ConflictError('Update error occured');
        });
};
