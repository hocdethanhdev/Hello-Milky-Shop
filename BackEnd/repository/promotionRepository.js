const promotionDAO = require("../dao/promotionDAO");

const promotionRepository = {
    getPormotionByDate: async () => {
        return await promotionDAO.getPormotionByDate();
    },

    getAllPromotions: async () => {
        return await promotionDAO.getAllPromotions();
    },
    addPromotion: async (promotionObject) => {
        return await promotionDAO.addPromotion(promotionObject);
    },

    updatePromotion: async (promotionID, promotionObject) => {
        return await promotionDAO.updatePromotion(promotionID, promotionObject);
    },

    searchPromotionByName: async (promotionName) => {
        return await promotionDAO.searchPromotionByName(promotionName);
    },
    getAllProductsApplyPromotion: async (promotionID) => {
        return await promotionDAO.getAllProductsApplyPromotion(promotionID);
    },
    applyPromotionToProduct: async (productID, promotionID) => {
        return await promotionDAO.applyPromotionToProduct(productID, promotionID);
    }


};

module.exports = promotionRepository;