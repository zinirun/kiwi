/**
 * 모든 게시판 추출
 */

const models = require('../../../../models');
const isAdmin = require('../../../middlewares/isAdmin');

module.exports = async ({}, { id: userId }) => {
    await isAdmin(userId);
    return await models.board.findAll({
        attributes: ['id', 'boardName', 'link', 'icon', 'isSpecial', 'createdAt'],
        raw: true,
    });
};
