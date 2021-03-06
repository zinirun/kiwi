const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const File = sequelize.define(
        'file',
        {
            postId: { type: DataTypes.INTEGER, allowNull: false },
            fileName: { type: DataTypes.STRING(50), allowNull: false },
            fileType: { type: DataTypes.STRING(150), allowNull: false },
            key: { type: DataTypes.STRING(50), allowNull: false },
            fileUrl: { type: DataTypes.STRING(300), allowNull: false },
            isDeleted: { type: DataTypes.TINYINT, defaultValue: 0 },
        },
        {
            freezeTableName: true,
            tableName: 'file',
        },
    );

    File.prototype.dateFormat = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

    File.associate = (models) => {
        File.belongsTo(models.post, {
            foreignKey: 'postId',
        });
    };

    return File;
};
