/**
 * 유저 정보 Update
 * @author 이건욱
 * @param input UserUpdateInput {
        studentGradeId: ID!
    }
 * updateUser(user: UserUpdateInput!): Boolean
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');
const { setCachedPostUpdated } = require('../../../api/caching');

module.exports = async ({ user }, { id }) => {
    return await models.user
        .update(
            {
                ...user,
            },
            { where: { id } },
        )
        .then(async () => {
            const usersPosts = await models.post.findAll({
                attributes: ['id'],
                where: {
                    authorId: id,
                },
                raw: true,
            });
            if (usersPosts.length > 0) {
                for (const { id } of usersPosts) {
                    await setCachedPostUpdated(id);
                }
            }
            return true;
        })
        .catch(() => {
            throw ConflictError('Update error occured');
        });
};
