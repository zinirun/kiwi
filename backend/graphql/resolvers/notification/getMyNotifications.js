/**
 * 나의 안 읽은 알림 가져오기
 * @author zini (query made by 이건욱)
 * @return {[Notification]}
 * type Notification {
        id: ID!
        type: String!
        postId: ID
        commentId: ID
        groupId: ID
        title: String!
        titleLength: Int!
        count: Int!
        updatedAt: Date!
    }
 * getMyNotifications: [Notification]
 */

const models = require('../../../models');

module.exports = async ({}, { id: userId }) => {
    const query = `
                    select n.id,
                        n.type,
                        n.postId,
                        n.commentId,
                        n.groupId,
                        n.count,
                        n.updatedAt,
                        substr(COALESCE(g.title, c.content, p.title), 1, 8) as title,
                        char_length(COALESCE(g.title, c.content, p.title)) as titleLength
                    from notification n
                        left join post p on p.id = n.postId
                        left join comment c on c.id = n.commentId
                        left join \`groups\` g on g.id = n.groupId
                    where n.isDeleted = 0
                    and n.userId = :userId;
                    `;
    return await models.sequelize.query(query, { replacements: { userId } }).spread(
        (results) => {
            console.log(JSON.parse(JSON.stringify(results)));
            return JSON.parse(JSON.stringify(results));
        },
        () => NotFoundError(),
    );
};
