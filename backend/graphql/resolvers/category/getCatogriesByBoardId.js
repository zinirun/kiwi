const models = require('../../../models');
const { NotFoundError } = require('../../errors/errors');

module.exports = async ({ boardId }, {}) => {
    const query = `
    SELECT c.id AS categoryId, categoryName FROM board b, category c where b.id = c.boardId AND c.boardId=:boardId;
    `;

    return await models.sequelize
        .query(query, {
            replacements: {
                boardId,
            },
        })
        .spread(
            (results) => JSON.parse(JSON.stringify(results)),
            () => NotFoundError(),
        );
};
