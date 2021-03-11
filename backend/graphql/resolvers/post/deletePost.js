/**
 * 게시물 삭제 (isDeleted = 1)
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
        updatedAt: Date!
    }
 */

const models = require('../../../models');

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
        .catch((err) => err);
};
