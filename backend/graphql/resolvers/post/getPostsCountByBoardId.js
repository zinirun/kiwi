const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ boardId, categoryId }, { departmentId }) => {
    const query = `select p.id, COUNT(p.id) AS postsCount
    from post p
    where p.isDeleted = 0
    and p.boardId = :boardId
    and p.departmentId = :departmentId
    ${categoryId && `and p.categoryId=:categoryId`}
    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                departmentId,
                boardId,
                categoryId,
            },
        })
        .spread(
            (result) => JSON.parse(JSON.stringify(result[0].postsCount)),
            () => ConflictError('Database error'),
        );
};
