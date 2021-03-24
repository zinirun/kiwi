/**
 *  게시물 스크랩 (스크랩 create)
 * @author 이건욱
 * @param {postId}
 * @returns {String(Add / Delete)}
 * scrapPost(postId: ID!): String
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ postId }, { id: userId }) => {
    const data = await models.scrap.findOne({
        attributes: ['isDeleted'],
        where: { postId, userId },
        raw: true,
    });

    if (data) {
        const { isDeleted } = data;

        if (isDeleted === 0) {
            return models.scrap
                .update(
                    {
                        isDeleted: 1,
                    },
                    { where: { userId, postId } },
                )
                .then(() => 'Delete')
                .catch(() => ConflictError('Update error occured at Down'));
        } else {
            return models.scrap
                .update(
                    {
                        isDeleted: 0,
                    },
                    { where: { userId, postId } },
                )
                .then(() => 'Add')
                .catch(() => ConflictError('Update error occured at Up'));
        }
    } else {
        return models.scrap
            .create({
                userId,
                postId,
            })
            .then(() => {
                return 'Delete';
            })
            .catch(() => ConflictError('Insert error occured at Up'));
    }
};
