const { getAllPromotions } = require('../dao/promotionDAO');
const promotionRepository = require('../repository/promotionRepository');

const promotionService = {
    getPromotionByDate: async () => {
        return await promotionRepository.getPromotionByDate();
    },

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
    applyPromotionToProducts: async (productIDs, promotionID) => {
        try {
            await promotionRepository.deleteProductPromotionsByPromotionID(promotionID);
            await promotionRepository.insertProductPromotions(productIDs, promotionID);

            // Update PriceAfterDiscount for each product
            for (let productID of productIDs) {
                await promotionRepository.updateProductPriceAfterDiscount(productID, promotionID);
            }

            return { message: 'Promotion applied successfully to the specified products!' };
        } catch (error) {
            throw new Error('Error applying promotion to products: ' + error.message);
        }
    },
    getCurrentProductsHavingPromotion: async () => {
        return await promotionRepository.getCurrentProductsHavingPromotion();
    },

};

module.exports = promotionService;