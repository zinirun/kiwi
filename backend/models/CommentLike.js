const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const CommentLike = sequelize.define(
        'comment_like',
        {
            userId: { type: DataTypes.INTEGER, allowNull: false },
            commentId: { type: DataTypes.INTEGER, allowNull: true },
        },
        {
            freezeTableName: true,
            tableName: 'comment_like',
        },
    );

    CommentLike.prototype.dateFormat = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

    CommentLike.associate = (models) => {
        CommentLike.belongsTo(models.user, {
            foreignKey: 'userId',
        });
        CommentLike.belongsTo(models.comment, {
            foreignKey: 'commentId',
        });
    };

    return CommentLike;
};
