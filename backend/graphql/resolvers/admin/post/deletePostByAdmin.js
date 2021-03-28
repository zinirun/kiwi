/**
 * 게시글 삭제 (하위 댓글도 삭제)
 * @author 신창우
 * @param (id: ID!)
 *
 * deletePostByAdmin(id: ID!): Boolean
 */

const isAdmin = require('../../../middlewares/isAdmin');
const models = require('../../../../models');
const { ConflictError } = require('../../../errors/errors');
const { createAdminLog } = require('../../../services/log.service');
const { createNotificationPostDeleted } = require('../../../services/notification.service');

module.exports = async ({ id, reason }, { id: userId }) => {
    await isAdmin(userId);
    await models.comment
        .update(
            {
                isDeleted: 1,
            },
            { where: { postId: id } },
        )
        .then((result) => {
            if (result[0] === 0) {
                return false;
            }
            return true;
        })
        .catch(() => {
            throw ConflictError('Delete(Update) error occured');
        });
    return await models.post
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
            createAdminLog(userId, `게시글 [ID: ${id}] 삭제 - 사유 [${reason}]`);
            createNotificationPostDeleted(id, reason);
            return true;
        })
        .catch(() => {
            throw ConflictError('Delete(Update) error occured');
        });
};
