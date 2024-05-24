const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Product', {
    ProductID: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true,
    },
    ProductName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Description: {
      type: DataTypes.STRING(3000),
      allowNull: true,
    },
    Price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    StockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ExpirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ManufacturingDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    BrandID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Brand',
        key: 'BrandID',
      },
    },
    ProductCategoryID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ProductCategory',
        key: 'ProductCategoryID',
      },
    },
  }, {
    timestamps: false,
    tableName: 'Product',
  });
};
