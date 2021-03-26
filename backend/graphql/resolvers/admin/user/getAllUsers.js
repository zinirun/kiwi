/**
 * 모든 유저 정보 Read
 * @author 이건욱
 * @returns {User}
 * type User {
        id: ID!
        userAccount: String!
        userName: String!
        studentNumber: String!
        studentGradeId: ID!
        grade: String
        email: String
        departmentId: ID!
        department: String
        status: Int
        type: Int
    }
* getAllUsers: [User]
 */

const models = require('../../../../models');
const { ConflictError } = require('../../../errors/errors');
const isAdmin = require('../../../middlewares/isAdmin');

module.exports = async ({}, { id: userId }) => {
    await isAdmin(userId);
    const query = `
                    select u.id,
                    u.userAccount,
                    u.userNAme,
                    u.studentNumber,
                    u.studentGradeId,
                    g.gradeName as grade,
                    u.email,
                    u.departmentId,
                    d.deptName as department,
                    u.status,
                    u.type
                    from user u
                        left join grade g on u.studentGradeId = g.id
                        left join department d on u.departmentId = d.id;
                    `;
    return await models.sequelize.query(query, {}).spread(
        (result) => JSON.parse(JSON.stringify(result)),
        () => ConflictError('Database error'),
    );
};
