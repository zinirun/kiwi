const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const Scrap = sequelize.define(
        'scrap',
        {
            userId: { type: DataTypes.INTEGER, allowNull: false },
            postId: { type: DataTypes.INTEGER, allowNull: false },
            isDeleted: { type: DataTypes.TINYINT, defaultValue: 0 },
        },
        {
            freezeTableName: true,
            tableName: 'scrap',
        },
    );

    Scrap.prototype.dateFormat = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

    Scrap.associate = (models) => {
        Scrap.belongsTo(models.user, {
            foreignKey: 'userId',
        });
        Scrap.belongsTo(models.post, {
            foreignKey: 'postId',
        });
    };

    return Scrap;
};
