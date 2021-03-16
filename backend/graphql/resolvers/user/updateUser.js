/**
 * 유저 정보 Update
 * @author 이건욱
 * @param input UserUpdateInput {
        id: ID!
        password: String!
        deparmentId: ID!
        studentGradeId: ID!
        companyId: ID
        updatedAt: Date!
    }
* updateUser(user: UserUpdateInput!): Boolean
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({}, { user }) => {
    return await models.user
        .update(
            {
                password: user.password,
                deparmentId: user.deparmentId,
                studentGradeId: user.studentGradeId,
                companyId: user.companyId,
                updatedAt: user.updatedAt,
            },
            { where: { id: user.id } },
        )
        .then(() => {
            return true;
        })
        .catch(() => {
            throw ConflictError('Update error occured');
        });
};
