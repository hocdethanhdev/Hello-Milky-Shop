const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('ArticleCategory', {
    ArticleCategoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    ArticleCategoryName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  }, {
    timestamps: false,
    tableName: 'ArticleCategory',
  });
};
