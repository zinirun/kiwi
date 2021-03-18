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
        gradeId: ID!
        gradeName: String!
        companyId: ID!
        companyName: String
        isDeleted: Int!
        likeCount: Int!
        createdAt: Date!
        updatedAt: Date
    }
* getCommentById(id: ID!): CommentAfterCreate
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');
module.exports = async ({ id }, {}) => {
    const query = `select c.id, u.id as authorId,
    postId,
    u.userName as authorName,
    c.content,
    c.createdAt,
    g.id as gradeId,
    g.gradeName,
    cm.id as companyId,
    cm.companyName,
    ifnull(v.commentLikeCount, 0) as likeCount
from user u
      join comment c on u.id = c.authorId
      left join (select cl.id, count(cl.id) as commentLikeCount, commentId
                 from comment_like cl
                 where cl.isDeleted = 0
                 group by cl.commentId) as v on c.id = v.commentId
      left join grade g on u.studentGradeId = g.id
      left join company cm on u.companyId = cm.id
where postId = :id
order by c.id;`;
    return await models.sequelize
        .query(query, {
            replacements: {
                id,
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
