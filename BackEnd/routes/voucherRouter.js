const router = require('express').Router();

const voucherController = require("../controller/voucherController");

router.get('/getAllVouchers', voucherController.getAllVouchers);

router.post('/addVoucher', voucherController.addVoucher);

router.get('/searchVoucherByDate', voucherController.searchVoucherByDate);

router.put('/updateVoucher/:id', voucherController.updateVoucher);

router.post('/saveVoucherForUser', voucherController.saveVoucherForUser);

router.post('/removeVoucherFromUser', voucherController.removeVoucherFromUser);

router.get('/getVouchersByUserID/:userID', voucherController.getVouchersByUserID);

router.post('/getVouchersforUser', voucherController.getVouchersforUser);

module.exports = router



