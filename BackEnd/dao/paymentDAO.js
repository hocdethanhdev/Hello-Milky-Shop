const mssql = require("mssql");
const dbConfig = require("../config/db.config");

const paymenttDAO = {

  getPaymentInfoByOrderID: (OrderID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request()
          .input("OrderID", mssql.Int, OrderID);
        request.query(
          `SELECT * FROM Payment WHERE OrderID = @OrderID
        ;`,
          (err, res) => {
            if (err) reject(err);
            resolve({err: 0, data: res.recordset || null});
          }
        );
      });
    });
  },
  getOrderByID: (orderID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request()
          .input("OrderID", mssql.Int, orderID);
        request.query(
          `SELECT OrderID FROM Orders WHERE OrderID = @OrderID
        ;`,
          (err, res) => {
            if (err) reject(err);
            if (res.recordset.length > 0)
              resolve({ message: "true" });
            resolve({ message: "false" });
          }
        );
      });
    });
  },
  createPayment: (PayMethod, TradingCode, CardType, PayDetail, Amount, PayTime, OrderID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request()
          .input("PayMethod", mssql.VarChar, PayMethod)
          .input("TradingCode", mssql.VarChar, TradingCode)
          .input("CardType", mssql.VarChar, CardType)
          .input("PayDetail", mssql.VarChar, PayDetail)
          .input("Amount", mssql.Int, Amount)
          .input("PayTime", mssql.DateTime, PayTime)
          .input("OrderID", mssql.Int, OrderID);
        request.query(
          `INSERT INTO Payment(PayMethod, TradingCode, CardType, PayDetail, Amount, PayTime, OrderID) 
          values (@PayMethod, @TradingCode, @CardType, @PayDetail, @Amount, @PayTime, @OrderID)
        ;`,
          (err, res) => {
            if (err) reject(err);
            resolve({
              status: res?.rowsAffected[0] > 0 ? 0 : 1
            });
          }
        );
      });
    });
  },
};

module.exports = paymenttDAO;
