/**
 * 게시물 수정
 * @author 이건욱
 * @param (id: ID!)
 * type PostLike {
        id: ID!
        userId: ID!
        postId: ID!
        isLike: Int!
        createdAt: Date!
        updatedAt: Date
    }
* handlePostLike(postId: ID!): String
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ postId }, { id: userId }) => {
    const { isDeleted } = await models.post_like.findOne({
        attributes: ['isDeleted'],
        where: { postId, userId },
        raw: true,
    });
    if (!isDeleted) {
        if (isDeleted === 0) {
            const query =
                'update post_like set isDeleted=1 where userId=:userId and postId=:postId;';

            return await models.sequelize.query(query, { replacements: { userId, postId } }).spread(
                () => 'Down',
                () => ConflictError('Update error occured'),
            );
        } else {
            const query =
                'insert into post_like (userId, postId) values (userId=:userId, postId=:postId);';

            return await models.sequelize.query(query, { replacements: { userId, postId } }).spread(
                () => 'Up',
                () => ConflictError('Insert error occured'),
            );
        }
    } else {
        const query = 'update post_like set isDeleted=0 where userId=:userId and postId=:postId;';

        return await models.sequelize.query(query, { replacements: { userId, postId } }).spread(
            () => 'Up',
            () => ConflictError('Update error occured'),
        );
    }
};
