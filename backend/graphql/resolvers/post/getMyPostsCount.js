const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({}, { id }) => {
    const query = `
                    select p.id, COUNT(p.id) as postsCount
                    from post p
                    where p.authorId = :id
                    and p.isDeleted = 0
                    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                id,
            },
        })
        .spread(
            (result) => JSON.parse(JSON.stringify(result[0].postsCount)),
            () => ConflictError('Database error'),
        );
};
