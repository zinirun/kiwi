const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({}, { id }) => {
    const query = `
    select c.id, COUNT(c.id) as commentsCount
    from comment c
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
