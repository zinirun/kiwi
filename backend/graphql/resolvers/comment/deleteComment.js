/**
 * 댓글 삭제
 * @author 신창우
 * @param (id: ID!)
 *
 * deleteComment(id: ID!): Boolean
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ id }, { id: authorId }) => {
    return await models.comment
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
