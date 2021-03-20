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

* getPostsByBoardId(boardId: ID!, categoryId: ID, pageNumber: Int!): [PostList]
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ boardId, categoryId, pageNumber }, { departmentId }) => {
    const query = `
                    select p.id, p.title, c.companyName, g.gradeName, u.userName as authorName, p.createdAt, p.updatedAt, cg.categoryName, ifnull(v.postLikeCount, 0) as likeCount, ifnull(z.commentCount, 0) as commentCount
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
                    and p.isDeleted = 0
                    and p.boardId = :boardId
                    and p.departmentId = :departmentId
                    ${categoryId && `and p.categoryId=:categoryId`}
                    order by p.id desc limit :pages, 10;
                    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                boardId,
                departmentId,
                categoryId,
                pages: 10 * (+pageNumber - 1),
            },
        })
        .spread(
            (result) => JSON.parse(JSON.stringify(result)),
            () => ConflictError('Database error'),
        );
};
