/**
 * 게시물 Delete (isDeleted = 1)
 * @author 이건욱
 * @param (id: ID!)
 *
 * deletePost(id: ID!): Boolean
 */

const { setCachedPostUpdated } = require('../../../api/caching');
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
        .then((result) => {
            console.log(result);
            if (result[0] === 0) {
                return false;
            }
            return true;
        })
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
            return true;
        })
        .catch(() => {
            throw ConflictError('Delete(Update) error occured');
        });
};
