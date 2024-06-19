const router = require('express').Router();

const shippingAddressController = require("../controller/shippingAddressController");


     
router.get('/getInfoShippingByUserID/:ID', shippingAddressController.getInfoShippingByUserID);

router.get('/getInfoShippingByOrderID/:orderID', shippingAddressController.getInfoShippingByOrderID);

module.exports = router