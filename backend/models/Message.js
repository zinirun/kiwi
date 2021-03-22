const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const Message = sequelize.define(
        'message',
        {
            messageTo: { type: DataTypes.INTEGER, allowNull: false },
            messageFrom: { type: DataTypes.INTEGER, allowNull: false },
            content: { type: DataTypes.TEXT('long'), allowNull: false },
        },
        {
            freezeTableName: true,
            tableName: 'message',
        },
    );

    Message.prototype.dateFormat = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

    Message.associate = (models) => {
        Message.belongsTo(models.user, {
            foreignKey: 'messageTo',
        });
        Message.belongsTo(models.user, {
            foreignKey: 'messageFrom',
        });
    };

    return Message;
};
