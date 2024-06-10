const cityRepository = require("../repository/cityRepository");
const cityService = {
getAllCities: async (req, res) => {
    return await cityRepository.getAllCities();
  },
}

module.exports = cityService;