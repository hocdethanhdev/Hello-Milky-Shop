const brandDAO = require("../dao/brandDAO");

const brandRepository = {
    getAll: async () => {
        return await brandDAO.getAll();
    },
    addBrand: async (brandName) => {
        return await brandDAO.addBrand(brandName);
    },
}

module.exports = brandRepository;