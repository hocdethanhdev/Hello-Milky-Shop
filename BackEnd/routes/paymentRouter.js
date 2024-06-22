const router = require('express').Router();
const paymentController = require("../controller/paymentController");
require('dotenv').config();

router.post('/create_payment_url', paymentController.createVNPayPayment);

router.get('/vnpay_return', paymentController.vnpayReturn, (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/PaymentSuccess?status=${req.result.status}&code=${req.result.code}`);
});

module.exports = router



