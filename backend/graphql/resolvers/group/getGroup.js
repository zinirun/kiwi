/**
 * 그룹 정보 가져오기
 * @author zini (query made by 이건욱)
 * @param {id}
 * @returns {Group}
 * type Group {
        id: ID!
        departmentId: ID!
        title: String!
        userId: ID!
        masterId: ID!
        masterName: String!
        masterGradeName: String!
        createdAt: Date
        members: [GroupMember]
    }
    type GroupMember {
        memberId: ID!
        memberName: String!
        memberGradeName: String!
    }
* getGroup(id: ID!): Group
 */

const models = require('../../../models');
const { ConflictError, NotFoundError } = require('../../errors/errors');

const query = `
                select gp.id,
                    gp.departmentId,
                    gp.title,
                    gp.masterId,
                    gp.createdAt,
                    mas_u.userName as masterName,
                    mas_g.gradeName as masterGradeName,
                    gm.memberId,
                    mem_u.userName as memberName,
                    mem_g.gradeName as memberGradeName
                from user mas_u
                    left join (select * from \`groups\` where isDeleted = 0) as gp on mas_u.id = gp.masterId
                    left join (select * from group_member where isDeleted = 0) as gm on gm.groupId = gp.id
                    left join user mem_u on gm.memberId = mem_u.id
                    left join grade mem_g on mem_u.studentGradeId = mem_g.id
                    left join grade mas_g on mas_g.id = mas_u.studentGradeId
                where gp.id = :id;
                `;

module.exports = async ({ id }, { id: userId }) => {
    const isMember =
        (await models.groups.findOne({
            attributes: ['id', 'masterId'],
            where: { masterId: userId, id },
            raw: true,
        })) ||
        (await models.group_member.findOne({
            attributes: ['memberId', 'groupId'],
            where: { memberId: userId, groupId: id },
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
                    const members = JSON.parse(JSON.stringify(result));
                    const group = {
                        id: members[0].id,
                        userId,
                        createdAt: members[0].createdAt,
                        departmentId: members[0].departmentId,
                        title: members[0].title,
                        masterId: members[0].masterId,
                        masterName: members[0].masterName,
                        masterGradeName: members[0].masterGradeName,
                        members: [],
                    };
                    members.forEach((member) => {
                        if (member.memberId)
                            group.members.push({
                                memberId: member.memberId,
                                memberName: member.memberName,
                                memberGradeName: member.memberGradeName,
                            });
                    });
                    return group;
                } else {
                    throw NotFoundError('Group Not Exist');
                }
            },
            () => ConflictError('Database error'),
        );
};
