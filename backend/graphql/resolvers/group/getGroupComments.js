/**
 * 그룹 코멘트 반환
 * @author zini
 * @param {groupId}
 * @return {GroupComment}
 * @resolver getGroupComments(groupId: ID!): [GroupComment]
 * type GroupComment {
        id: ID!
        groupId: ID!
        userId: ID!
        authorId: ID!
        authorName: String!
        authorGradeName: String!
        content: String!
    }
 */

const models = require('../../../models');
const { ConflictError, BadRequestError } = require('../../errors/errors');

const query = `
    select gc.id, gc.groupId, gc.authorId as userId, u.userName as authorName, g.gradeName as authorGradeName, gc.content
    from user u
    join grade g on u.studentGradeId = g.gradeName
        join group_comment gc on gc.authorid = u.id
    where gc.groupId = :groupId;
`;

module.exports = async ({ groupId }, { id: userId }) => {
    const { groupId } = groupCommentInput;
    const isMember =
        (await models.groups.findOne({
            attributes: ['id', 'masterId', 'groupId'],
            where: { masterId: userId, id: groupId },
            raw: true,
        })) ||
        (await models.group_member.findOne({
            attributes: ['id', 'memberId', 'groupId'],
            where: { memberId: userId, groupId },
            raw: true,
        }));
    if (!isMember) {
        throw BadRequestError('Bad Request: Not Member or Master');
    }
    return await models.sequelize
        .query(query, {
            replacements: {
                groupId,
            },
        })
        .spread(
            (result) => {
                const comments = JSON.parse(JSON.stringify(result));
                return comments;
            },
            () => ConflictError('Error occured at Selection'),
        );
};
