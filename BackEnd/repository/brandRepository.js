const brandDAO = require("../dao/brandDAO");

const brandRepository = {
    addBrand: async (brandName) => {
        return await brandDAO.addBrand(brandName);
    },
}

module.exports = brandRepository;