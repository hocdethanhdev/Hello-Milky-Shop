const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Report', {
    ReportID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Description: {
      type: DataTypes.STRING(3000),
      allowNull: true,
    },
    ReportDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    Status: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    UserID: {
      type: DataTypes.STRING(8),
      allowNull: true,
      references: {
        model: 'User',
        key: 'UserID',
      },
    },
  }, {
    timestamps: false,
    tableName: 'Report',
  });
};
