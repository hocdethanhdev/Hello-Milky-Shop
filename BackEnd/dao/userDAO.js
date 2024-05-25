const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const User = require("../bo/user");

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
};

module.exports = userDAO;
