/**
 * 내가 쓴 게시물 Read
 * @author 이건욱
 * @param
 * @returns {[Post]}
 * type Post {
        id: ID!
        boardId: ID!
        boardName: String!
        title: String!
        content: String!
        companyName: String
        gradeName: String!
        authorName: String!
        createdAt: Date!
        updatedAt: Date!
        likeCount: Int!
        commentCount: Int!
    }
* getMyPosts: [Post]
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({}, { id }) => {
    const query = `
                    select p.id, b.id as boardId, boardName, p.title, p.content, c.companyName, g.gradeName, u.userName as authorName, p.createdAt, p.updatedAt, cg.categoryName, ifnull(ppl.likeCount, 0) as likeCount, ifnull(pc.commentCount, 0) as commentCount
                    from post p
                        left join category cg on p.categoryId = cg.id
                        left join board b on p.boardId = b.id
                        left join (select c.id, count(c.id) as commentCount, postId from comment c where c.isDeleted = 0 group by c.postId) as pc on p.id = pc.postId
                        left join (select pl.id, count(pl.id) as likeCount, postId from post_like pl where pl.isDeleted = 0 group by pl.postId) as ppl on p.id = ppl.postId,
                        user u
                        left join company c on u.companyId = c.id
                        left join grade g on u.studentGradeId = g.id
                    where p.authorId = u.id
                    and u.id=:id;
                    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                id,
            },
        })
        .spread(
            (result) => JSON.parse(JSON.stringify(result)),
            () => ConflictError('Database error'),
        );
};
