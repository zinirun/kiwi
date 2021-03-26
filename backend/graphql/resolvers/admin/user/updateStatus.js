const models = require('../../../../models');
const { ConflictError } = require('../../../errors/errors');
const isAdmin = require('../../../middlewares/isAdmin');

module.exports = async ({ status, id }, { id: userId }) => {
    await isAdmin(userId);
    return await models.user
        .update(
            {
                status,
            },
            { where: { id } },
        )
        .then(() => {
            return true;
        })
        .catch(() => {
            throw ConflictError('Delete(Update) error occured');
        });
};
