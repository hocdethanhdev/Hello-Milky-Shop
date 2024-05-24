const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Article', {
    ArticleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    HeaderImage: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Content: {
      type: DataTypes.STRING(3000),
      allowNull: false,
    },
    PublishDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    AuthorID: {
      type: DataTypes.STRING(8),
      allowNull: true,
      references: {
        model: 'User',
        key: 'UserID',
      },
    },
    ArticleCategoryID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ArticleCategory',
        key: 'ArticleCategoryID',
      },
    },
  }, {
    timestamps: false,
    tableName: 'Article',
  });
};
