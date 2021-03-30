/**
 * 게시판 추가
 */

const models = require('../../../../models');
const isAdmin = require('../../../middlewares/isAdmin');
const { ConflictError } = require('../../../errors/errors');
const { createAdminLog } = require('../../../services/log.service');
const { setCachedBoardAllUpdated } = require('../../../../api/caching');

module.exports = async ({ board }, { id: userId }) => {
    await isAdmin(userId);
    return await models.board
        .create({
            ...board,
        })
        .then(async () => {
            createAdminLog(userId, `[${board.boardName}] 게시판 추가`);
            await setCachedBoardAllUpdated();
            return true;
        })
        .catch(() => ConflictError());
};
