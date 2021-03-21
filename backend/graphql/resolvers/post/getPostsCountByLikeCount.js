const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ likeCount }, { departmentId }) => {
    console.log(likeCount);
    const query = `SELECT p.id, COUNT(p.id) AS postsCount
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
    and v.postLikeCount >= :likeCount
    and p.departmentId = :departmentId
    order by p.id desc;
    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                departmentId,
                likeCount,
            },
        })
        .spread(
            (result) => JSON.parse(JSON.stringify(result[0].postsCount)),
            () => ConflictError('Database error'),
        );
};
