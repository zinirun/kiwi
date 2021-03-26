const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const Report = sequelize.define(
        'report',
        {
            userId: { type: DataTypes.INTEGER, allowNull: false },
            content: { type: DataTypes.TEXT('long'), allowNull: false },
            isCompleted: { type: DataTypes.TINYINT, defaultValue: 0 },
        },
        {
            freezeTableName: true,
            tableName: 'report',
        },
    );

    Report.prototype.dateFormat = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

    Report.associate = (models) => {
        Report.belongsTo(models.user, {
            foreignKey: 'userId',
        });
    };

    return Report;
};
