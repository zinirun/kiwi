const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ boardId }, {}) => {
    const query = `
                    select c.id as categoryId,
                        b.id as boardId, b.boardName,
                        categoryName
                    from board b, category c
                    where b.id = c.boardId
                    and c.boardId = :boardId;
                    `;

    return await models.sequelize
        .query(query, {
            replacements: {
                boardId,
            },
        })
        .spread(
            (results) => JSON.parse(JSON.stringify(results)),
            () => ConflictError('Database error'),
        );
};
