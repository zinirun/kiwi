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

module.exports = async () => {
    const boards = await models.board.findAll({
        attributes: ['id', 'boardName', 'link', 'icon', 'createdAt', 'updatedAt'],
        raw: true,
    });
    if (!boards) {
        throw NotFoundError('Boards not exists');
    }
    return boards;
};
