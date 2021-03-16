/**
 * 유저 정보 Delete (status = 0)
 * @author 이건욱
 * @param (id: ID!)
 *
 * deleteUser(id: ID!): Boolean
 */

const models = require('../../../models');
const { ConflictError } = require('../../errors/errors');

module.exports = async ({}, { id }) => {
    return await models.post
        .update(
            {
                statue: 0,
            },
            { where: { id } },
        )
        .then(() => {
            return true;
        })
        .catch(() => {
            throw ConflictError('Delete(Update) error occured');
        });
};
