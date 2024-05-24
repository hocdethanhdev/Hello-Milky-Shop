const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Brand', {
    BrandID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    BrandName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  }, {
    timestamps: false,
    tableName: 'Brand',
  });
};
