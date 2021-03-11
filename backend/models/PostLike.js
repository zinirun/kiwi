const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const PostLike = sequelize.define(
        'post_like',
        {
            userId: { type: DataTypes.INTEGER, allowNull: false },
            postId: { type: DataTypes.INTEGER, allowNull: false },
            isDeleted: { type: DataTypes.TINYINT, defaultValue: 0 },
        },
        {
            freezeTableName: true,
            tableName: 'post_like',
        },
    );

    PostLike.prototype.dateFormat = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

    PostLike.associate = (models) => {
        PostLike.belongsTo(models.user, {
            foreignKey: 'userId',
        });
        PostLike.belongsTo(models.post, {
            foreignKey: 'postId',
        });
    };

    return PostLike;
};
