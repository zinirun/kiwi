/**
 * 게시판 접근 미들웨어 (학과 간부 이용)
 * @author zini
 * @param userId
 * @middleware
 * getBoardById(id: ID!): Board!
 */

const models = require('../../models');
const { AuthorizationError } = require('../errors/errors');

module.exports = async (boardId, userType) => {
    const { isSpecial } = await models.board.findOne({
        attributes: ['id', 'isSpecial'],
        where: { id: boardId },
        raw: true,
    });
    if (isSpecial && userType !== 9) {
        throw AuthorizationError('Board not exists');
    }
    return;
};
