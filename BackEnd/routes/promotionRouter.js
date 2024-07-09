const router = require('express').Router();

const promotionController = require("../controller/promotionController");

router.get('/getAllPromotions', promotionController.getAllPromotions);

router.post('/addPromotion', promotionController.addPromotion);

router.get('/searchPromotionByName', promotionController.searchPromotionByName);

router.put('/updatePromotion/:id', promotionController.updatePromotion);

router.post('/applyPromotionToProduct', promotionController.applyPromotionToProduct);

router.get('/getProductsApplyAnPromotion/:promotionID', promotionController.getProductsApplyAnPromotion);

router.get('/getCurrentProductsHavingPromotion', promotionController.getCurrentProductsHavingPromotion);

router.get('/getPromotionByDate', promotionController.getPromotionByDate)

router.put('/deletePromotion/:promotion_id', promotionController.deletePromotion);

router.put('/openPromotion/:promotion_id', promotionController.openPromotion);

module.exports = router



