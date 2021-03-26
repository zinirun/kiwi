/**
 * 신고글 조회
 * @author 신창우
 * @param
 * @returns {Report}
 * type type Report {
        id: ID!
        userId: ID!
        userName: String!
        deptName: String!
        content: String!
        isCompleted: Int!
        createdAt: Date!
        updatedAt: Date
    }
* getReports(isCompleted: Int!): [Report]
 */

const models = require('../../../models');
const { NotFoundError } = require('../../errors/errors');
const isAdmin = require('../../middlewares/isAdmin');

module.exports = async ({ isCompleted }, { id: userId }) => {
    await isAdmin(userId);
    const query = `
    select r.id, r.userId, userName, deptName, content, isCompleted, createdAt
from report r
join (select u.id, userName, deptName, departmentId
    from user u
    join department d on d.id = u.departmentId) as z on r.userId = z.id
where isCompleted = :isCompleted
                    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                isCompleted,
            },
        })
        .spread(
            (result) => JSON.parse(JSON.stringify(result)),
            () => NotFoundError('There is no report corresponding to the id'),
        );
};
