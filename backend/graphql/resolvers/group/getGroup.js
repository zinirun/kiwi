/**
 * 그룹 정보 가져오기
 * @author zini
 * @param {id}
 * @returns {Group}
 * type Group {
        id: ID!
        departmentId: ID!
        title: String!
        masterId: ID!
        masterName: String!
        masterGradeName: String!
        members: [GroupMember]
    }
    type GroupMember {
        memberId: ID!
        memberName: String!
        memberGradeName: String!
    }
* getGroup: Group
 */

const models = require('../../../models');
const { ConflictError, NotFoundError } = require('../../errors/errors');

const query = `

`;

module.exports = async ({ id }, { id: userId }) => {
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
        throw BadRequestError('Bad Request: Not Member');
    }
    return await models.sequelize
        .query(query, {
            replacements: {
                id,
            },
        })
        .spread(
            (result) => {
                if (result[0]) {
                    const group = JSON.parse(JSON.stringify(result[0]));
                    return group;
                } else {
                    throw NotFoundError('Group Not Exist');
                }
            },
            () => ConflictError('Database error'),
        );
};
