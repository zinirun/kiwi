/**
 * 메인 공지 추가
 */

const models = require('../../../../models');
const isAdmin = require('../../../middlewares/isAdmin');
const { ConflictError } = require('../../../errors/errors');
const { createAdminLog } = require('../../../services/log.service');
const { createNotificationMainNotice } = require('../../../services/notification.service');

module.exports = async ({ type, content }, { id: userId }) => {
    await isAdmin(userId);
    return await models.main_notice
        .create({
            type,
            content,
        })
        .then(() => {
            createNotificationMainNotice(content);
            createAdminLog(userId, `[${content}] 메인 공지 추가 - 타입 [${type}]`);
            return true;
        })
        .catch(() => ConflictError());
};
