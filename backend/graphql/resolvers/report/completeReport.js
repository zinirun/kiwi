/**
 * 신고 상태 update
 * @author 신창우
 * @param input input ReportCompletedInput {
        isCompleted: Int!
    }
 * completeReport(id: ID!): Boolean
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');
const { createNotificationReportResult } = require('../../services/notification.service');
const isAdmin = require('../../middlewares/isAdmin');

module.exports = async ({ id, result, reporterId }, { id: userId }) => {
    await isAdmin(userId);
    return await models.report
        .update(
            {
                isCompleted: 1,
            },
            { where: { id } },
        )
        .then(() => {
            createNotificationReportResult(reporterId, result);
            return true;
        })
        .catch(() => {
            throw ConflictError('Update error occured');
        });
};
