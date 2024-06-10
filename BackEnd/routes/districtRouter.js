const router = require('express').Router();

const districtController = require("../controller/districtController");
     


router.get('/getDistrictByID/:ID', districtController.getDistrictByID);






module.exports = router