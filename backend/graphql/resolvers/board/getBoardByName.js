/**
 * 게시판 정보 Read
 * @author 허전진
 * @param (boardName: String!)
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

module.exports = async ({ boardName }, {}) => {
    const board = await models.board.findOne({
        attributes: ['id', 'boardName', 'link', 'icon'],
        where: { link: boardName },
        raw: true,
    });
    if (!board) {
        throw NotFoundError('Board not exists');
    }
    return board;
};
