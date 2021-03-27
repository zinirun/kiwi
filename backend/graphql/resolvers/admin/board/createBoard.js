/**
 * 게시판 추가
 */

const models = require('../../../../models');
const isAdmin = require('../../../middlewares/isAdmin');
const { ConflictError } = require('../../../errors/errors');
const { createAdminLog } = require('../../../services/log.service');

module.exports = async ({ board }, { id: userId }) => {
    await isAdmin(userId);
    return await models.board
        .create({
            ...board,
        })
        .then(() => {
            createAdminLog(userId, `[${board.boardName}] 게시판 추가`);
            return true;
        })
        .catch(() => ConflictError());
};
