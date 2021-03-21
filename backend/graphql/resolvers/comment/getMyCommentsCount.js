const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({}, { id }) => {
    const query = `
    select c.id, COUNT(c.id) as commentsCount
    from user u
        join comment c on u.id = c.authorId
        left join (select cl.id, count(cl.id) as commentLikeCount, commentId from comment_like cl where cl.isDeleted = 0 group by cl.commentId) as v on c.id = v.commentId
        left join grade g on u.studentGradeId = g.id
        left join company cm on u.companyId = cm.id
    where c.authorId = :id
    and c.isDeleted = 0
    order by c.id;
                    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                id,
            },
        })
        .spread(
            (result) => JSON.parse(JSON.stringify(result[0].commentsCount)),
            () => ConflictError('Database error'),
        );
};
