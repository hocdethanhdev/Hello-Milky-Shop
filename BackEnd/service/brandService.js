const brandRepository = require("../repository/brandRepository");

const brandService = {
    getAll: async () => {
        return await brandRepository.getAll();
    },
    addBrand: async (brandName) => {
        return await brandRepository.addBrand(brandName);
    },
};

module.exports = brandService;