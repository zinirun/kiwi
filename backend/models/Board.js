const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const Board = sequelize.define(
        'board',
        {
            boardName: { type: DataTypes.STRING(15), allowNull: false, unique: true },
            link: { type: DataTypes.STRING(15), allowNull: false, unique: true },
            icon: { type: DataTypes.STRING(25), allowNull: false },
            isSpecial: { type: DataTypes.TINYINT, defaultValue: 0 },
        },
        {
            freezeTableName: true,
            tableName: 'board',
        },
    );

    Board.prototype.dateFormat = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

    Board.associate = (models) => {
        Board.hasMany(models.post, {
            foreignKey: 'boardId',
        });
        Board.hasMany(models.category, {
            foreignKey: 'boardId',
        });
    };

    return Board;
};
