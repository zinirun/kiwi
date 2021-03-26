/**
 * 신고 작성
 * @author 신창우
 * @param input nput ReportInput {
        content: String!
    }
* type Report {
        id: ID!
        userId: ID!
        content: String!
        isCompleted: Int!
        createdAt: Date!
        updatedAt: Date
    }   
* createReport(report: ReportInput!): Boolean
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ report }, { id: userId }) => {
    return await models.report
        .create({
            userId,
            ...report,
        })
        .then(() => true)
        .catch(() => {
            throw ConflictError('Update error occured');
        });
};
