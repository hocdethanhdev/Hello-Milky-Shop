const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const Comment = require("../bo/comment");

const commentDAO = {

  getCommentByID: (CommentID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request().input(
          "CommentID",
          mssql.Int,
          CommentID
        );
        request.query(
          `SELECT CommentID, Description, Rating, CommentDate, Rep, RepDate, ProductID, u.UserName, s.UserName as StaffName
          FROM Comment c
          JOIN Users u ON u.UserID = c.UserID
          LEFT JOIN Users s ON s.UserID = c.StaffID
          WHERE CommentID = @CommentID;`,
          (err, res) => {
            if (err) reject(err);

            resolve({
              err: res?.recordset[0] ? 0 : 1,
              data: res.recordset[0] ?? []
            });
          }
        );
      });
    });
  },
  countRatingAndAvgRating: (ProductID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request().input(
          "ProductID",
          mssql.VarChar,
          ProductID
        );
        request.query(
          `SELECT 
          AVG(CAST(Rating AS FLOAT)) AS AverageRating,
          COUNT(*) AS RatingCount 
          FROM Comment
          WHERE ProductID = @ProductID;`,
          (err, res) => {
            if (err) reject(err);

            resolve({
              err: res?.recordset[0] ? 0 : 1,
              count: res?.recordset[0].RatingCount,
              avg: res?.recordset[0].AverageRating ?? 0
            });
          }
        );
      });
    });
  },
  getCommentByProductID: (ProductID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request().input(
          "ProductID",
          mssql.VarChar,
          ProductID
        );
        request.query(
          `SELECT CommentID, c.Description, Rating, CommentDate, Rep, RepDate, c.ProductID, u.UserName, s.UserName as StaffName
          FROM Comment c
          JOIN Users u ON u.UserID = c.UserID
          LEFT JOIN Users s ON s.UserID = c.StaffID          
          WHERE c.ProductID = @ProductID;`,
          (err, res) => {
            if (err) reject(err);

            resolve({
              err: res?.recordset[0] ? 0 : 1,
              data: res?.recordset,
            });
          }
        );
      });
    });
  },
  userComment: (UserID, ProductID, Rating, Description) => {
    const comment = new Comment(Description, Rating, ProductID, UserID);
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request()
          .input("UserID", mssql.VarChar, comment.UserID)
          .input("ProductID", mssql.VarChar, comment.ProductID)
          .input("Rating", mssql.Int, comment.Rating)
          .input("Description", mssql.NVarChar, comment.Description);
        request.query(
          `INSERT INTO Comment(UserID, ProductID, Rating, Description) values (@UserID, @ProductID, @Rating, @Description);`,
          (err, res) => {
            if (err) reject(err);

            resolve({
              err: res?.rowsAffected > 0 ? 0 : 1,
              message: res?.rowsAffected > 0 ? "success" : "error",
            });
          }
        );
      });
    });
  },
  checkUserOrdered: (UserID, ProductID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request()
          .input("UserID", mssql.VarChar, UserID)
          .input("ProductID", mssql.VarChar, ProductID);
        request.query(
          `SELECT (COUNT(DISTINCT o.OrderID) - (SELECT COUNT(CommentID) FROM Comment WHERE UserID = @UserID AND ProductID = @ProductID)) AS count
          FROM Orders o
          JOIN OrderDetail od ON o.OrderID = od.OrderID
          JOIN Users u ON o.UserID = u.UserID
          WHERE u.UserID = @UserID AND o.Status = 1 AND o.StatusOrderID = 4
          AND od.ProductID = @ProductID;
        ;`,
          (err, res) => {
            if (err) reject(err);

            resolve({
              err: res?.recordset[0] === null ? 1 : 0,
              count: res?.recordset[0].count,
            });
          }
        );
      });
    });
  },

  getAllComments: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request();
        request.query(
          `SELECT CommentID, c.Description, Rating, CommentDate, Rep, RepDate, c.ProductID, u.UserName, s.UserName as StaffName
          FROM Comment c
          JOIN Users u ON u.UserID = c.UserID
          LEFT JOIN Users s ON s.UserID = c.StaffID
          JOIN Product p ON p.ProductID = c.ProductID;`,
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
          `SELECT CommentID, c.Description, Rating, CommentDate, Rep, RepDate, c.ProductID, u.UserName, s.UserName as StaffName
          FROM Comment c
          JOIN Users u ON u.UserID = c.UserID
          LEFT JOIN Users s ON s.UserID = c.StaffID
          JOIN Product p ON p.ProductID = c.ProductID
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
  repComment: (id, rep, UserID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request()
          .input("CommentID", mssql.Int, id)
          .input("Rep", mssql.NVarChar, rep)
          .input("StaffID", mssql.VarChar, UserID);
        request.query(
          `UPDATE Comment
          SET Rep = @Rep, StaffID = @StaffID, RepDate = GETDATE()
          WHERE CommentID = @CommentID
        ;`,
          (err, res) => {
            if (err) reject(err);
            resolve({
              message: "Successfully",
            });
          }
        );
      });
    });
  },
};

module.exports = commentDAO;
