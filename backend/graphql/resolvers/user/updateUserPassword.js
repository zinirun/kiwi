/**
 * 유저 패스워드 변경
 * @author 허전진
 * @params {currentPassword, newPassword}
 * @returns {Boolean}
 */

const models = require('../../../models');
const { createHashedPassword, makePasswordHashed } = require('../../../controllers/user/user.ctrl');
module.exports = async ({ currentPassword, newPassword }, { userAccount, id }) => {
    const currentHashedPassword = await makePasswordHashed(userAccount, currentPassword);
    if (currentHashedPassword instanceof Error) {
        throw AuthorizationError('Hashing error');
    }
    const isValidUser = await models.user.findOne({
        attributes: ['id'],
        where: { id, password: currentHashedPassword },
        raw: true,
    });

    if (isValidUser) {
        const { password, salt } = await createHashedPassword(newPassword);
        return await models.user
            .update({ password, salt }, { where: { id } })
            .then(() => true)
            .catch(() => AuthorizationError('Update error'));
    } else {
        throw AuthorizationError('User not valid');
    }
};
