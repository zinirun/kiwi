/**
 * 유저 정보 Read by studentId
 * @author 이건욱
 * @returns {User}
 * @params (studentNumber: Int!)
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
* getUserByStudentNumber(studentNumber: Int!): User!
 */

const models = require('../../../models');
const { NotFoundError } = require('../../errors/errors');
const isAdmin = require('../../middlewares/isAdmin');

module.exports = async ({ studentNumber }, { id: userId }) => {
    await isAdmin(userId);
    const user = await models.user.findOne({
        attributes: [
            'id',
            'userAccount',
            'userName',
            'studentNumber',
            'studentGradeId',
            'email',
            'departmentId',
            'type',
            'status',
        ],
        include: [
            {
                model: models.department,
                attributes: [['deptName', 'department']],
            },
            {
                model: models.grade,
                attributes: [['gradeName', 'grade']],
            },
        ],
        where: { studentNumber },
        raw: true,
    });
    if (!user) {
        throw NotFoundError('user not exists');
    }
    return {
        id: user.id,
        userAccount: user.userAccount,
        userName: user.userName,
        email: user.email,
        studentNumber: user.studentNumber,
        studentGradeId: user.studentGradeId,
        departmentId: user.departmentId,
        type: user.type,
        department: user['department.department'],
        grade: user['grade.grade'],
    };
};
