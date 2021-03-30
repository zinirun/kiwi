/**
 * 게시물 좋아요 Create, Update, Delete
 * @author 이건욱
 * @param (postId: ID!)
 *
 * handlePostLike(postId: ID!): String
 */

const models = require('../../../models');
const { createNotificationPostLike } = require('../../services/notification.service');
const { ConflictError } = require('../../errors/errors');
const { setCachedPostUpdated } = require('../../../api/caching');

module.exports = async ({ postId }, { id: userId }) => {
    const data = await models.post_like.findOne({
        attributes: ['isDeleted'],
        where: { postId, userId },
        raw: true,
    });

    if (data) {
        const { isDeleted } = data;

        if (isDeleted === 0) {
            return models.post_like
                .update(
                    {
                        isDeleted: 1,
                    },
                    { where: { userId, postId } },
                )
                .then(async () => {
                    await setCachedPostUpdated(postId);
                    return 'Down';
                })
                .catch(() => ConflictError('Update error occured at Down'));
            // const query =
            //     'update post_like set isDeleted=1 where userId=:userId and postId=:postId;';
            // return await models.sequelize.query(query, { replacements: { userId, postId } }).spread(
            //     () => 'Down',
            //     () => ConflictError('Update error occured'),
            // );
        } else {
            return models.post_like
                .update(
                    {
                        isDeleted: 0,
                    },
                    { where: { userId, postId } },
                )
                .then(async () => {
                    await setCachedPostUpdated(postId);
                    return 'Up';
                })
                .catch(() => ConflictError('Update error occured at Up'));
            // const query =
            //     'update post_like set isDeleted=0 where userId=:userId and postId=:postId;';
            // return await models.sequelize.query(query, { replacements: { userId, postId } }).spread(
            //     () => 'Up',
            //     () => ConflictError('Update error occured'),
            // );
        }
    } else {
        return models.post_like
            .create({
                userId,
                postId,
            })
            .then(async () => {
                createNotificationPostLike(postId, userId);
                await setCachedPostUpdated(postId);
                return 'Up';
            })
            .catch(() => ConflictError('Insert error occured at Up'));
        // const query = 'insert into post_like (userId, postId) values (:userId, :postId);';
        // return await models.sequelize.query(query, { replacements: { userId, postId } }).spread(
        //     () => 'Up',
        //     () => ConflictError('Insert error occured'),
        // );
    }
};
