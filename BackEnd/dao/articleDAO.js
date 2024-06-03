const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const Article = require("../bo/article");

const articleDAO = {
  findArticlesByID: (ID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request().input("ID", ID);
        request.query(
          `SELECT *
          FROM Article
          WHERE AuthorID = @ID
           
          `,
          (err, res) => {
            if (err) reject(err);

            resolve(res.recordset);
          }
        );
      });
    });
  },

  findAllArticles: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function(err, result) {
        const request = new mssql.Request();
        request.query(
          `SELECT *
          FROM Article
          ;`,
          (err, res) => {
            if (err) reject (err);

            resolve(res.recordset);
          }
        );
      });
    });
  },

  findAllArticleCategory: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request();
        request.query(
          `SELECT ArticleCategoryName 
          FROM ArticleCategory 
          ;`,
          (err, res) => {
            if (err) reject(err);

            resolve(res.recordset);
          }
        );
      });
    });
  },

  createArticle: (articleObject) => {
    const ArticleID = '9';
    const article = new Article(ArticleID, articleObject.Title, articleObject.HeaderImage, articleObject.Content, articleObject.PublishDate, articleObject.AuthorID, articleObject.ArticleCategoryID);
    return new Promise((resolve, reject) => {
      
      mssql.connect(dbConfig, function (err, result) {
        var request = new mssql.Request()
          .input("ArticleID", ArticleID)
          .input("Title", mssql.NVarChar, article.Title)
          .input("HeaderImage", article.HeaderImage)
          .input("Content", mssql.NVarChar, article.Content)
          .input("PublishDate", mssql.Date, article.PublishDate)
          .input("AuthorID", mssql.VarChar, article.AuthorID)
          .input("ArticleCategoryName", mssql.NVarChar, article.ArticleCategoryName);
      
        request.query(
          `INSERT INTO Article (Title, HeaderImage, Content, PublishDate, AuthorID, ArticleCategoryID)
          VALUES (@Title, @HeaderImage, @Content, @PublishDate, @AuthorID, (SELECT ArticleCategoryID FROM ArticleCategory WHERE ArticleCategoryName = @ArticleCategoryName))
          ;`,
          (err, res) => {
            if (err) reject(err);
            resolve(res.recordset);
          }
        );
      });
    });
  },

  deleteArticle: (param_id) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        var request = new mssql.Request()
          .input("ArticleID", param_id);
        request.query(
          `DELETE FROM Article WHERE ArticleID = @ArticleID;`,
          (err, res) => {
            if (err) reject(err);
            resolve(res.recordset);
          }
        );
      });
    });
  },


updateArticle: (param_id, articleObject) => {
  return new Promise((resolve, reject) => {
    mssql.connect(dbConfig, function (err, result) {
      var request = new mssql.Request()
      .input("ArticleID", param_id)
      .input("Title", mssql.NVarChar, articleObject.Title)
      .input("HeaderImage", mssql.VarChar, articleObject.HeaderImage)
      .input("Content", mssql.NVarChar, articleObject.Content)
      .input("PublishDate", mssql.Date, articleObject.PublishDate)
      .input("AuthorID", mssql.VarChar, articleObject.AuthorID)
      .input("ArticleCategoryName", mssql.NVarChar, articleObject.ArticleCategoryName);
      request.query(
        `UPDATE Article SET Title =  @Title, HeaderImage = @HeaderImage, Content = @Content, PublishDate = @PublishDate, AuthorID = @AuthorID, ArticleCategoryID = (SELECT ArticleCategoryID FROM ArticleCategory WHERE ArticleCategoryName = @ArticleCategoryName) WHERE ArticleID = @ArticleID
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
}
module.exports = articleDAO;