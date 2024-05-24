const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('ProductCategory', {
    ProductCategoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    ProductCategoryName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  }, {
    timestamps: false,
    tableName: 'ProductCategory',
  });
};
