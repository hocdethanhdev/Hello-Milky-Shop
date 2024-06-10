const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const District = require("../bo/district");

const districtDAO = {
    findDistrictByID: (ID) => {
      return new Promise((resolve, reject) => {
        mssql.connect(dbConfig, function (err, result) {
          const request = new mssql.Request().input("ID", ID);
          request.query(
            `SELECT d.ID AS DistrictID, d.DistrictName
           FROM District d
           WHERE d.CityID = @ID
          
            ;`,
            (err, res) => {
              if (err) reject(err);
  
              resolve(res.recordset);
            }
          );
        });
      });
    },
}
module.exports = districtDAO;