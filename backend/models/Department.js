const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const Department = sequelize.define(
        'department',
        {
            deptName: { type: DataTypes.STRING(20), allowNull: false, unique: true },
            presidentId: { type: DataTypes.INTEGER, allowNull: true },
            vicePresidentId: { type: DataTypes.INTEGER, allowNull: true },
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
        Department.belongsTo(models.user, {
            foreignKey: 'presidentId',
            constraints: false,
        });
        Department.belongsTo(models.user, {
            foreignKey: 'vicePresidentId',
            constraints: false,
        });
    };
    return Department;
};
