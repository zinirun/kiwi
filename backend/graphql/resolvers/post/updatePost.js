/**
 * 게시물 Update
 * @author 이건욱
 * @param input PostUpdateInput {
        title: String!
        content: String!
    }
 * updatePost(post: PostUpdateInput!): Boolean
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ post }, { id }) => {
    return await models.post
        .update(
            {
                ...post,
            },
            { where: { authorId: id } },
        )
        .then(() => {
            return true;
        })
        .catch(() => {
            throw ConflictError('Update error occured');
        });
};
