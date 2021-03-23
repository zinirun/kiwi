const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const Groups = sequelize.define(
        'groups',
        {
            departmentId: { type: DataTypes.INTEGER, allowNull: false },
            masterId: { type: DataTypes.INTEGER, allowNull: false },
            title: { type: DataTypes.STRING(25), allowNull: false },
            isDeleted: { type: DataTypes.TINYINT, defaultValue: 0 },
        },
        {
            freezeTableName: true,
            tableName: 'groups',
        },
    );

    Groups.prototype.dateFormat = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

    Groups.associate = (models) => {
        Groups.hasMany(models.group_member, {
            foreignKey: 'groupId',
        });
        Groups.belongsTo(models.user, {
            foreignKey: 'masterId',
        });
        Groups.belongsTo(models.department, {
            foreignKey: 'departmentId',
        });
    };

    return Groups;
};
