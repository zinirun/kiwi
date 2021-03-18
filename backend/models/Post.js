const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const Post = sequelize.define(
        'post',
        {
            departmentId: { type: DataTypes.INTEGER, allowNull: false },
            boardId: { type: DataTypes.INTEGER, allowNull: false },
            categoryId: { type: DataTypes.INTEGER, allowNull: true },
            authorId: { type: DataTypes.INTEGER, allowNull: false },
            title: { type: DataTypes.STRING(25), allowNull: false },
            content: { type: DataTypes.TEXT('long'), allowNull: false },
            isDeleted: { type: DataTypes.TINYINT, defaultValue: 0 },
        },
        {
            freezeTableName: true,
            tableName: 'post',
        },
    );

    Post.prototype.dateFormat = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

    Post.associate = (models) => {
        Post.belongsTo(models.department, {
            foreignKey: 'departmentId',
        });
        Post.belongsTo(models.user, {
            foreignKey: 'authorId',
        });
        Post.belongsTo(models.board, {
            foreignKey: 'boardId',
        });
        Post.belongsTo(models.category, {
            foreignKey: 'categoryId',
        });
        Post.hasMany(models.comment, {
            foreignKey: 'postId',
        });
        Post.hasMany(models.post_like, {
            foreignKey: 'postId',
        });
    };

    return Post;
};
