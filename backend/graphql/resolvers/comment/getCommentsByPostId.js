/**
 * 게시물 댓글 정보 추출
 * @author 신창우
 * @param {postId}
 * @returns {Comment}
 * type Comment {
        id: ID!
        userId: ID!
        postId: ID!
        authorId: ID!
        authorName: String!
        content: String!
        gradeId: ID!
        gradeName: String!
        isDeleted: Int!
        likeCount: Int!
        createdAt: Date!
        updatedAt: Date
    }
* getCommentById(id: ID!): Comment!
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');
module.exports = async ({ id }, { id: userId }) => {
    const query = `
                    select c.id,
                        u.id as authorId,
                        postId,
                        u.userName as authorName,
                        c.content,
                        c.createdAt,
                        g.id as gradeId,
                        g.gradeName,
                        ifnull(v.commentLikeCount, 0) as likeCount
                    from user u
                        join comment c on u.id = c.authorId
                        left join (select cl.id, count(cl.id) as commentLikeCount, commentId from comment_like cl where cl.isDeleted = 0 group by cl.commentId) as v
                        on c.id = v.commentId
                        left join grade g on u.studentGradeId = g.id
                    where postId = :id
                    and c.isDeleted = 0
                    order by c.id;
                    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                id,
            },
        })
        .spread(
            (result) => {
                const comments = JSON.parse(JSON.stringify(result));
                return comments.map((c) => {
                    return {
                        ...c,
                        userId,
                    };
                });
            },
            () => ConflictError('Error occured at Selection'),
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
