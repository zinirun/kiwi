/**
 * 내가 만든 그룹 Read
 * @author 이건욱
 * @param
 * @returns {[Group]}
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
* getMyMasterGroups: [Group]
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({}, { id }) => {
    const query = `
                    select gp.id,
                        gp.departmentId,
                        gp.title,
                        gp.masterId,
                        mas_u.userName as masterName,
                        mas_g.gradeName as masterGradeName,
                        gm.id as memberId,
                        mem_u.userName as memberName,
                        mem_g.gradeName as memberGradeName
                    from user mas_u
                        left join \`groups\` gp on mas_u.id = gp.masterId
                        left join group_member gm on gm.groupId = gp.id
                        left join user mem_u on gm.memberId = mem_u.id
                        left join grade mem_g on mem_u.studentGradeId = mem_g.id
                        left join grade mas_g on mas_g.id = mas_u.studentGradeId
                    where mas_u.id = :id
                    and gp.isDeleted = 0;
                    `;
    return await models.sequelize
        .query(query, {
            replacements: {
                id,
            },
        })
        .spread(
            (result) => {
                const groups = [];
                const pureData = JSON.parse(JSON.stringify(result));
                pureData.forEach((member) => {
                    const arrayIndex = member.id - 1;
                    if (groups[arrayIndex] && member.memberId) {
                        groups[arrayIndex].members.push({
                            memberId: member.memberId,
                            memberName: member.memberName,
                            memberGradeName: member.memberGradeName,
                        });
                    } else {
                        if (member.memberId) {
                            groups[arrayIndex] = {
                                id: member.id,
                                departmentId: member.departmentId,
                                title: member.title,
                                masterId: member.masterId,
                                masterName: member.masterName,
                                masterGradeName: member.masterGradeName,
                                members: [
                                    {
                                        memberId: member.memberId,
                                        memberName: member.memberName,
                                        memberGradeName: member.memberGradeName,
                                    },
                                ],
                            };
                        } else {
                            groups[arrayIndex] = {
                                id: member.id,
                                departmentId: member.departmentId,
                                title: member.title,
                                masterId: member.masterId,
                                masterName: member.masterName,
                                masterGradeName: member.masterGradeName,
                                members: [],
                            };
                        }
                    }
                });
                return groups.filter((group) => group !== null);
            },
            () => ConflictError('Database error'),
        );
};
