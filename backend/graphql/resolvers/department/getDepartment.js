/**
 * 학과 정보 read
 * @author 이건욱
 * @param (id: ID!)
 * @returns {Department}
 * type Department {
        id: ID!
        deptName: String!
        presidentId: Int!
        vicePresidentId: Int!
        createdAt: Date!
        updatedAt: Date
    }
* getDepartmentById(id: ID!): Department!
 */

const models = require('../../../models');
const { NotFoundError } = require('../../errors/errors');

module.exports = async ({ id }, {}) => {
    const department = await models.department.findOne({
        attributes: ['deptName', 'presidentId', 'vicePresidentId', 'createdAt', 'updatedAt'],
        where: { id },
        raw: true,
    });
    if (!department) {
        throw NotFoundError('Department not exists');
    }
    return department;
};
