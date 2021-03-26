/**
 * 신고 상태 update
 * @author 신창우
 * @param input input ReportCompletedInput {
        isCompleted: Int!
    }
 * completeReport(id: ID!, report: ReportCompletedInput!): Boolean
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');
const isAdmin = require('../../middlewares/isAdmin');

module.exports = async ({ id }, { id: userId }) => {
    await isAdmin(userId);
    return await models.report
        .update(
            {
                isCompleted: 1,
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
