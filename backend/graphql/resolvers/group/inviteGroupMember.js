/**
 * 그룹 멤버 초대
 * @author zini
 * @param {groupId, memberId}
 * @return {Boolean}
 * @resolver inviteGroupMember(groupId: ID!, memberId: ID!): Boolean
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
    const isAlreadyExists = await models.group_member.findOne({
        attributes: ['memberId', 'groupId', 'isDeleted'],
        where: { memberId, groupId },
        raw: true,
    });
    if (isAlreadyExists) {
        if (isAlreadyExists.isDeleted === 1) {
            return await models.group_member
                .update(
                    {
                        isDeleted: 0,
                    },
                    {
                        where: {
                            groupId,
                            memberId,
                        },
                    },
                )
                .then(() => {
                    createNotificationGroupInvite(groupId, memberId);
                    return true;
                })
                .catch(() => {
                    throw ConflictError('Conflict error occured at Create');
                });
        }
        throw BadRequestError('Bad Request: Already Member');
    }

    return await models.group_member
        .create({
            groupId,
            memberId,
        })
        .then(() => {
            createNotificationGroupInvite(groupId, memberId);
            return true;
        })
        .catch(() => {
            throw ConflictError('Conflict error occured at Create');
        });
};
