const districtDAO = require("../dao/districtDAO");



const districtRepository = {
  getDistrictByID: async (ID) => {
    return await districtDAO.findDistrictByID(ID);
  },
}
module.exports = districtRepository;