const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('VoucherOrder', {
    VoucherOrderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    VoucherID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Voucher',
        key: 'VoucherID',
      },
    },
    OrderID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Order',
        key: 'OrderID',
      },
    },
  }, {
    timestamps: false,
    tableName: 'VoucherOrder',
  });
};
