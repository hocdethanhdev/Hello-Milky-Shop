const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const Promotion = require("../bo/promotion");

const promotionDAO = {
  getPromotionByDate: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request();
        request.query(`
                    SELECT * FROM Promotion 
                    WHERE StartDate <= GETDATE() AND EndDate >= GETDATE()
                    ;`,
          (err, res) => {
            if (err) reject(err);

            resolve(res.recordset);
          }
        );
      });
    });
  },

  getAllPromotions: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request();
        request.query(`SELECT * FROM Promotion;`, (err, res) => {
          if (err) reject(err);

          resolve(res.recordset);
        });
      });
    });
  },

  addPromotion: (promotionObject) => {
    const promotion = new Promotion(
      null,
      promotionObject.promotionName,
      promotionObject.description,
      promotionObject.discountPercentage,
      promotionObject.image,
      promotionObject.startDate,
      promotionObject.endDate
    );

    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();

        // Kiểm tra ngày bắt đầu và ngày kết thúc
        if (new Date(promotion.startDate) > new Date(promotion.endDate)) {
          return reject({
            status: 400,
            message: "Start date cannot be later than expiry date",
          });
        }

        request
          .input("promotionName", mssql.NVarChar, promotion.promotionName)
          .input("description", mssql.NVarChar, promotion.description)
          .input("discountPercentage", mssql.Float, promotion.discountPercentage)
          .input("image", mssql.VarChar, promotion.image)
          .input("startDate", mssql.DateTime, promotion.startDate)
          .input("endDate", mssql.DateTime, promotion.endDate);

        const insertQuery = `
                    INSERT INTO Promotion (PromotionName, Description, DiscountPercentage, Image, StartDate, EndDate)
                    OUTPUT INSERTED.*
                    VALUES (@promotionName, @description, @discountPercentage, @image, @startDate, @endDate)
                `;

        request.query(insertQuery, (err, res) => {
          if (err) return reject(err);
          resolve(res.recordset[0]);
        });
      });
    });
  },

  updatePromotion: (promotionID, promotionObject) => {

    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        // Kiểm tra ngày bắt đầu và ngày kết thúc
        if (new Date(promotionObject.startDate) > new Date(promotionObject.endDate)) {
          return reject({
            status: 400,
            message: "Start date cannot be later than end date",
          });
        }

        request
          .input("promotionID", promotionID)
          .input("promotionName", mssql.NVarChar, promotionObject.promotionName)
          .input("description", mssql.NVarChar, promotionObject.description)
          .input("discountPercentage", mssql.Float, promotionObject.discountPercentage)
          .input("image", mssql.VarChar, promotionObject.image)
          .input("startDate", mssql.DateTime, promotionObject.startDate)
          .input("endDate", mssql.DateTime, promotionObject.endDate);

        const updateQuery = `
                    UPDATE Promotion
                    SET 
                        PromotionName = @promotionName,
                        Description = @description,
                        DiscountPercentage = @discountPercentage,
                        Image = @image,
                        StartDate = @startDate,
                        EndDate = @endDate
                    WHERE PromotionID = @promotionID
                `;

        request.query(updateQuery, (err, res) => {
          if (err) return reject(err);
          resolve(res);
        });
      });
    });
  },

  searchPromotionByName: (promotionName) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request.input("promotionName", mssql.VarChar, `%${promotionName}%`);

        const searchQuery = `
                    SELECT * FROM Promotion WHERE PromotionName LIKE @promotionName
                `;

        request.query(searchQuery, (err, res) => {
          if (err) return reject(err);
          resolve(res.recordset);

          const promotion = res.recordset;
          if (!promotion[0])
            resolve({
              err: "Not found the promotion!",
            });
        });
      });
    });
  },

  getProductsApplyAnPromotion: (promotionID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request.input("promotionID", promotionID);

        const productsInPromotionQuery = `
          SELECT ProductID
          FROM ProductPromotionList
          WHERE PromotionID = @promotionID;
        `;

        request.query(productsInPromotionQuery, (err, result) => {
          if (err) return reject(err);

          // Map through the recordset to extract ProductID values into an array
          const productIDs = result.recordset.map(row => row.ProductID);

          resolve(productIDs); // Resolve with the array of ProductIDs
        });
      });
    });
  },

  deleteProductPromotionsByPromotionID: (promotionID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request.input("promotionID", mssql.Int, promotionID);

        const deleteQuery = `DELETE FROM ProductPromotionList WHERE PromotionID = @promotionID`;

        request.query(deleteQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  insertProductPromotions: (productIDs, promotionID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        const table = new mssql.Table('ProductPromotionList');
        table.columns.add('ProductID', mssql.VarChar, { nullable: false });
        table.columns.add('PromotionID', mssql.Int, { nullable: false });

        productIDs.forEach(productID => {
          table.rows.add(productID, promotionID);
        });

        request.bulk(table, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },
  updateProductPriceAfterDiscount: (productID, promotionID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request
          .input("productID", mssql.VarChar, productID)
          .input("promotionID", mssql.Int, promotionID);

        const updateQuery = `
          UPDATE ProductPromotionList
          SET PriceAfterDiscount = (
            SELECT p.Price * (1 - promo.DiscountPercentage / 100)
            FROM Product p, Promotion promo
            WHERE p.ProductID = @productID AND promo.PromotionID = @promotionID
          )
          WHERE ProductID = @productID AND PromotionID = @promotionID;
        `;

        request.query(updateQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  getCurrentProductsHavingPromotion: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        const currentDate = new Date();

        const searchQuery = `
          SELECT 
              p.ProductID, p.ProductName, p.Description, p.ExpirationDate, p.Image, p.ManufacturingDate, 
              p.Price, p.Status, p.StockQuantity, b.BrandName,
              COALESCE(
              MIN(
              CASE 
                WHEN promo.StartDate <= @currentDate AND promo.EndDate >= @currentDate
                THEN ppl.PriceAfterDiscount 
                ELSE NULL 
              END
        ), 
              p.Price
        ) AS PriceAfterDiscounts
        FROM 
        Product p
        JOIN Brand b ON b.BrandID = p.BrandID 
        JOIN ProductCategory pc ON pc.ProductCategoryID = p.ProductCategoryID
        JOIN ProductPromotionList ppl ON p.ProductID = ppl.ProductID
        JOIN Promotion promo ON ppl.PromotionID = promo.PromotionID
        WHERE p.Status = 1 AND p.StockQuantity > 0 AND promo.Status = 1
        GROUP BY 
        p.ProductID, p.ProductName, p.Price, p.Description, p.StockQuantity, p.Image, 
        p.ExpirationDate, p.ManufacturingDate, p.Status, p.BrandID, p.ProductCategoryID, b.BrandName
        `;

        request.input("currentDate", mssql.DateTime, currentDate);

        request.query(searchQuery, (err, res) => {
          if (err) return reject(err);
          resolve({
            productsWithPromotion: res.recordsets[0],
            productsWithoutPromotion: res.recordsets[1],
          });
        });
      });
    });
  },
  deletePromotion: (param_id) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        var request = new mssql.Request()
          .input("PromotionID", param_id);

        // First, check if the promotion can be deleted
        request.query(
          `SELECT StartDate, EndDate FROM Promotion WHERE PromotionID = @PromotionID`,
          (err, result) => {
            if (err) reject(err);

            const { StartDate, EndDate } = result.recordset[0];
            const now = new Date();

            if (now < StartDate || now > EndDate) {
              // Proceed with delete
              request.query(
                `UPDATE Promotion
                             SET Status = 0
                             WHERE PromotionID = @PromotionID`,
                (err) => {
                  if (err) reject(err);
                  resolve({
                    success: true,
                    message: "Delete successfully"
                  });
                }
              );
            } else {
              // Cannot delete promotion if it's ongoing
              reject({
                success: false,
                code: "PROMOTION_ONGOING",
                message: "Cannot delete ongoing promotion"
              });
            }
          }
        );
      });
    });
  },

  openPromotion: (PromotionID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) {
          reject(err);
          return;
        }

        var request = new mssql.Request().input("promotionID", PromotionID);
        request.query(
          `UPDATE Promotion
           SET Status = 1
           WHERE PromotionID = @promotionID;`,
          (err) => {
            if (err) reject(err);
            resolve({
              message: "Open successfully",
            });
          }
        );
      });
    });
  },

  updatePromotionStatusAuto: (oldStatus, newStatus) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request
          .input("oldStatus", mssql.Int, oldStatus)
          .input("newStatus", mssql.Int, newStatus);

        const updateQuery = `
                    UPDATE Promotion
                    SET Status = @newStatus
                    WHERE endDate < GETDATE() AND status = @oldStatus;
                `;
        request.query(updateQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

};

module.exports = promotionDAO;
