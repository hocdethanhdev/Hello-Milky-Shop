const promotionService = require('../service/promotionService');


const getPormotionByDate = async(req, res) => {
    promotionService.getPormotionByDate()
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({ message: err.message }));
}

const getAllPromotions = async (req, res) => {
    promotionService.getAllPromotions()
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({ message: err.message })
        );
}

const addPromotion = async (req, res) => {
    promotionService.addPromotion(req.body)
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({ message: err.message }));
}


const updatePromotion = async (req, res) => {
    const promotionID = req.params.id;
    const promotionData = req.body;
    try {
        const updatedPromotion = await promotionService.updatePromotion(promotionID, promotionData);
        res.status(200).json({ message: 'Promotion have been updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const searchPromotionByName = async (req, res) => {
    promotionService.searchPromotionByName(req.query.name)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ message: err.message }));
}


const getProductsApplyAnPromotion = async (req, res) => {
    try {
        const promotionID = req.params.promotionID;
        const vouchers = await promotionService.getProductsApplyAnPromotion(promotionID);
        res.status(200).json(vouchers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const applyPromotionToProduct = async (req, res) => {
    try {
        const { productID, promotionID } = req.body;
        await promotionService.applyPromotionToProduct(productID, promotionID);
        res.status(200).json({ message: 'Promotion have been apply successfully!!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCurrentProductsHavingPromotion = async (req, res) => {
    promotionService.getCurrentProductsHavingPromotion()
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({ message: err.message })
        );
}


module.exports = {
    getAllPromotions,
    addPromotion,
    updatePromotion,
    searchPromotionByName,  
    getPormotionByDate,
    getProductsApplyAnPromotion,
    applyPromotionToProduct,
    getCurrentProductsHavingPromotion
};