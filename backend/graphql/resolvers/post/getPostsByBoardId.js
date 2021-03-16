/**
 * 게시글 리스트 Read
 *     type PostList {
        id: ID!
        title: String!
        userName: String!
        studentGradeId: String!
        companyId: String!
    }
* getPostsByBoardId(boardId: ID!): [PostList] */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ boardId }, {}) => {
    const query = `select p.id as postId, title, userName, studentGradeId, p.createdAt as createdAt from post p join user u on p.authorId=u.id where p.boardId=:boardId`;
    return await models.sequelize
        .query(query, {
            replacements: {
                boardId,
            },
        })
        .spread(
            (results) => JSON.parse(JSON.stringify(results)),
            (error) => ConflictError('Error occured at Selection'),
        );
};
