/**
 * 내가 속해있는 그룹 Read
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
* getMyGroups: [Group]
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({}, { id }) => {
    const getMyGroupsQuery = `
                            select gp.id,
                                gp.departmentId,
                                gp.title,
                                gp.masterId,
                                gp.createdAt,
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
    const getMemberGroupsQuery = `
                                select gp.id,
                                    gp.departmentId,
                                    gp.title,
                                    gp.masterId,
                                    gp.createdAt,
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
                                where gm.memberId = :id
                                and gp.isDeleted = 0;
                            `;
    const myGroups = [];
    return await models.sequelize
        .query(getMyGroupsQuery, {
            replacements: {
                id,
            },
        })
        .spread(
            async (result) => {
                const masterData = JSON.parse(JSON.stringify(result));
                await models.sequelize
                    .query(getMemberGroupsQuery, {
                        replacements: {
                            id,
                        },
                    })
                    .spread(
                        (result) => {
                            const memberData = JSON.parse(JSON.stringify(result));
                            masterData.concat(memberData).forEach((member) => {
                                const arrayIndex = member.id - 1;
                                if (myGroups[arrayIndex] && member.memberId) {
                                    myGroups[arrayIndex].members.push({
                                        memberId: member.memberId,
                                        memberName: member.memberName,
                                        memberGradeName: member.memberGradeName,
                                    });
                                } else {
                                    if (member.memberId) {
                                        myGroups[arrayIndex] = {
                                            id: member.id,
                                            departmentId: member.departmentId,
                                            userId: id,
                                            title: member.title,
                                            createdAt: member.createdAt,
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
                                        myGroups[arrayIndex] = {
                                            id: member.id,
                                            departmentId: member.departmentId,
                                            userId: id,
                                            title: member.title,
                                            createdAt: member.createdAt,
                                            masterId: member.masterId,
                                            masterName: member.masterName,
                                            masterGradeName: member.masterGradeName,
                                            members: [],
                                        };
                                    }
                                }
                            });
                        },
                        () => ConflictError('Database error'),
                    );
                return myGroups.filter((group) => group !== null);
            },
            () => ConflictError('Database error'),
        );
};
