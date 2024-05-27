const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const Product = require("../bo/product");

const productDAO = {
  findAllProducts: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request();
        request.query(
          `SELECT ProductID, ProductName, ProductCategoryName, Status 
          FROM Product p 
          JOIN ProductCategory pc ON p.ProductCategoryID = pc.ProductCategoryID
        ;`,
          (err, res) => {
            if (err) reject(err);

            resolve(res.recordset);
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
          JOIN Brand b ON p.BrandID = b.BrandID;`,
          (err, res) => {
            if (err) reject(err);

            resolve(res.recordset);
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

            resolve(res.recordset);
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

            resolve(res.recordset);
          }
        );
      });
    });
  },
  searchWithProductCategory: (name, pc) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request()
        .input("Name", mssql.NVarChar, `%${name}%`)
        .input("pc", mssql.NVarChar, pc);
        request.query(
          `SELECT ProductID, ProductName, ProductCategoryName, Status 
          FROM Product p 
          JOIN ProductCategory pc ON p.ProductCategoryID = pc.ProductCategoryID
          JOIN Brand b ON p.BrandID = b.BrandID
          WHERE ProductName LIKE @Name AND ProductCategoryName = @pc`,
          (err, res) => {
            if (err) reject(err);
            resolve(res.recordset);
          }
        );
      });
    });
  },
  searchWithPrice: (name, min, max) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request()
        .input("Name", mssql.NVarChar,`%${name}%`)
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
            resolve(res.recordset);
          }
        );
      });
    });
  },
  searchWithName: (name) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err, result) {
        const request = new mssql.Request()
        .input("Name", mssql.NVarChar,`%${name}%`);
        request.query(
          `SELECT ProductID, ProductName, ProductCategoryName, Status 
          FROM Product p 
          JOIN ProductCategory pc ON p.ProductCategoryID = pc.ProductCategoryID
          JOIN Brand b ON p.BrandID = b.BrandID
          WHERE ProductName LIKE @Name`,
          (err, res) => {
            if (err) reject(err);
            resolve(res.recordset);
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
          `SELECT ProductID, ProductName, Description, Price, StockQuantity,Image, ExpirationDate, ManufacturingDate, BrandName, ProductCategoryName, Status
        FROM Product p 
        JOIN ProductCategory pc ON p.ProductCategoryID = pc.ProductCategoryID 
        JOIN Brand b ON p.BrandID = b.BrandID`,
          (err, res) => {
            if (err) reject(err);
            resolve(res.recordset);
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
          .input("Description", mssql.NVarChar,productObject.Description)
          .input("Price",productObject.Price)
          .input("StockQuantity", productObject.StockQuantity)
          .input("Image", productObject.Image)
          .input("ExpirationDate", productObject.ExpirationDate)
          .input("ManufacturingDate", productObject.ManufacturingDate)
          .input("BrandName", mssql.NVarChar,productObject.BrandName)
          .input("ProductCategoryName", mssql.NVarChar, productObject.ProductCategoryName);
        request.query(
          `UPDATE Product SET ProductName = @ProductName, Description = @Description, Price = @Price , StockQuantity = @StockQuantity , Image = @Image , ExpirationDate = @ExpirationDate , ManufacturingDate = @ManufacturingDate, BrandID = (SELECT BrandID FROM Brand WHERE BrandName = @BrandName), ProductCategoryID = (SELECT ProductCategoryID FROM ProductCategory WHERE ProductCategoryName = @ProductCategoryName) WHERE ProductID = @ProductID;`,
          (err, res) => {
            if (err) reject(err);
            resolve(res.recordset);
          }
        );
      });
    });
  },
  createProduct: (productObject) => {
    const ProductID = 'P00001';
    const product = new Product(ProductID, productObject.ProductName, productObject.Description, productObject.Price, productObject.StockQuantity, productObject.Image, productObject.ExpirationDate, productObject.ManufacturingDate, productObject.BrandName, productObject.ProductCategoryName, productObject.Status);
    return new Promise((resolve, reject) => {
      
      mssql.connect(dbConfig, function (err, result) {
        var request = new mssql.Request()
          .input("ProductID", ProductID)
          .input("ProductName", mssql.NVarChar, product.ProductName)
          .input("Description", mssql.NVarChar, product.Description)
          .input("Price", product.Price)
          .input("StockQuantity", product.StockQuantity)
          .input("Image", product.Image)
          .input("ExpirationDate", product.ExpirationDate)
          .input("ManufacturingDate", product.ManufacturingDate)
          .input("BrandName", mssql.NVarChar, product.BrandName)
          .input("ProductCategoryName", mssql.NVarChar, product.ProductCategoryName)
          .input("Status", product.Status);
        request.query(
          `INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID, Status) VALUES
          (@ProductID, @ProductName, @Description, @Price, @StockQuantity, @Image, @ExpirationDate, @ManufacturingDate, (SELECT BrandID FROM Brand WHERE BrandName = @BrandName), (SELECT ProductCategoryID FROM ProductCategory WHERE ProductCategoryName = @ProductCategoryName), @Status);`,
          (err, res) => {
            if (err) reject(err);
            resolve(res.recordset);
          }
        );
      });
    });
  },
  deleteProduct: (param_id) => {
    return new Promise((resolve, reject) => {
      const Status = "Deleted";
      mssql.connect(dbConfig, function (err, result) {
        var request = new mssql.Request()
          .input("ProductID", param_id)
          .input("Status", Status);
        request.query(
          `UPDATE Product SET Status = @Status WHERE ProductID = @ProductID;`,
          (err, res) => {
            if (err) reject(err);
            resolve(res.recordset);
          }
        );
      });
    });
  },
};

module.exports = productDAO;
