/**
 * 모든 게시판 추출
 * @author 허전진
 * @returns {Board}
 * type Board {
        id: ID!
        boardName: String!
        createdAt: Date!
        updatedAt: Date
    }
 */

const models = require('../../../models');
const { NotFoundError } = require('../../errors/errors');
const { getCachedBoardAll, setCachedBoardAll } = require('../../../api/caching');

module.exports = async () => {
    const cachedBoards = await getCachedBoardAll();
    if (cachedBoards) {
        console.log(`board-all - cache hit!`);
        return cachedBoards;
    }
    const boards = await models.board.findAll({
        attributes: ['id', 'boardName', 'link', 'icon', 'createdAt', 'isSpecial', 'updatedAt'],
        raw: true,
    });
    if (!boards) {
        throw NotFoundError('Boards not exists');
    }
    await setCachedBoardAll(boards);
    return boards;
};
