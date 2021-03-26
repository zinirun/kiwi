/**
 * 게시판 추가
 */

const models = require('../../../../models');
const isAdmin = require('../../../middlewares/isAdmin');
const { ConflictError } = require('../../../errors/errors');

module.exports = async ({ board }, { id: userId }) => {
    await isAdmin(userId);
    return await models.board
        .create({
            ...board,
        })
        .then(() => true)
        .catch(() => ConflictError());
};
