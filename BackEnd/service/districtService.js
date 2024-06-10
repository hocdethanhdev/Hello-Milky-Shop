const districtRepository = require("../repository/districtRepository");

const districtService = {

    getDistrictByID : async (ID) => {
        return await districtRepository.getDistrictByID(ID);
      },

}
module.exports = districtService;