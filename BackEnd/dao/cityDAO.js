const mssql = require("mssql");
const dbConfig = require("../config/db.config");

const cityDAO = {

    findAllCities: () => {
        return new Promise((resolve, reject) => {
          mssql.connect(dbConfig, function() {
            const request = new mssql.Request();
            request.query(
              `SELECT *
              FROM City
              ;`,
              (err, res) => {
                if (err) reject (err);
    
                resolve(res.recordset);
              }
            );
          });
        });
      },

}
module.exports =cityDAO;