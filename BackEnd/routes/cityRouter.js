const router = require('express').Router();

const cityController = require("../controller/cityController");
     
router.get('/getAllCities', cityController.getAllCities);

module.exports = router