/**
 * 모든 학과 추출
 */

const models = require('../../../../models');
const isAdmin = require('../../../middlewares/isAdmin');

module.exports = async ({}, { id: userId }) => {
    await isAdmin(userId);
    return await models.department.findAll({
        attributes: ['id', 'deptName', 'createdAt'],
        raw: true,
    });
};
