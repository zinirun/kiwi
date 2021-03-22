const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ likeCount }, { departmentId }) => {
    console.log(likeCount);
    const query = `SELECT p.id, COUNT(p.id) AS postsCount
    from post p
        left join (select pl.id, count(pl.id) as postLikeCount, postId
                    from post_like pl
                    where pl.isDeleted = 0
                    group by pl.postId) as v on p.id = v.postId
    where p.isDeleted = 0
    and v.postLikeCount >= :likeCount
    and p.departmentId = :departmentId
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
