/**
 * 모든 메인공지 추출
 */

const models = require('../../../../models');
const isAdmin = require('../../../middlewares/isAdmin');

module.exports = async ({}, { id: userId }) => {
    await isAdmin(userId);
    return await models.main_notice.findAll({
        attributes: ['id', 'type', 'content', 'isDeleted'],
        raw: true,
    });
};
