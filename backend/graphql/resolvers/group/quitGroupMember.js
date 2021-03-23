/**
 * 그룹 멤버 탈퇴 (마스터 권한)
 * @author zini
 * @param {groupId, memberId}
 * @return {Boolean}
 * @resolver quitGroupMember(groupId: ID!, memberId: ID!): Boolean
 */

const models = require('../../../models');
const { ConflictError, BadRequestError } = require('../../errors/errors');

module.exports = async ({ groupId, memberId }, { id: masterId }) => {
    const isMaster = await models.groups.findOne({
        attributes: ['id', 'masterId'],
        where: { masterId, id: groupId },
        raw: true,
    });
    if (!isMaster) {
        throw BadRequestError('Bad Request: Not Master');
    }
    return await models.group_member
        .update(
            {
                isDeleted: 1,
            },
            {
                where: {
                    memberId,
                    groupId,
                },
            },
        )
        .then(() => true)
        .catch(() => {
            throw ConflictError('Conflict error occured at Create');
        });
};
