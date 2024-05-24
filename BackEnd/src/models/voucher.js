const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Voucher', {
    VoucherID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    DiscountPercentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    MaxDiscount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    MinDiscount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ExpiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    VoucherName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'Voucher',
  });
};
