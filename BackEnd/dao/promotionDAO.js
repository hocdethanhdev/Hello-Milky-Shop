const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const Promotion = require("../bo/promotion");

const promotionDAO = {
  getPromotionByDate: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
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
      mssql.connect(dbConfig, function (err, result) {
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
                    VALUES (@promotionName, @description, @discountPercentage, @image, @startDate, @endDate)
                `;

        request.query(insertQuery, (err, res) => {
          if (err) return reject(err);
          resolve(res);
        });
      });
    });
  },

  updatePromotion: (promotionID, promotionObject) => {
    const promotion = new Promotion(
      promotionID,
      promotionObject.promotionName,
      promotionObject.description,
      promotionObject.discountPercentage,
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
            message: "Start date cannot be later than end date",
          });
        }

        request
          .input("promotionID", promotionID)
          .input("promotionName", mssql.VarChar, promotion.promotionName)
          .input("description", mssql.VarChar, promotion.description)
          .input(
            "discountPercentage",
            mssql.Float,
            promotion.discountPercentage
          )
          .input("startDate", mssql.DateTime, promotion.startDate)
          .input("endDate", mssql.DateTime, promotion.endDate);

        const updateQuery = `
                    UPDATE Promotion
                    SET 
                        PromotionName = @promotionName,
                        Description = @description,
                        DiscountPercentage = @discountPercentage,
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
          SELECT p.ProductID, p.ProductName, p.Price, p.Description, p.StockQuantity, p.Image, 
          p.ExpirationDate, p.ManufacturingDate, p.Status, pc.ProductCategoryName, b.BrandName
          FROM Product p
          JOIN Brand b ON b.BrandID = p.BrandID 
          JOIN ProductCategory pc ON pc.ProductCategoryID = p.ProductCategoryID
          JOIN ProductPromotionList ppl ON p.ProductID = ppl.ProductID
          JOIN Promotion promo ON ppl.PromotionID = promo.PromotionID
          INNER JOIN ProductPromotionList pp ON p.ProductID = pp.ProductID
		      WHERE p.Status = 1 AND StockQuantity > 0 AND pp.PromotionID = @promotionID
        `;

        const otherProductsQuery = `
          SELECT p.ProductID, p.ProductName, p.Price, p.Description, p.StockQuantity, p.Image, 
          p.ExpirationDate, p.ManufacturingDate, p.Status, pc.ProductCategoryName, b.BrandName
          FROM Product p
          JOIN Brand b ON b.BrandID = p.BrandID 
          JOIN ProductCategory pc ON pc.ProductCategoryID = p.ProductCategoryID
		      WHERE p.ProductID NOT IN (
            SELECT ProductID 
            FROM ProductPromotionList 
            WHERE PromotionID = @promotionID
          ) AND p.Status = 1;
        `;

        request.query(productsInPromotionQuery, (err, res1) => {
          if (err) return reject(err);

          const productsInPromotion = res1.recordset;

          request.query(otherProductsQuery, (err, res2) => {
            if (err) return reject(err);

            const otherProducts = res2.recordset;

            resolve({
              productsInPromotion,
              otherProducts
            });
          });
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
        WHERE p.Status = 1 AND StockQuantity > 0 AND Status =1
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
  deletePromotions: (param_id) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        var request = new mssql.Request()
          .input("PromotionID", param_id);
        request.query(
          `DELETE FROM Promotion WHERE PromotionID = @PromotionID;`,
          (err, res) => {
            if (err) reject(err);
            resolve({
              message: "Delete successfully"
            });
          }
        );
      });
    });
  },
};

module.exports = promotionDAO;
