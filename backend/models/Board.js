const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const Board = sequelize.define(
        'board',
        {
            boardName: { type: DataTypes.STRING(15), allowNull: false, unique: true },
            isAnonymous: { type: DataTypes.TINYINT, defaultValue: 0 },
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
    };

    return Board;
};
