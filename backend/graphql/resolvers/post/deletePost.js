/**
 * 게시물 Delete (isDeleted = 1)
 * @author 이건욱
 * @param (id: ID!)
 * type Post {
        id: ID!
        boardId: ID!
        categoryId: ID!
        authorId: ID!
        title: String!
        content: String!
        isDeleted: Int!
        createdAt: Date!
        updatedAt: Date
    }
* deletePost(id: ID!): Boolean
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ id }, { id: authorId }) => {
    return await models.Post.update(
        {
            isDeleted: 1,
        },
        { where: { id, authorId } },
    )
        .then(() => {
            return true;
        })
        .catch(() => {
            throw ConflictError('Delete(Update) error occured');
        });
};
