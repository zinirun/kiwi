/**
 * 모든(안 읽은) 알림 개수 가져오기
 * @author zini
 * getNotificationsCount: Int
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({}, { id: userId }) => {
    const query = `
                    select count(n.id) as unreadCount, n.id
                    from notification n
                    where n.isDeleted = 0
                    and n.userId = :userId;
                    `;
    return await models.sequelize.query(query, { replacements: { userId } }).spread(
        (result) => {
            console.log(result);
            return result[0].unreadCount;
        },
        () => ConflictError(),
    );
};
