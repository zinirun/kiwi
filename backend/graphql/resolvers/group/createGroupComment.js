/**
 * 그룹 코멘트 생성
 * @author zini
 * @param {groupCommentInput}
 * @return {GroupComment}
 * @resolver createGroupComment(groupCommentInput: GroupCommentInput!): GroupCommentAfterCreate
 * input GroupCommentInput {
        groupId: ID!
        content: String!
    }
 * type GroupCommentAfterCreate {
        id: ID!
        groupId: ID!
        authorId: ID!
    }
 */

const models = require('../../../models');
const { ConflictError, BadRequestError } = require('../../errors/errors');

module.exports = async ({ groupCommentInput }, { id: authorId }) => {
    const { groupId } = groupCommentInput;
    const isMember =
        (await models.groups.findOne({
            attributes: ['id', 'masterId'],
            where: { masterId: authorId, id: groupId },
            raw: true,
        })) ||
        (await models.group_member.findOne({
            attributes: ['memberId', 'groupId'],
            where: { memberId: authorId, groupId },
            raw: true,
        }));
    if (!isMember) {
        throw BadRequestError('Bad Request: Not Member or Master');
    }
    return await models.group_comment
        .create({
            ...groupCommentInput,
            authorId,
        })
        .then((result) => {
            const data = result.get({ plain: true });
            return {
                ...data,
            };
        })
        .catch(() => {
            throw ConflictError('Conflict error occured at Create');
        });
};
