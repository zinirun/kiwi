const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const Department = sequelize.define(
        'department',
        {
            deptName: { type: DataTypes.STRING(20), allowNull: false, unique: true },
        },
        {
            freezeTableName: true,
            tableName: 'department',
        },
    );

    Department.prototype.dateFormat = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

    Department.associate = (models) => {
        Department.hasMany(models.user, {
            foreignKey: 'departmentId',
        });
    };
    return Department;
};
