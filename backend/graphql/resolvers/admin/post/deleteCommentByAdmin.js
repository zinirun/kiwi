const isAdmin = require('../../../middlewares/isAdmin');
const models = require('../../../../models');
const { ConflictError } = require('../../../errors/errors');
const { createAdminLog } = require('../../../services/log.service');
const { createNotificationCommentDeleted } = require('../../../services/notification.service');

module.exports = async ({ id, postId, reason }, { id: userId }) => {
    await isAdmin(userId);
    return await models.comment
        .update(
            {
                isDeleted: 1,
            },
            { where: { id } },
        )
        .then((result) => {
            if (result[0] === 0) {
                return false;
            }
            createAdminLog(
                userId,
                `댓글 [ID: ${id}] 삭제 (게시글ID: ${postId}) - 사유 [${reason}]`,
            );
            createNotificationCommentDeleted(id, reason);
            return true;
        })
        .catch(() => {
            throw ConflictError('Delete(Update) error occured');
        });
};
