const router = require('express').Router();

const shippingAddressController = require("../controller/shippingAddressController");


     
router.get('/getInfoShippingByUserID/:ID', shippingAddressController.getInfoShippingByUserID);



module.exports = router