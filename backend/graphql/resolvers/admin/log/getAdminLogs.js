/**
 * 관리자 LOG 추출
 */

const models = require('../../../../models');
const isAdmin = require('../../../middlewares/isAdmin');

module.exports = async ({}, { id: userId }) => {
    await isAdmin(userId);
    return await models.admin_log.findAll({
        attributes: ['id', 'userId', 'log', 'createdAt'],
        raw: true,
    });
};
