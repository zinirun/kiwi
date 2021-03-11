/**
 * 유저 정보 추출
 * @author 허전진
 * @param
 * @returns {User}
 * type User {
        id: ID!
        userAccount: String!
        userName: String!
        departmentId: ID!
        studentNumber: String!
        studentGradeId: ID!
        companyId: ID!
        status: Int!
    }
 */

const models = require('../../../models');
const { AuthorizationError } = require('../../errors/errors');
module.exports = async ({}, { id }) => {
    const user = await models.user.findOne({
        attributes: [
            'id',
            'userAccount',
            'userName',
            'departmentId',
            'studentNumber',
            'studentGradeId',
            'companyId',
            'status',
        ],
        where: { id },
        raw: true,
    });
    if (!user) {
        throw AuthorizationError;
    }
    return user;
};
