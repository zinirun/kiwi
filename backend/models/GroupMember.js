const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const GroupMember = sequelize.define(
        'group_member',
        {
            groupId: { type: DataTypes.INTEGER, allowNull: false },
            memberId: { type: DataTypes.INTEGER, allowNull: false },
            isDeleted: { type: DataTypes.TINYINT, defaultValue: 0 },
        },
        {
            freezeTableName: true,
            tableName: 'group_member',
        },
    );

    GroupMember.prototype.dateFormat = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

    GroupMember.associate = (models) => {
        GroupMember.belongsTo(models.groups, {
            foreignKey: 'groupId',
        });
        GroupMember.belongsTo(models.user, {
            foreignKey: 'memberId',
        });
    };

    return GroupMember;
};
