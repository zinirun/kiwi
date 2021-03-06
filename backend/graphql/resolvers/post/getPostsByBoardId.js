/**
 * 게시판별 게시물 Read
 * @author 이건욱
 * @param (boardId: ID!)
 * @returns {[PostList]}
 * type PostList {
        postId: ID!
        title: String!
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
const { getCachedPostList, setCachedPostList } = require('../../../api/caching');

module.exports = async ({ boardId, categoryId, pageNumber, elementCount }, { departmentId }) => {
    if (+pageNumber === 1 && !categoryId) {
        const cachedPostList = await getCachedPostList(departmentId, boardId);
        if (cachedPostList) {
            console.log(`postlist - cache hit! [${departmentId}:${boardId}]`);
            return cachedPostList;
        }
        console.log(`postlist - cache miss [${departmentId}:${boardId}]`);
    }

    const query = `
                    select p.id,
                        p.title,
                        g.gradeName,
                        u.userName as authorName,
                        p.createdAt, p.updatedAt,
                        cg.categoryName,
                        ifnull(v.postLikeCount, 0) as likeCount,
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
                        left join grade g on u.studentGradeId = g.id
                    where p.authorId = u.id
                    and p.isDeleted = 0
                    and p.boardId = :boardId
                    and p.departmentId = :departmentId
                    ${categoryId && `and p.categoryId=:categoryId`}
                    order by p.id desc limit :pages, :elementCount;
                    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                boardId,
                departmentId,
                categoryId,
                pages: elementCount * (+pageNumber - 1),
                elementCount,
            },
        })
        .spread(
            async (result) => {
                const postList = JSON.parse(JSON.stringify(result));
                setCachedPostList(departmentId, boardId, postList);
                return postList;
            },
            () => ConflictError('Database error'),
        );
};
