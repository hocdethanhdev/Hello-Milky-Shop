const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const Brand = require("../bo/brand");
const { resolve } = require("path");
const { rejects } = require("assert");

const brandDAO = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) {
                    return reject(err);
                }
                var request = new mssql.Request();

                request.query(`
                    SELECT BrandName FROM Brand;
                `,
                    (err, result) => {
                        if (err) return reject(err);
                        resolve(result.recordset);
                    }
                );
            });
        });
    },

    addBrand: (brandName) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) {
                    return reject(err);
                }
                var request = new mssql.Request()
                    .input("BrandName", mssql.VarChar, brandName);
                request.query(`
                    INSERT INTO Brand (BrandName)   
                    VALUES (@BrandName);
                `,
                    (err) => {
                        if (err) return reject(err);
                        resolve({
                            message: "Create successfully"
                        });
                    }
                );
            });
        });
    }
};

module.exports = brandDAO;

