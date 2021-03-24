/**
 *  스크랩된 게시물 Read
 * @author 이건욱
 * @param {pageNumber: Int!, elementCount: Int!}
 * @returns {[PostList]}
 * type PostList {
        id: ID!
        title: String!
        gradeName: String!
        authorName: String!
        createdAt: Date!
        categoryName: String
        likeCount: Int!
        commentCount: Int!
    }
* getScrapById(pageNumber: Int!, elementCount: Int!): [PostList]
 */

const models = require('../../../models');
const { NotFoundError } = require('../../errors/errors');

module.exports = async ({ pageNumber, elementCount }, { id, departmentId }) => {
    const query = `
                    select p.id,
                        p.title, g.gradeName,
                        u.userName as authorName,
                        p.createdAt,
                        p.updatedAt,
                        cg.categoryName,
                        ifnull(pl.postLikeCount, 0) as likeCount,
                        ifnull(c.commentCount, 0) as commentCount
                    from post p
                        left join scrap s on s.postId = p.id
                        left join category cg on p.categoryId = cg.id
                        left join (select id, count(id) as commentCount, postId
                                    from comment
                                    where isDeleted = 0
                                    group by postId) as c on p.id = c.postId
                        left join (select id, count(id) as postLikeCount, postId
                                    from post_like
                                    where isDeleted = 0
                                    group by postId) as pl on p.id = pl.postId,
                            user u
                            left join grade g on u.studentGradeId = g.id
                    where p.authorId = u.id
                    and s.userId = :id
                    and p.isDeleted = 0
                    and s.isDeleted = 0
                    and p.departmentId = :departmentId
                    order by p.id desc limit :pages, :elementCount;
                    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                id,
                departmentId,
                pages: elementCount * (+pageNumber - 1),
                elementCount,
            },
        })
        .spread(
            (result) => JSON.parse(JSON.stringify(result)),
            () => ConflictError('Database error'),
        );
};
