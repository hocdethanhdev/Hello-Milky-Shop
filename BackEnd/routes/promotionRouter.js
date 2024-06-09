const router = require('express').Router();

const promotionController = require("../controller/promotionController");

router.get('/getAllPromotions', promotionController.getAllPromotions);

router.post('/addPromotion', promotionController.addPromotion);

router.get('/searchPromotionByName', promotionController.searchPromotionByName);

router.put('/updatePromotion/:id', promotionController.updatePromotion);

router.post('/applyPromotionToProduct', promotionController.applyPromotionToProduct);

router.get('/getProductsApplyAnPromotion/:promotionID', promotionController.getProductsApplyAnPromotion);

router.get('/getCurrentProductsHavingPromotion', promotionController.getCurrentProductsHavingPromotion);

router.get('/getPormotionByDate', promotionController.getPormotionByDate)

module.exports = router



