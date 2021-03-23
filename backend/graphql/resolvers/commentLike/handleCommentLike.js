/**
 * 댓글 좋아요 Create, Update, Delete
 * @author 신창우
 * @param (commentId: ID!)
 *
 * handleCommentLike(commentId: ID!): String
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');
const { createNotificationCommentLike } = require('../../services/notification.service.js');

module.exports = async ({ commentId }, { id: userId }) => {
    const data = await models.comment_like.findOne({
        attributes: ['isDeleted'],
        where: { commentId, userId },
        raw: true,
    });

    if (data) {
        const { isDeleted } = data;

        if (isDeleted === 0) {
            return models.comment_like
                .update(
                    {
                        isDeleted: 1,
                    },
                    { where: { userId, commentId } },
                )
                .then(() => 'Down')
                .catch(() => ConflictError('Update error occured at Down'));
            // const query =
            //     'update post_like set isDeleted=1 where userId=:userId and postId=:postId;';
            // return await models.sequelize.query(query, { replacements: { userId, postId } }).spread(
            //     () => 'Down',
            //     () => ConflictError('Update error occured'),
            // );
        } else {
            return models.comment_like
                .update(
                    {
                        isDeleted: 0,
                    },
                    { where: { userId, commentId } },
                )
                .then((result) => {
                    const data = result.get({ plain: true });
                    createNotificationCommentLike(data.commentId);
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
        return models.comment_like
            .create({
                userId,
                commentId,
            })
            .then((result) => {
                const data = result.get({ plain: true });
                createNotificationCommentLike(data.commentId);
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
