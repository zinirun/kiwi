/**
 * 게시물 Read
 * @author 이건욱
 * @param (id: ID!)
 * @returns {Post}
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
* getPostById(id: ID!): Post!
 */

const models = require('../../../models');
const { NotFoundError } = require('../../errors/errors');

module.exports = async ({ id }, { departmentId }) => {
    const query = `
                    select p.id, b.id as boardId, b.boardName, p.title, p.content, c.companyName, g.gradeName, u.userName as authorName, p.createdAt, p.updatedAt, cg.categoryName, ifnull(ppl.likeCount, 0) as likeCount, ifnull(pc.commentCount, 0) as commentCount
                    from post p
                        left join category cg on p.categoryId = cg.id
                        left join board b on b.id = p.boardId
                        left join (select count(*) as commentCount, postId from comment c where c.isDeleted = 0 and c.postId = 1) as pc on p.id = pc.postId
                        left join (select count(*) as likeCount, postId from post_like pl where pl.isDeleted = 0) as ppl on p.id = ppl.postId,
                        user u
                        left join company c on u.companyId = c.id
                        left join grade g on u.studentGradeId = g.id
                    where p.authorId = u.id
                    and p.id=:id
                    and p.departmentId=:departmentId;
                    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                id,
                departmentId,
            },
        })
        .spread(
            (result) => JSON.parse(JSON.stringify(result[0])),
            () => NotFoundError('There is no post corresponding to the id'),
        );
};
