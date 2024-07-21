const router = require('express').Router();

const brandController = require("../controller/brandController");

router.post('/addBrand', brandController.addBrand);

module.exports = router;