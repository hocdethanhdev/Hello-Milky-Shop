const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

router.get('/getAllProducts', productController.getAll);

router.get('/getProductsByCategory/:id', productController.getProductsByCategory);

module.exports = router;
