/**
 * 댓글 삭제
 * @author 신창우
 * @param (id: ID!)
 *
 * deleteComment(id: ID!): Boolean
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');
const { setCachedPostUpdated } = require('../../../api/caching');

module.exports = async ({ id }, { id: authorId }) => {
    return await models.comment
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
            const { postId } = await models.comment.findOne({
                attributes: ['postId'],
                raw: true,
                where: {
                    id,
                },
            });
            await setCachedPostUpdated(postId);
            return true;
        })
        .catch(() => {
            throw ConflictError('Delete(Update) error occured');
        });
};
