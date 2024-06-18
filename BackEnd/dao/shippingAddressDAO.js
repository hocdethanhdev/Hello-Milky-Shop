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

}
module.exports = shippingAddressDAO;