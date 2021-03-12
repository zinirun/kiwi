/**
 * 게시물 댓글 정보 추출
 * @author 신창우
 * @param {postId}
 * @returns {Comment}
 * type Comment {
        id: ID!
        postId: ID!
        authorId: ID!
        content: String!
        isDeleted: Int!
        isAnonymous: Int!
        createdAt: Date!
        updatedAt: Date
    }
* getCommentById(id: ID!): Comment!
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');
module.exports = async ({ postId }, {}) => {
    const query = `select u.id                          as userId,
    u.userName,
    c.content,
    c.createdAt,
    c.id,
    ifnull(v.commentLikeCount, 0) as likeCount
from user u
      join comment c on u.id = c.authorId
      left join (select cl.id, count(cl.id) as commentLikeCount, commentId
                 from comment_like cl
                 where cl.isDeleted = 0
                 group by cl.commentId) as v on c.id = v.commentId
where postId = postId;`;
    return await models.sequelize
        .query(query, {
            replacements: {
                postId,
            },
        })
        .spread(
            (result) => JSON.parse(JSON.stringify(result)),
            (error) => ConflictError('Error occured at Selection'),
        );
};
// query getCommentsByPostId {
//     getCommentsByPostId(postId: 1){
//         id
//         userId
//         userName
//         content
//         likeCount
//       }
//     }
