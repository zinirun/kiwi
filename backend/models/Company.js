const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const Company = sequelize.define(
        'company',
        {
            companyName: { type: DataTypes.STRING(20), allowNull: false },
        },
        {
            freezeTableName: true,
            tableName: 'company',
        },
    );

    Company.prototype.dateFormat = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

    Company.associate = (models) => {
        Company.hasMany(models.user, {
            foreignKey: 'companyId',
        });
    };
    return Company;
};
