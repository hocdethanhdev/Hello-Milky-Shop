const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Promotion', {
    PromotionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    DiscountPercentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    StartedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    EndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'Promotion',
  });
};