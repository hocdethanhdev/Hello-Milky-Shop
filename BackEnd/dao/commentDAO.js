const mssql = require("mssql");
const dbConfig = require("../config/db.config");

const commentDAO = {
    getAllComments: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request();
        request.query(
          `SELECT CommentID, UserName, c.Description, CommentDate, c.ProductID, ProductName, Rep
          FROM Comment c
          JOIN Users u ON c.UserID = u.UserID 
          JOIN Product p ON c.ProductID = p.ProductID
        ;`,
          (err, res) => {
            if (err) reject(err);
            if (!res.recordset[0])
              resolve({
                err: "Empty",
              });
            resolve(res.recordset);
          }
        );
      });
    });
  },
  getUnansweredComments: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request();
        request.query(
          `SELECT CommentID, UserName, c.Description, CommentDate, c.ProductID, ProductName, Rep
          FROM Comment c
          JOIN Users u ON c.UserID = u.UserID 
          JOIN Product p ON c.ProductID = p.ProductID
          WHERE Rep is null
        ;`,
          (err, res) => {
            if (err) reject(err);
            if (!res.recordset[0])
              resolve({
                err: "Empty",
              });
            resolve(res.recordset);
          }
        );
      });
    });
  },
  repComment: (id, rep) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request()
        .input("CommentID", mssql.Int, id)
        .input("Rep", mssql.NVarChar, rep);
        request.query(
          `UPDATE Comment
          SET Rep = @Rep
          WHERE CommentID = @CommentID
        ;`,
          (err, res) => {
            if (err) reject(err);
            resolve({
                message: "Successfully"
            });
          }
        );
      });
    });
  },
}

module.exports = commentDAO;
