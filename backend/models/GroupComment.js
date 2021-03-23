const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const GroupComment = sequelize.define(
        'group_comment',
        {
            groupId: { type: DataTypes.INTEGER, allowNull: false },
            authorId: { type: DataTypes.INTEGER, allowNull: false },
            content: { type: DataTypes.TEXT('long'), allowNull: false },
            isDeleted: { type: DataTypes.TINYINT, defaultValue: 0 },
        },
        {
            freezeTableName: true,
            tableName: 'group_comment',
        },
    );

    GroupComment.prototype.dateFormat = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

    GroupComment.associate = (models) => {
        GroupComment.belongsTo(models.groups, {
            foreignKey: 'groupId',
        });
        GroupComment.belongsTo(models.user, {
            foreignKey: 'authorId',
        });
    };

    return GroupComment;
};
