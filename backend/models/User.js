const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define(
        'user',
        {
            userAccount: { type: DataTypes.STRING(20), allowNull: false, unique: true },
            password: { type: DataTypes.STRING, allowNull: false },
            salt: { type: DataTypes.STRING, allowNull: false },
            userName: { type: DataTypes.STRING, allowNull: false },
            departmentId: { type: DataTypes.INTEGER, allowNull: false },
            studentNumber: { type: DataTypes.STRING(20), allowNull: false },
            studentGradeId: { type: DataTypes.INTEGER, allowNull: false },
            companyId: { type: DataTypes.INTEGER, allowNull: true },
            status: { type: DataTypes.TINYINT, defaultValue: 0 },
            type: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
        },
        {
            freezeTableName: true,
            tableName: 'user',
        },
    );

    User.prototype.dateFormat = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

    User.associate = (models) => {
        User.belongsTo(models.department, {
            foreignKey: 'departmentId',
        });
        User.belongsTo(models.grade, {
            foreignKey: 'studentGradeId',
        });
        User.hasMany(models.post, {
            foreignKey: 'authorId',
        });
        User.hasMany(models.comment, {
            foreignKey: 'authorId',
        });
        User.hasMany(models.post_like, {
            foreignKey: 'userId',
        });
        User.hasMany(models.comment_like, {
            foreignKey: 'userId',
        });
        User.hasMany(models.scrap, {
            foreignKey: 'userId',
        });
        User.hasMany(models.notification, {
            foreignKey: 'messageFromId',
        });
        User.hasMany(models.groups, {
            foreignKey: 'masterId',
        });
        User.hasMany(models.group_member, {
            foreignKey: 'memberId',
        });
        User.hasMany(models.group_comment, {
            foreignKey: 'authorId',
        });
    };
    return User;
};
