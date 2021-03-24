const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({}, { id: userId }) => {
    const query = `
                    select userId, count(userId) as scrapCount
                    from scrap
                    where userId = :userId
                    and isDeleted = 0;
                    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                userId,
            },
        })
        .spread(
            (result) => JSON.parse(JSON.stringify(result[0].scrapCount)),
            () => ConflictError('Database error'),
        );
};
