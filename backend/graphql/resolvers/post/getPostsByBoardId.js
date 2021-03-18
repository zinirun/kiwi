/**
 * 게시판별 게시물 Read
 * @author 이건욱
 * @param (boardId: ID!)
 * @returns {[PostList]}
 * type PostList {
        postId: ID!
        title: String!
        companyName: String
        gradeName: String
        userName: String!
        createdAt: Date!
        updatedAt: Date!
        categoryName: String
        likeCount: Int!
        commentCount: Int!
    }

* getPostsByBoardId(boardId: ID!): [PostList]!
 */

const models = require('../../../models');
const { NotFoundError } = require('../../errors/errors');

module.exports = async ({ boardId, categoryId }, { departmentId }) => {
    const query = `
    select p.id,
    p.title,
    c.companyName,
    g.gradeName,
    u.userName                 as authorName,
    p.createdAt,
    p.updatedAt,
    cg.categoryName,
    ifnull(v.postlikeCount, 0)   as likeCount,
    ifnull(z.commentCount, 0) as commentCount
from post p
      left join category cg on p.categoryId = cg.id
      left join (select c.id, count(c.id) as commentCount, postId
                 from comment c
                 where c.isDeleted = 0
                 group by c.postId) as z on p.id = z.postId
      left join (select pl.id, count(pl.id) as postLikeCount, postId
                 from post_like pl
                 where pl.isDeleted = 0
                 group by pl.postId) as v on p.id = v.postId,
  user u
      left join company c on u.companyId = c.id
      left join grade g on u.studentGradeId = g.id
where p.authorId = u.id
and p.boardId = :boardId
and p.departmentId = :departmentId
                    ${categoryId && `and p.categoryId=:categoryId`}
                    order by p.id desc;
                    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                boardId,
                departmentId,
                categoryId,
            },
        })
        .spread(
            (result) => JSON.parse(JSON.stringify(result)),
            () => NotFoundError('There is no board corresponding to the id'),
        );
};
