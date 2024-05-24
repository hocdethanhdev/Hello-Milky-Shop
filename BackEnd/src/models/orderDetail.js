const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "OrderDetail",
    {
      OrderDetailID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      OrderID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Order",
          key: "OrderID",
        },
      },
      ProductID: {
        type: DataTypes.STRING(6),
        allowNull: true,
        references: {
          model: "Product",
          key: "ProductID",
        },
      },
    },
    {
      timestamps: false,
      tableName: "OrderDetail",
    }
  );
};
