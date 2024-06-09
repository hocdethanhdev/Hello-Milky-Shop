const { getAllPromotions } = require('../dao/promotionDAO');
const promotionRepository = require('../repository/promotionRepository');

const promotionService = {
    getAllPromotions: async () => {
        return await promotionRepository.getAllPromotions();
    },

    addPromotion: async (promotionObject) => {
        return await promotionRepository.addPromotion(promotionObject);
    },

    updatePromotion: async (promotionID, promotionObject) => {
        return await promotionRepository.updatePromotion(promotionID, promotionObject);
    },

    searchPromotionByName: async (promotionName) => {
        return await promotionRepository.searchPromotionByName(promotionName);
    },
    getProductsApplyAnPromotion: async (promotionID) => {
        return await promotionRepository.getProductsApplyAnPromotion(promotionID);
    },
    applyPromotionToProduct: async (productID, promotionID) => {
        return await promotionRepository.applyPromotionToProduct(productID, promotionID);
    },
    getCurrentProductsHavingPromotion: async () => {
        return await promotionRepository.getCurrentProductsHavingPromotion();
    },

};

module.exports = promotionService;