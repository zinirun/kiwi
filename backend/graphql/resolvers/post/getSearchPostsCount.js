const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ boardId, searchValue }, { departmentId }) => {
    const query = `
                    select p.id, count(p.id) as postsCount
                    from post p
                    where p.isDeleted = 0
                    and p.boardId = :boardId
                    and p.departmentId = :departmentId
                    and p.title LIKE :searchValue;
                    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                boardId,
                departmentId,
                searchValue,
            },
        })
        .spread(
            (result) => JSON.parse(JSON.stringify(result[0].postsCount)),
            () => ConflictError('Database error'),
        );
};
