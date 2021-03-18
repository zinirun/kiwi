/**
 * 게시물 Read
 * @author 이건욱
 * @param (boardId: ID!)
 * @returns {[PostList]}
 * type PostList {
        postId: ID!
        title: String!
        companyName: String
        gradeName: String
        userName: String!
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
                    select p.id, p.title, c.companyName, g.gradeName, u.userName as authorName, p.updatedAt, cg.categoryName, ifnull(ppl.likeCount, 0) as likeCount, ifnull(pc.commentCount, 0) as commentCount
                    from post p
                        left join category cg on p.categoryId = cg.id
                        left join (select count(*) as commentCount, postId from comment c where c.isDeleted = 0 and c.postId = 1) as pc on p.id = pc.postId
                        left join (select count(*) as likeCount, postId from post_like pl where pl.isDeleted = 0) as ppl on p.id = ppl.postId,
                        user u
                        left join company c on u.companyId = c.id
                        left join grade g on u.studentGradeId = g.id
                    where p.authorId = u.id
                    and p.boardId=:boardId
                    and p.departmentId=:departmentId
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
