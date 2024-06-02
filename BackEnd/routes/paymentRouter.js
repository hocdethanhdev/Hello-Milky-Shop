const router = require('express').Router();
const paymentController = require("../controller/paymentController");

router.post('/create_payment_url', paymentController.createVNPayPayment);

router.get('/vnpay_return', paymentController.vnpayReturn)

module.exports = router



