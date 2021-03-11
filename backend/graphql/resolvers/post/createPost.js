/**
 * 게시물 생성
 * @author 이건욱
 * @param input PostInput {
        boardId: ID!
        categoryId: ID!
        title: String!
        content: String!
    }
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
* createPost(post: PostInput!): Post
 */

const models = require('../../../models');
const moment = require('moment');

module.exports = async ({ post }, { authorId }) => {
    return await models.post
        .create({
            authorId,
            ...post,
        })
        .then((result) => {
            const data = result.get({ plain: true });
            return {
                id: data.id,
                boardId: data.boardId,
                categoryId: data.categoryId,
                authorId: data.authorId,
                title: data.title,
                content: data.content,
                isDeleted: data.isDeleted,
                createdAt: moment(data.createdAt).format('YYYY-MM-DD'),
            };
        })
        .catch((error) => error);
};
