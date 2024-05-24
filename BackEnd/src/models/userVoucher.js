const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('UserVoucher', {
    UserVoucherID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    UserID: {
      type: DataTypes.STRING(8),
      allowNull: true,
      references: {
        model: 'User',
        key: 'UserID',
      },
    },
    VoucherID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Voucher',
        key: 'VoucherID',
      },
    },
  }, {
    timestamps: false,
    tableName: 'UserVoucher',
  });
};
