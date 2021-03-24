/**
 * 그룹 멤버 탈퇴 (멤버 자진탈퇴)
 * @author zini
 * @param {groupId}
 * @return {Boolean}
 * @resolver selfQuitGroupMember(groupId: ID!): Boolean
 */

const models = require('../../../models');
const { ConflictError, BadRequestError } = require('../../errors/errors');

module.exports = async ({ groupId }, { id: memberId }) => {
    const isMember = await models.group_member.findOne({
        attributes: ['memberId', 'groupId'],
        where: { memberId, groupId },
        raw: true,
    });
    if (!isMember) {
        throw BadRequestError('Bad Request: Not Member');
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
            throw ConflictError('Conflict error occured at Update');
        });
};
