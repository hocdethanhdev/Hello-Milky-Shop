const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('User', {
    UserID: {
      type: DataTypes.STRING(8),
      allowNull: false,
      primaryKey: true,
    },
    UserName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    PhoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: true,
      unique: true,
    },
    Email: {
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: false,
    },
    Password: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    RoleID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 3,
      references: {
        model: 'Role',
        key: 'RoleID',
      },
    },
  }, {
    timestamps: false,
    tableName: 'Users',
  });
};
