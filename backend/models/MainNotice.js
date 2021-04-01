const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const MainNotice = sequelize.define(
        'main_notice',
        {
            type: { type: DataTypes.STRING(15), allowNull: false },
            content: { type: DataTypes.STRING(200), allowNull: true },
            isDeleted: { type: DataTypes.TINYINT, defaultValue: 0 },
        },
        {
            freezeTableName: true,
            tableName: 'main_notice',
        },
    );

    MainNotice.prototype.dateFormat = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

    return MainNotice;
};
