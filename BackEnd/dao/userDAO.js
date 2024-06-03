const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const User = require("../bo/user");
const jwt = require("jsonwebtoken");



const userDAO = {
  findAllUsers: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request();
        request.query(`SELECT * FROM Users;`, (err, res) => {
          if (err) reject(err);

          resolve(res.recordset);
        });
      });
    });
  },

  deleteUser: (param_id) => {
    return new Promise((resolve, reject) => {
      const Status = "0";
      mssql.connect(dbConfig, function (err, result) {
        var request = new mssql.Request()
          .input("UserID", param_id)
          .input("Status",  Status);
        request.query(
          `UPDATE Users SET Status = @Status WHERE UserID = @UserID;`,
          (err, res) => {
            if (err) reject(err);
            resolve({
              message: "0"
            });
          }
        );
      });
    });
  },

  updateUser: (param_id, userObject) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        var request = new mssql.Request()
          .input("UserID", param_id)
          .input("Status", mssql.Bit, userObject.Status)
          .input("RoleID", mssql.Int, userObject.RoleID);
         
        request.query(
          `UPDATE Users SET  Status = @Status , RoleID = @RoleID  WHERE UserID = @UserID
          ;`,
          (err, res) => {
            if (err) reject(err);
            resolve({
              message: "Edit successfully"
            });
          }
        );
      });
    });
  },

   

  findUserByRole: (ID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request().input("ID", ID);
        request.query(
          `SELECT *
          FROM Users
          WHERE RoleID = @ID
           
          `,
          (err, res) => {
            if (err) reject(err);
            resolve(res);
          }
        );
      });
    });
  },
}

module.exports = userDAO;