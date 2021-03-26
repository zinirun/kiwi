/**
 * type 9 확인 middleware
 * Admin 관련 resolver에서 제일 처음에 실행
 * @author zini
 * @param userId
 * @middleware
 * getUserById: User!
 */

const models = require('../../../models');
const { AuthorizationError } = require('../../errors/errors');

module.exports = async (id) => {
    const user = await models.user.findOne({
        attributes: ['id', 'type'],
        where: { id },
        raw: true,
    });
    if (user.type !== 9) {
        throw AuthorizationError();
    }
    return;
};
