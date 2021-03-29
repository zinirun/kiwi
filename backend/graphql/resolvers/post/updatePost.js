/**
 * 게시물 Update
 * @author 이건욱
 * @param input PostUpdateInput {
        title: String!
        content: String!
    }
 * updatePost(id: ID!, post: PostUpdateInput!): Boolean
 */

const { setCachedPostUpdated, setCachedPostListUpdated } = require('../../../api/caching');
const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ id, post }, { id: authorId, departmentId }) => {
    return await models.post
        .update(
            {
                ...post,
            },
            { where: { id, authorId } },
        )
        .then(async () => {
            await setCachedPostUpdated(id);
            const { boardId } = await models.post.findOne({
                attributes: ['boardId'],
                raw: true,
                where: {
                    id,
                },
            });
            await setCachedPostListUpdated(departmentId, boardId);
            return true;
        })
        .catch(() => {
            throw ConflictError('Update error occured');
        });
};
