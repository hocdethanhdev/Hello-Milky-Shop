const cityDAO = require("../dao/cityDAO");

const cityRepository = {
    getAllCities: async () => {
        return await cityDAO.findAllCities();
      },
    
}

module.exports = cityRepository;