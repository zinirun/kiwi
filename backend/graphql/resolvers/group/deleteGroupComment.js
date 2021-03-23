/**
 * 그룹 코멘트 삭제
 * @author zini
 * @param {id}
 * @return {Boolean}
 * @resolver deleteGroupComment(id: ID!): Boolean
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ id }, { id: authorId }) => {
    return await models.group_comment
        .update(
            {
                isDeleted: 0,
            },
            {
                where: {
                    id,
                    authorId,
                },
            },
        )
        .then(() => true)
        .catch(() => {
            throw ConflictError('Conflict error occured at Update');
        });
};
