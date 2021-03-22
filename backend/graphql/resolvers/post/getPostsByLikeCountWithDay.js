/**
 * 주간, 월간 베스트 게시물 Read
 * @author 이건욱
 * @param (term: Int!)
 * @returns {[PostList]}
 * type PostList {
        id: ID!
        title: String!
        gradeName: String!
        authorName: String!
        updatedAt: Date!
        categoryName: String
        likeCount: Int!
        commentCount: Int!
    }
* getPostsByLikeCountWithDay(term: Int!): [PostList]
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ term }, { departmentId }) => {
    const query = `
    select p.id,
    p.title,
    g.gradeName,
    u.userName                 as authorName,
    p.createdAt,
    p.updatedAt,
    cg.categoryName,
    ifnull(z.likeCount, 0)    as likeCount,
    ifnull(x.commentCount, 0) as commentCount
from post p
      left join category cg on p.categoryId = cg.id
      left join board b on b.id = p.boardId
      left join (select count(c.id) as commentCount, c.postId
                 from comment c
                 where isDeleted = 0
                 group by postId) as x on p.id = x.postId
      left join (select count(pl.id) as likeCount, postId
                 from post_like pl
                 where isDeleted = 0
                 group by postId) as z on p.id = z.postId,
  user u
      left join grade g on u.studentGradeId = g.id
where p.authorId = u.id
and p.isDeleted = 0
and p.departmentId = :departmentId
and p.createdAt between substr(date_add(now(), interval -:term day), 1, 10) and substr(now(), 1, 10)
order by likeCount desc, id desc
limit 5;
                    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                term,
                departmentId,
            },
        })
        .spread(
            (result) => JSON.parse(JSON.stringify(result)),
            () => ConflictError('Database error'),
        );
};
