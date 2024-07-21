const brandRepository = require("../repository/brandRepository");

const brandService = {
    addBrand: async (brandName) => {
        return await brandRepository.addBrand(brandName);
    },
};

module.exports = brandService;