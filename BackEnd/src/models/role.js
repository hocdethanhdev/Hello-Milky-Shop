const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Role', {
    RoleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    RoleName: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  }, {
    timestamps: false, // Không cần các trường createdAt và updatedAt
    tableName: 'Role', // Tên bảng trong cơ sở dữ liệu
  });
};
