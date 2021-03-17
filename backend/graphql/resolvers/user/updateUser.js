/**
 * 유저 정보 Update
 * @author 이건욱
 * @param input UserUpdateInput {
        studentGradeId: ID!
        companyId: ID
    }
 * updateUser(user: UserUpdateInput!): Boolean
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ user }, { id }) => {
    return await models.user
        .update(
            {
                ...user,
            },
            { where: { id } },
        )
        .then(() => {
            return true;
        })
        .catch(() => {
            throw ConflictError('Update error occured');
        });
};
