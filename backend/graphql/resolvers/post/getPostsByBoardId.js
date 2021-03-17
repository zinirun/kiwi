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

module.exports = async ({ boardId }, { departmentId }) => {
    const query = `
                    select p.id as postId, p.title, uc.companyName, ug.gradeName, u.userName, p.updatedAt, cg.categoryName, ifnull(ppl.likeCount, 0) as likeCount, ifnull(pc.commentCount, 0) as commentCount
                    from post p
                        join user u on p.authorId = u.id
                        left join category cg on p.categoryId = cg.id
                        left join (select count(*) as commentCount, postId from comment c where c.isDeleted = 0 and c.postId = 1) as pc on p.id = pc.postId
                        left join (select count(*) as likeCount, postId from post_like pl where pl.isDeleted = 0) as ppl on p.id = ppl.postId
                        join (select g.gradeName from grade g join user u on u.studentGradeId = g.id) as ug
                        join (select c.companyName from company c left join user u on u.companyId = c.id) as uc
                    where p.boardId=:boardId
                    and p.departmentId=:departmentId
                    group by p.id
                    order by p.id desc;
                    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                boardId,
                departmentId,
            },
        })
        .spread(
            (result) => JSON.parse(JSON.stringify(result)),
            () => NotFoundError('There is no board corresponding to the id'),
        );
};
