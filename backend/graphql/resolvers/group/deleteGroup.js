/**
 * 그룹 삭제
 * @author zini
 * @param {id}
 * @return {Boolean}
 * @resolver deleteGroup(id: ID!): Boolean
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ id }, { id: masterId }) => {
    return await models.groups
        .update(
            {
                isDeleted: 0,
            },
            {
                where: {
                    id,
                    masterId,
                },
            },
        )
        .then(() => true)
        .catch(() => {
            throw ConflictError('Conflict error occured at Update');
        });
};
