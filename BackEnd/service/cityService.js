const cityRepository = require("../repository/cityRepository");
const cityService = {
getAllCities: async () => {
    return await cityRepository.getAllCities();
  },
}

module.exports = cityService;