const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const ShippingAddress = require("../bo/shippingAddress");

const shippingAddressDAO = {
  findInfoShippingByUserID: (ID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request().input("ID", ID);
        request.query(
          `SELECT *
          FROM ShippingAddress
          WHERE UserID = @ID
           
          `,
          (err, res) => {
            if (err) reject(err);

            resolve(res.recordset);
          }
        );
      });
    });
  },

  findInfoShippingByOrderID: (orderID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request().input("orderID", orderID);
        request.query(
          `SELECT Receiver, PhoneNumber, Address
          FROM ShippingAddress sa
          JOIN Orders o ON o.ShippingAddressID = sa.ShippingAddressID
          WHERE OrderID = @orderID
           
          `,
          (err, res) => {
            if (err) reject(err);

            resolve(res.recordset);
          }
        );
      });
    });
  },

  findShippingAddressIsDeleted: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) {
          reject(err);
          return;
        }

        const request = new mssql.Request();
        request.query(
          `SELECT sa.ShippingAddressID, sa.Receiver, sa.PhoneNumber, sa.Address, sa.UserID, 
                u.UserName, u.Email, u.Point, u.Password, u.Status, u.RoleID
         FROM ShippingAddress sa
         JOIN Users u ON u.UserID = sa.UserID
         WHERE sa.IsDeleted = 0
          `,
          (err, result) => {
            if (err) {
              reject(err);
            } else if (result && result.recordset) {
              resolve(result.recordset);
            } else {
              resolve([]);
            }
          }
        );
      });
    });
  },

  updateIsDeleted: (param_id) => {
    return new Promise((resolve, reject) => {
      const IsDeleted = 1;
      mssql.connect(dbConfig, function (err, result) {
        var request = new mssql.Request()
          .input("ShippingAddressID", param_id)
          .input("IsDeleted", IsDeleted);
        request.query(
          `UPDATE ShippingAddress SET IsDeleted = @IsDeleted WHERE ShippingAddressID = @ShippingAddressID;`,
          (err, res) => {
            if (err) reject(err);
            resolve({
              message: "Update IsDeleted Sucessfully !!!",
            });
          }
        );
      });
    });
  },



}
module.exports = shippingAddressDAO;