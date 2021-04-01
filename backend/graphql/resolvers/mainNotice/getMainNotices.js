/**
 * 모든 메인공지 추출
 */

const models = require('../../../models');

module.exports = async () => {
    return await models.main_notice.findAll({
        attributes: ['id', 'type', 'content'],
        raw: true,
        where: {
            isDeleted: 0,
        },
    });
};
