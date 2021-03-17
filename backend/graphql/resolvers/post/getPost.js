/**
 * 게시물 Read
 * @author 이건욱
 * @param (id: ID!)
 * @returns {Post}
 * type Post {
        id: ID!
        authorId: ID!
        authorName: String!
        title: String!
        content: String!
        grade: String
        company: String
        likeCount: Int!
    }
* getPostById(id: ID!): Post!
 */

const models = require('../../../models');
const { NotFoundError } = require('../../errors/errors');

module.exports = async ({ id }, { departmentId }) => {
    const query = `
                    select u.id as authorId, u.userName as authorName, p.id as id, p.title as title, p.content as content, g.gradeName as grade, c.companyName as company, v.likeCount as likeCount
                    from user u
                        left join company c on u.companyId = c.id
                        inner join post p on u.id = p.authorId
                        inner join grade g on u.studentGradeId = g.id
                        inner join (select count(*) as likeCount, postId from post_like pl where pl.isDeleted=0) as v on p.id = v.postId
                    where p.id=:id and p.departmentId=:departmentId;
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
