const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const AdminLog = sequelize.define(
        'admin_log',
        {
            userId: { type: DataTypes.INTEGER, allowNull: false },
            log: { type: DataTypes.STRING(200), allowNull: false },
        },
        {
            freezeTableName: true,
            tableName: 'admin_log',
        },
    );

    AdminLog.prototype.dateFormat = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

    AdminLog.associate = (models) => {
        AdminLog.belongsTo(models.user, {
            foreignKey: 'userId',
        });
    };

    return AdminLog;
};
