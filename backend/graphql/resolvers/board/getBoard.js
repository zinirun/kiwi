/**
 * 게시판 정보 Read
 * @author 이건욱
 * @param (id: ID!)
 * @returns {Board}
 * type Board {
        id: ID!
        boardName: String!
        createdAt: Date!
        updatedAt: Date
    }
* getBoardById(id: ID!): Board!
 */

const models = require('../../../models');
const { NotFoundError } = require('../../errors/errors');
const { getCachedBoardById, setCachedBoardById } = require('../../../api/caching');

module.exports = async ({ id }, {}) => {
    const cachedBoard = await getCachedBoardById(id);
    if (cachedBoard) {
        console.log(`board - cache hit! [id: ${id}]`);
        return cachedBoard;
    }
    const board = await models.board.findOne({
        attributes: ['id', 'boardName', 'link', 'isSpecial', 'icon', 'createdAt', 'updatedAt'],
        where: { id },
        raw: true,
    });
    if (!board) {
        throw NotFoundError('Board not exists');
    }
    await setCachedBoardById(id, board);
    return board;
};
