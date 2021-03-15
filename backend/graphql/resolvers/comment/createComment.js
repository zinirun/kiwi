/**
 * 댓글 작성
 * @author 신창우
 * @param input CommentInput {
        postId: ID!
        isAnonymous: Int
        content: String!
    }
* type Comment {
        id: ID!
        postId: ID!
        authorId: ID!
        userName: String!
        content: String!
        gradeName: String!
        companyName: String!
        isDeleted: Int!
        isAnonymous: Int!
        likeCount: Int!
        createdAt: Date!
        updatedAt: Date
    }   
* createComment(comment: CommentInput!): Comment
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ comment }, { id: authorId }) => {
    return await models.comment
        .create({
            authorId,
            ...comment,
        })
        .then((result) => {
            const data = result.get({ plain: true });
            return {
                ...data,
            };
        })
        .catch(() => {
            throw ConflictError('Update error occured');
        });
};
// mutation createComment($comment: CommentInput!) {
//     createComment(comment: $comment){
//         id
//         postId
//         userId
//         content
//         isAnonymous
//         createdAt
//       }
//     }
