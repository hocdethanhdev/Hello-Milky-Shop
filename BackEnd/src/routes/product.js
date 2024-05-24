const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

router.get('/getProductsByCategory/:id', productController.getProductsByCategory);

router.get('/getPromotionalProducts', productController.getPromotionalProducts)

router.get('/getTop6ProductsByCategory/:id', productController.getTop6ProductsByCategory)

module.exports = router;
