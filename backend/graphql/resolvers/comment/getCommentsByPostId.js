/**
 * 게시물 댓글 정보 추출
 * @author 신창우
 * @param {postId}
 * @returns {Comment}
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
* getCommentById(id: ID!): CommentAfterCreate
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');
module.exports = async ({ postId }, {}) => {
    const query = `select u.id                          as authorId,
    u.userName,
    c.content,
    c.createdAt,
    c.id,
    g.gradeName,
    cm.companyName,
    ifnull(v.commentLikeCount, 0) as likeCount
from user u
      join comment c on u.id = c.authorId
      left join (select cl.id, count(cl.id) as commentLikeCount, commentId
                 from comment_like cl
                 where cl.isDeleted = 0
                 group by cl.commentId) as v on c.id = v.commentId
      join grade g on u.studentGradeId = g.id
      left join company cm on u.companyId = cm.id
where postId = postId
order by c.id desc;`;
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
