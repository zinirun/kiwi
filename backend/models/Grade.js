const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const Grade = sequelize.define(
        'grade',
        {
            gradeName: { type: DataTypes.STRING(20), allowNull: false, unique: true },
        },
        {
            freezeTableName: true,
            tableName: 'grade',
        },
    );

    Grade.prototype.dateFormat = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

    Grade.associate = (models) => {
        Grade.hasMany(models.user, {
            foreignKey: 'studentGradeId',
        });
    };
    return Grade;
};
