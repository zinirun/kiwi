/**
 * 게시물 Delete (isDeleted = 1)
 * @author 이건욱
 * @param (id: ID!)
 *
 * deletePost(id: ID!): Boolean
 */

const { setCachedPostUpdated, setCachedPostListUpdated } = require('../../../api/caching');
const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ id }, { id: authorId }) => {
    await models.comment
        .update(
            {
                isDeleted: 1,
            },
            { where: { postId: id } },
        )
        .catch(() => {
            throw ConflictError('Delete(Update) error occured');
        });
    return await models.post
        .update(
            {
                isDeleted: 1,
            },
            { where: { id, authorId } },
        )
        .then(async (result) => {
            if (result[0] === 0) {
                return false;
            }
            await setCachedPostUpdated(id);
            const { boardId, departmentId } = await models.post.findOne({
                attributes: ['boardId', 'departmentId'],
                raw: true,
                where: {
                    id,
                },
            });
            await setCachedPostListUpdated(departmentId, boardId);
            return true;
        })
        .catch(() => {
            throw ConflictError('Delete(Update) error occured');
        });
};
