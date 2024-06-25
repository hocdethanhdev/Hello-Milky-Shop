const promotionDAO = require("../dao/promotionDAO");

const promotionRepository = {
    getPromotionByDate: async () => {
        return await promotionDAO.getPromotionByDate();
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
    getProductsApplyAnPromotion: async (promotionID) => {
        return await promotionDAO.getProductsApplyAnPromotion(promotionID);
    },
    getAllPromotions: async () => {
        return await promotionDAO.getAllPromotions();
    },
    deleteProductPromotionsByPromotionID: async (promotionID) => {
        return await promotionDAO.deleteProductPromotionsByPromotionID(promotionID);
    },
    insertProductPromotions: async (productIDs, promotionID) => {
        return await promotionDAO.insertProductPromotions(productIDs, promotionID);
    },
    updateProductPriceAfterDiscount: async (productID, promotionID) => {
        return await promotionDAO.updateProductPriceAfterDiscount(productID, promotionID);
    },
    getCurrentProductsHavingPromotion: async () => {
        return await promotionDAO.getCurrentProductsHavingPromotion();
    },


};

module.exports = promotionRepository;