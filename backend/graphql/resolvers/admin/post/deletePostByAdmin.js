/**
 * 댓글 삭제
 * @author 신창우
 * @param (id: ID!)
 *
 * deleteComment(id: ID!): Boolean
 */

const isAdmin = require('../../../middlewares/isAdmin');
const models = require('../../../../models');
const { ConflictError } = require('../../../errors/errors');

module.exports = async ({ id }, { id: userId }) => {
    await isAdmin(userId);
    await models.comment
        .update(
            {
                isDeleted: 1,
            },
            { where: { postId: id } },
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
    return await models.post
        .update(
            {
                isDeleted: 1,
            },
            { where: { id } },
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
