const promotionDAO = require("../dao/promotionDAO");

const promotionRepository = {
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
    getProductsApplyAnPromotion: async (promotionID) => {
        return await promotionDAO.getProductsApplyAnPromotion(promotionID);
    },
    applyPromotionToProduct: async (productID, promotionID) => {
        return await promotionDAO.applyPromotionToProduct(productID, promotionID);
    },
    getAllPromotions: async () => {
        return await promotionDAO.getAllPromotions();
    },
    getCurrentProductsHavingPromotion: async () => {
        return await promotionDAO.getCurrentProductsHavingPromotion();
    },


};

module.exports = promotionRepository;