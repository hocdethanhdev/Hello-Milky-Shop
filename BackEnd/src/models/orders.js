const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Order', {
    OrderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    OrderDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    TotalAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING(15),
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
    PaymentID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Payment',
        key: 'PaymentID',
      },
    },
  }, {
    timestamps: false,
    tableName: 'Orders',
  });
};
