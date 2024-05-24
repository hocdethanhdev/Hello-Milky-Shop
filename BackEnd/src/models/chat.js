const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Chat', {
    ChatID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Message: {
      type: DataTypes.STRING(750),
      allowNull: true,
    },
    TimeStamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    MemberID: {
      type: DataTypes.STRING(8),
      allowNull: true,
      references: {
        model: 'User',
        key: 'UserID',
      },
    },
    StaffID: {
      type: DataTypes.STRING(8),
      allowNull: true,
      references: {
        model: 'User',
        key: 'UserID',
      },
    },
  }, {
    timestamps: false,
    tableName: 'Chat',
  });
};
