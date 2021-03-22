/**
 * 좋아요 갯수 param이상인 게시물 Read
 * @author 이건욱
 * @param (likeCount: Int!)
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

* getPostsByLikecount(likeCount: Int!): [PostList]
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ likeCount, pageNumber, elementCount }, { departmentId }) => {
    const query = `
                    select p.id, p.title, g.gradeName, u.userName as authorName, p.createdAt, p.updatedAt, cg.categoryName, ifnull(v.postLikeCount, 0) as likeCount, ifnull(z.commentCount, 0) as commentCount
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
                            left join grade g on u.studentGradeId = g.id
                    where p.authorId = u.id
                    and p.isDeleted = 0
                    and v.postLikeCount >= :likeCount
                    and p.departmentId = :departmentId
                    order by p.id desc limit :pages, :elementCount;
                    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                likeCount,
                departmentId,
                pages: elementCount * (+pageNumber - 1),
                elementCount,
            },
        })
        .spread(
            (result) => {
                return JSON.parse(JSON.stringify(result));
            },
            () => ConflictError('Database error'),
        );
};
