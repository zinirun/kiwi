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
        User.belongsTo(models.company, {
            foreignKey: 'companyId',
        });
        User.hasOne(models.department, {
            foreignKey: 'presidentId',
            constraints: false,
        });
        User.hasOne(models.department, {
            foreignKey: 'vicePresidentId',
            constraints: false,
        });
        User.hasMany(models.post, {
            foreignKey: 'authorId',
        });
        User.hasMany(models.post_like, {
            foreignKey: 'userId',
        });
        User.hasMany(models.comment_like, {
            foreignKey: 'userId',
        });
    };
    return User;
};
