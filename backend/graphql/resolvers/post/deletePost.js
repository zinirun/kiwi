/**
 * 게시물 Delete (isDeleted = 1)
 * @author 이건욱
 * @param (id: ID!)
 *
 * deletePost(id: ID!): Boolean
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ id }, { id: authorId }) => {
    return await models.post
        .update(
            {
                isDeleted: 1,
            },
            { where: { id, authorId } },
        )
        .then((result) => {
            if (result[0] === 0) {
                return false;
            }
            return true;
        })
        .catch(() => {
            throw ConflictError('Delete(Update) error occured');
        });
};
