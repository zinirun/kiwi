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

module.exports = async ({ id }, {}) => {
    const board = await models.board.findOne({
        attributes: ['id', 'boardName', 'link', 'createdAt', 'updatedAt'],
        where: { id },
        raw: true,
    });
    if (!board) {
        throw NotFoundError('Board not exists');
    }
    return board;
};
