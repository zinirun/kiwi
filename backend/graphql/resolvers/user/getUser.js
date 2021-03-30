/**
 * 유저 정보 Read
 * @author 이건욱 - modified by zini
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
* getUserById: User!
 */

const models = require('../../../models');
const { NotFoundError } = require('../../errors/errors');
const { getCachedUser, setCachedUser } = require('../../../api/caching');

module.exports = async ({}, { id }) => {
    const cachedUser = await getCachedUser(id);
    if (cachedUser) {
        console.log(`user - cache hit! [id: ${id}]`);
        return cachedUser;
    }
    const user = await models.user.findOne({
        attributes: [
            'id',
            'userAccount',
            'userName',
            'studentNumber',
            'studentGradeId',
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
        where: { id },
        raw: true,
    });
    if (!user) {
        throw NotFoundError('user not exists');
    }
    const ret_user = {
        id: user.id,
        userAccount: user.userAccount,
        userName: user.userName,
        studentNumber: user.studentNumber,
        studentGradeId: user.studentGradeId,
        departmentId: user.departmentId,
        type: user.type,
        status: user.status,
        department: user['department.department'],
        grade: user['grade.grade'],
    };
    if (ret_user.status !== 1) {
        throw BadRequestError('not normal user');
    }
    await setCachedUser(id, ret_user);
    return ret_user;
};
