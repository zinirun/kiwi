/**
 * 그룹 Create
 * @author 이건욱
 * @param {title}
 * type Group {
        id: ID!
        departmentId: ID!
        title: String!
        masterId: ID!
    }
* createGroup(title: String!): GroupAfterCreate
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({ title }, { id: masterId, departmentId }) => {
    return await models.groups
        .create({
            title,
            masterId,
            departmentId,
        })
        .then((result) => {
            const data = result.get({ plain: true });
            return {
                ...data,
            };
        })
        .catch(() => {
            throw ConflictError('Update error occured');
        });
};
