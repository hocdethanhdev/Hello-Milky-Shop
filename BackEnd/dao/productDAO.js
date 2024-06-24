const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const Product = require("../bo/product");

const productDAO = {

  getTop5ProductBestSeller: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request();
        request.query(
          `SELECT TOP 5 p.ProductID, ProductName, SUM(Quantity) AS SumSell
          FROM Product p
          JOIN OrderDetail od ON od.ProductID = p.ProductID
          JOIN Orders o ON o.OrderID = od.OrderID
          WHERE o.Status = 1 AND o.StatusOrderID = 4
          GROUP BY p.ProductID, p.ProductName
          ORDER BY SumSell DESC;`,
          (err, res) => {
            if (err) reject(err);
              resolve({
                err: res.recordset[0] !== null ? 0 : 1,
                data: res?.recordset
              });
          }
        );
      });
    });
  },

  countBrand: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request();
        request.query(
          `SELECT COUNT(BrandID) AS count FROM Brand;`,
          (err, res) => {
            if (err) reject(err);
              resolve({
                err: res.recordset[0] !== null ? 0 : 1,
                count: res?.recordset[0].count 
              });
          }
        );
      });
    });
  },
  countProduct: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request();
        request.query(
          `SELECT COUNT(ProductID) AS count FROM Product;`,
          (err, res) => {
            if (err) reject(err);
              resolve({
                err: res.recordset[0] !== null ? 0 : 1,
                count: res?.recordset[0].count 
              });
          }
        );
      });
    });
  },
  getTop6ProductByBrand: (id) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request().input("id", mssql.VarChar, id);
        request.query(
          `SELECT TOP 6 p.ProductID, ProductName, Price, p.Image, COALESCE(MIN(CASE 
                      WHEN pm.StartDate <= GETDATE() AND pm.EndDate >= GETDATE() 
                      THEN ppl.PriceAfterDiscount 
                      ELSE NULL 
                   END), p.Price) AS PriceAfterDiscounts
          FROM Product p
          JOIN Brand b ON p.BrandID = b.BrandID
          LEFT JOIN ProductPromotionList ppl ON p.ProductID = ppl.ProductID
		      LEFT JOIN Promotion pm ON pm.PromotionID = ppl.PromotionID
          WHERE BrandName = 
          (Select BrandName 
          FROM Product p 
          JOIN Brand b ON b.BrandID = p.BrandID WHERE ProductID = @id) 
          AND StockQuantity > 0 AND Status =1 AND p.ProductID != @id
          GROUP BY p.ProductID, p.ProductName, p.Image, p.Price;
`,
          (err, res) => {
            if (err) reject(err);
            const brand = res.recordset;
            if (!brand[0])
              resolve({
                err: 1,
                mes: "Empty",
              });
            resolve(brand);
          }
        );
      });
    });
  },

  getProductInforID: (id) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request().input("id", mssql.VarChar, id);
        request.query(
          `Select p.ProductID, ProductName, BrandName, StockQuantity, Price, COALESCE(MIN(CASE 
                      WHEN pm.StartDate <= GETDATE() AND pm.EndDate >= GETDATE() 
                      THEN ppl.PriceAfterDiscount 
                      ELSE NULL 
                   END), p.Price) AS PriceAfterDiscounts, p.Description, p.Image
          From Product p 
          JOIN Brand b ON p.BrandId = b.BrandID
          LEFT JOIN ProductPromotionList ppl ON p.ProductID = ppl.ProductID
          LEFT JOIN Promotion pm ON pm.PromotionID = ppl.PromotionID
          WHERE p.ProductID = @id
          GROUP BY p.ProductID, p.ProductName, p.Image, p.Price, b.BrandName, StockQuantity, p.Description;
        ;`,
          (err, res) => {
            if (err) reject(err);
            const brand = res.recordset;
            if (!brand[0])
              resolve({
                err: 1,
                mes: "Empty",
              });
            resolve(brand);
          }
        );
      });
    });
  },

  getAllBrandByCategory: (pc) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request().input("pc", mssql.Int, pc);
        request.query(
          `SELECT BrandName 
          FROM Brand b
          JOIN Product p ON b.BrandID = p.BrandID
          WHERE p.ProductCategoryID = @pc
          GROUP BY BrandName
        ;`,
          (err, res) => {
            if (err) reject(err);
            const brand = res.recordset;
            if (!brand[0])
              resolve({
                err: 1,
                mes: "Empty",
              });
            resolve(brand);
          }
        );
      });
    });
  },

  getProductByCategory: (pc) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request().input("pc", mssql.Int, pc);
        request.query(
          `SELECT p.ProductID, ProductName, p.Image, Price, BrandName, COALESCE(MIN(CASE 
                      WHEN pm.StartDate <= GETDATE() AND pm.EndDate >= GETDATE() 
                      THEN ppl.PriceAfterDiscount 
                      ELSE NULL 
                   END), p.Price) AS PriceAfterDiscounts
          From Product p
          JOIN Brand b ON b.BrandID = p.BrandID
          LEFT JOIN ProductPromotionList ppl ON p.ProductID = ppl.ProductID
          LEFT JOIN Promotion pm ON pm.PromotionID = ppl.PromotionID
          WHERE p.ProductCategoryID = @pc AND StockQuantity > 0 AND Status =1
          GROUP BY p.ProductID, p.ProductName, p.Image, p.Price, b.BrandName;
          `,
          (err, res) => {
            if (err) reject(err);
            const product = res.recordset;
            if (!product[0])
              resolve({
                err: "Do not have any product with this category",
              });
            resolve(product);
          }
        );
      });
    });
  },
  findAllProducts: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request();
        request.query(
          `SELECT ProductID, ProductName, ProductCategoryName, Status 
          FROM Product p 
          JOIN ProductCategory pc ON p.ProductCategoryID = pc.ProductCategoryID
          WHERE StockQuantity > 0 AND Status =1
        ;`,
          (err, res) => {
            if (err) reject(err);
            const product = res.recordset;
            if (!product[0])
              resolve({
                err: "Empty",
              });
            resolve(product);
          }
        );
      });
    });
  },
  getAllBrands: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request();
        request.query(
          `SELECT BrandName
          FROM Product p
          JOIN Brand b ON p.BrandID = b.BrandID
          WHERE StockQuantity > 0 AND Status =1
          GROUP BY BrandName;`,
          (err, res) => {
            if (err) reject(err);
            const brand = res.recordset;
            if (!brand[0])
              resolve({
                err: "Empty",
              });
            resolve(brand);
          }
        );
      });
    });
  },
  searchWithBrand: (name, brand) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request()
          .input("Name", mssql.NVarChar, `%${name}%`)
          .input("BrandName", brand);
        request.query(
          `SELECT ProductID, ProductName, ProductCategoryName, Status 
          FROM Product p 
          JOIN ProductCategory pc ON p.ProductCategoryID = pc.ProductCategoryID
          JOIN Brand b ON p.BrandID = b.BrandID
          WHERE ProductName LIKE @Name AND BrandName = @BrandName`,
          (err, res) => {
            if (err) reject(err);
            const product = res.recordset;
            if (!product[0])
              resolve({
                err: "Not found",
              });
            resolve(product);
          }
        );
      });
    });
  },
  getAllProductCategory: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request();
        request.query(
          `SELECT ProductCategoryName
          FROM ProductCategory;`,
          (err, res) => {
            if (err) reject(err);
            const category = res.recordset;
            if (!category[0])
              resolve({
                err: "Not found",
              });
            resolve(category);
          }
        );
      });
    });
  },
  searchWithProductCategory: ( pc) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request()
          .input("pc", mssql.NVarChar, `%${pc}%`);
        request.query(
          `SELECT p.ProductID, ProductName, p.Image, Price, BrandName, COALESCE(MIN(CASE 
                      WHEN pm.StartDate <= GETDATE() AND pm.EndDate >= GETDATE() 
                      THEN ppl.PriceAfterDiscount 
                      ELSE NULL 
                   END), p.Price) AS PriceAfterDiscounts, ProductCategoryName
          From Product p
          JOIN Brand b ON b.BrandID = p.BrandID
		  JOIN ProductCategory pcc ON pcc.ProductCategoryID = p.ProductCategoryID
          LEFT JOIN ProductPromotionList ppl ON p.ProductID = ppl.ProductID
          LEFT JOIN Promotion pm ON pm.PromotionID = ppl.PromotionID
          WHERE StockQuantity > 0 AND Status =1 AND ProductCategoryName LIKE @pc
          GROUP BY p.ProductID, p.ProductName, p.Image, p.Price, b.BrandName, pcc.ProductCategoryName;`,
          (err, res) => {
            if (err) reject(err);
            const product = res.recordset;
            if (!product[0])
              resolve({
                err: "Do not have any product with this category",
              });
            resolve(product);
          }
        );
      });
    });
  },
  searchWithPrice: (name, min, max) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request()
          .input("Name", mssql.NVarChar, `%${name}%`)
          .input("Min", mssql.Int, min)
          .input("Max", mssql.Int, max);
        request.query(
          `SELECT ProductID, ProductName, ProductCategoryName, Status 
          FROM Product p 
          JOIN ProductCategory pc ON p.ProductCategoryID = pc.ProductCategoryID
          JOIN Brand b ON p.BrandID = b.BrandID
          WHERE ProductName LIKE @Name AND Price >= @Min AND Price <= @Max`,
          (err, res) => {
            if (err) reject(err);
            const product = res.recordset;
            if (!product[0])
              resolve({
                err: "Don't have any product with this price",
              });
            resolve(product);
          }
        );
      });
    });
  },
  searchWithName: (name) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request().input(
          "Name",
          mssql.NVarChar,
          `%${name}%`
        );
        request.query(
          `SELECT p.ProductID, ProductName, p.Image, Price, BrandName, COALESCE(MIN(CASE 
                      WHEN pm.StartDate <= GETDATE() AND pm.EndDate >= GETDATE() 
                      THEN ppl.PriceAfterDiscount 
                      ELSE NULL 
                   END), p.Price) AS PriceAfterDiscounts
          From Product p
          JOIN Brand b ON b.BrandID = p.BrandID
          LEFT JOIN ProductPromotionList ppl ON p.ProductID = ppl.ProductID
          LEFT JOIN Promotion pm ON pm.PromotionID = ppl.PromotionID
          WHERE ProductName COLLATE SQL_Latin1_General_CP1_CI_AS LIKE @Name AND StockQuantity > 0 AND Status =1
          GROUP BY p.ProductID, p.ProductName, p.Image, p.Price, b.BrandName
          `,
          (err, res) => {
            if (err) reject(err);
            const product = res.recordset;
            if (!product[0])
              resolve({
                err: "Do not have any product with this names",
              });
            resolve(product);
          }
        );
      });
    });
  },
  findInfoProductsDetail: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request();
        request.query(
          `SELECT ProductID, ProductName, Description, Price, StockQuantity, p.Image, ExpirationDate, ManufacturingDate, BrandName, ProductCategoryName, Status
        FROM Product p 
        JOIN ProductCategory pc ON p.ProductCategoryID = pc.ProductCategoryID 
        JOIN Brand b ON p.BrandID = b.BrandID
        `,
          (err, res) => {
            if (err) reject(err);
            const product = res.recordset;
            if (!product[0])
              resolve({
                err: "Not found",
              });
            resolve(product);
          }
        );
      });
    });
  },
  getAllProductForUser: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request();
        request.query(
          `SELECT p.ProductID, ProductName, p.Description, Price, StockQuantity, p.Image, ExpirationDate, ManufacturingDate, BrandName, ProductCategoryName, p.Status, COALESCE(MIN(CASE 
                      WHEN pm.StartDate <= GETDATE() AND pm.EndDate >= GETDATE() 
                      THEN ppl.PriceAfterDiscount 
                      ELSE NULL 
                   END), p.Price) AS PriceAfterDiscounts
        FROM Product p 
        JOIN ProductCategory pc ON p.ProductCategoryID = pc.ProductCategoryID 
        JOIN Brand b ON p.BrandID = b.BrandID
        LEFT JOIN ProductPromotionList ppl ON p.ProductID = ppl.ProductID
        LEFT JOIN Promotion pm ON pm.PromotionID = ppl.PromotionID
        WHERE StockQuantity > 0 AND Status =1
        GROUP BY p.ProductID, p.ProductName, p.Image, p.Price, b.BrandName, p.Description, StockQuantity, ExpirationDate, ManufacturingDate, ProductCategoryName, p.Status
        `,
          (err, res) => {
            if (err) reject(err);
            const product = res.recordset;
            if (!product[0])
              resolve({
                err: "Not found",
              });
            resolve(product);
          }
        );
      });
    });
  },
  updateProduct: (param_id, productObject) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        var request = new mssql.Request()
          .input("ProductID", param_id)
          .input("ProductName", mssql.NVarChar, productObject.ProductName)
          .input("Description", mssql.NVarChar, productObject.Description)
          .input("Price", productObject.Price)
          .input("StockQuantity", productObject.StockQuantity)
          .input("Image", productObject.Image)
          .input("ExpirationDate", productObject.ExpirationDate)
          .input("ManufacturingDate", productObject.ManufacturingDate)
          .input("BrandName", mssql.NVarChar, productObject.BrandName)
          .input(
            "ProductCategoryName",
            mssql.NVarChar,
            productObject.ProductCategoryName
          )
          .input("Status", mssql.Bit, productObject.Status);
        request.query(
          `UPDATE Product SET ProductName = @ProductName, Description = @Description, Price = @Price , StockQuantity = @StockQuantity , Image = @Image , ExpirationDate = @ExpirationDate , ManufacturingDate = @ManufacturingDate, BrandID = (SELECT BrandID FROM Brand WHERE BrandName = @BrandName), ProductCategoryID = (SELECT ProductCategoryID FROM ProductCategory WHERE ProductCategoryName = @ProductCategoryName), Status = @Status WHERE ProductID = @ProductID;`,
          (err, res) => {
            if (err) reject(err);
            resolve({
              message: "Edit successfully",
            });
          }
        );
      });
    });
  },
  createProduct: (productObject) => {
    const ProductID = "P00001";
    const product = new Product(
      ProductID,
      productObject.ProductName,
      productObject.Description,
      productObject.Price,
      productObject.StockQuantity,
      productObject.Image,
      productObject.ExpirationDate,
      productObject.ManufacturingDate,
      productObject.BrandName,
      productObject.ProductCategoryName,
      productObject.Status
    );
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        var request = new mssql.Request()
          .input("ProductID", mssql.VarChar,ProductID)
          .input("ProductName", mssql.NVarChar, product.ProductName)
          .input("Description", mssql.NVarChar, product.Description)
          .input("Price", mssql.Int,product.Price)
          .input("StockQuantity", mssql.Int,product.StockQuantity)
          .input("Image", mssql.NVarChar,product.Image)
          .input("ExpirationDate", product.ExpirationDate)
          .input("ManufacturingDate", product.ManufacturingDate)
          .input("BrandName", mssql.NVarChar, product.BrandName)
          .input(
            "ProductCategoryName",
            mssql.NVarChar,
            product.ProductCategoryName
          )
          .input("Status", product.Status);
        request.query(
          `Select ProductID FROM Product WHERE ProductName = @ProductName`,
          (err, res) => {
            if (err) reject(err);
            if (res.recordset[0]) {
              resolve({
                message: "This product already exists",
              });
            } else {
              request.query(
                `INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID, Status) VALUES
                (@ProductID, @ProductName, @Description, @Price, @StockQuantity, @Image, @ExpirationDate, @ManufacturingDate, (SELECT TOP 1 BrandID FROM Brand WHERE BrandName = @BrandName), (SELECT TOP 1 ProductCategoryID FROM ProductCategory WHERE ProductCategoryName = @ProductCategoryName), @Status);`,
                (err, res) => {
                  if (err) reject(err);
                  resolve({
                    message: "Create successfully",
                  });
                }
              );
            }
          }
        );
      });
    });
  },
  deleteProduct: (param_id) => {
    return new Promise((resolve, reject) => {
      const Status = 0;
      mssql.connect(dbConfig, function (err, result) {
        var request = new mssql.Request()
          .input("ProductID", param_id)
          .input("Status", Status);
        request.query(
          `UPDATE Product SET Status = @Status WHERE ProductID = @ProductID;`,
          (err, res) => {
            if (err) reject(err);
            resolve({
              message: "Deleted",
            });
          }
        );
      });
    });
  },

  getProductInfoByID: (product_id) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request().input("ProductID", product_id);
        request.query(
          `SELECT p.ProductID, ProductName, Description, Price, PriceAfterDiscount, StockQuantity, p.Image, ExpirationDate, ManufacturingDate, BrandName, ProductCategoryName, Status
        FROM Product p 
        JOIN ProductCategory pc ON p.ProductCategoryID = pc.ProductCategoryID 
        JOIN Brand b ON p.BrandID = b.BrandID
        LEFT JOIN ProductPromotionList ppl ON p.ProductID = ppl.ProductID
        WHERE p.ProductID = @ProductID`,
          (err, res) => {
            if (err) {
              reject(err);
              return;
            }

            if (!res || !res.recordset || res.recordset.length === 0) {
              resolve({
                err: "Not found",
              });
              return;
            }

            resolve(res.recordset);
          }
        );
      });
    });
  },

  get5ProductsLowestFinalPrice: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request();
        request.query(
          `SELECT TOP 5 p.ProductID, p.ProductName, p.Price,
        COALESCE(MIN(CASE 
                      WHEN pm.StartDate <= GETDATE() AND pm.EndDate >= GETDATE() 
                      THEN ppl.PriceAfterDiscount 
                      ELSE NULL 
                   END), p.Price) AS PriceAfterDiscounts
    FROM Product p
        LEFT JOIN ProductPromotionList ppl ON p.ProductID = ppl.ProductID
        LEFT JOIN Promotion pm ON pm.PromotionID = ppl.PromotionID
        JOIN Brand b ON p.BrandID = b.BrandID
        JOIN ProductCategory pc ON p.ProductCategoryID = pc.ProductCategoryID
		GROUP BY p.ProductID, p.ProductName, p.Price
    ORDER BY
        PriceAfterDiscounts ASC;
      ;`,
          (err, res) => {
            if (err) {
              reject(err);
              return;
            }

            if (!res || !res.recordset || res.recordset.length === 0) {
              resolve({
                err: "Not found",
              });
              return;
            }

            resolve(res.recordset);
          }
        );
      });
    });
  },

  getTop6MilksForPregnantMother: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request();
        request.query(
          `SELECT TOP 6 p.ProductID, ProductName, Price, p.Image, COALESCE(MIN(CASE 
                      WHEN pm.StartDate <= GETDATE() AND pm.EndDate >= GETDATE() 
                      THEN ppl.PriceAfterDiscount 
                      ELSE NULL 
                   END), p.Price) AS PriceAfterDiscounts
          FROM Product p
          JOIN Brand b ON p.BrandID = b.BrandID
		    JOIN ProductCategory pc ON pc.ProductCategoryID = p.ProductCategoryID
          LEFT JOIN ProductPromotionList ppl ON p.ProductID = ppl.ProductID
		      LEFT JOIN Promotion pm ON pm.PromotionID = ppl.PromotionID
          WHERE pc.ProductCategoryID = 1
          AND StockQuantity > 0 AND Status =1
          GROUP BY p.ProductID, p.ProductName, p.Image, p.Price

      ;`,
          (err, res) => {
            if (err) {
              reject(err);
              return;
            }

            if (!res || !res.recordset || res.recordset.length === 0) {
              resolve({
                err: "Not found",
              });
              return;
            }

            resolve(res.recordset);
          }
        );
      });
    });
  },

  getTop6MilkForBaby: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request();
        request.query(
          `SELECT TOP 6 p.ProductID, ProductName, Price, p.Image, COALESCE(MIN(CASE 
                      WHEN pm.StartDate <= GETDATE() AND pm.EndDate >= GETDATE() 
                      THEN ppl.PriceAfterDiscount 
                      ELSE NULL 
                   END), p.Price) AS PriceAfterDiscounts
          FROM Product p
          JOIN Brand b ON p.BrandID = b.BrandID
		      JOIN ProductCategory pc ON pc.ProductCategoryID = p.ProductCategoryID
          LEFT JOIN ProductPromotionList ppl ON p.ProductID = ppl.ProductID
		      LEFT JOIN Promotion pm ON pm.PromotionID = ppl.PromotionID
          WHERE pc.ProductCategoryID = 2
          AND StockQuantity > 0 AND Status =1
          GROUP BY p.ProductID, p.ProductName, p.Image, p.Price
      ;`,
      (err, res) => {
        if (err) {
          reject(err);
          return;
        }

        if (!res || !res.recordset || res.recordset.length === 0) {
          resolve({
            err: "Not found",
          });
          return;
        }

        resolve(res.recordset);
      }
    );
  });
});
},
};

module.exports = productDAO;
