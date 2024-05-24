const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('ProductPromotionList', {
    ProductPromotionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    ProductID: {
      type: DataTypes.STRING(6),
      allowNull: false,
      references: {
        model: 'Product',
        key: 'ProductID',
      },
    },
    PromotionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Promotion',
        key: 'PromotionID',
      },
    }
  }, {
    timestamps: false,
    tableName: 'ProductPromotionList',
  });
};
