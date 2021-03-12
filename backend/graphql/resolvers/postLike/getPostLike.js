/**
 * 게시물 좋아요 정보 추출
 * @author 이건욱
 * @param (id: ID!)
 * @returns {PostLike}
 * type PostLike {
        id: ID!
        userId: ID!
        postId: ID!
        isLike: Int!
        createdAt: Date!
        updatedAt: Date
    }
* getPostLikeById(id: ID!): PostLike!
 */

const models = require('../../../models');
const { NotFoundError } = require('../../errors/errors');

module.exports = async ({ id }, {}) => {
    const query =
        'select count(*) as LikeCount from post p, post_like pl where p.id = pl.postId and p.id=:postId and pl.isDeleted=0;';

    return await models.sequelize.query(query, { replacements: { postId: id } }).spread(
        (results) => JSON.parse(JSON.stringify(results)),
        () => NotFoundError('There is no post corresponding to the id.'),
    );
};
