const router = require('express').Router();

const orderController = require("../controller/orderController");

router.get('/getAllOrders', orderController.getAllOrders);

//router.post('/addOrder', orderController.addOrder);

//router.put('/updateOrder/:id', orderController.updateOrder);

// Tạo một đơn hàng mới cho user
router.post('/createOrder', orderController.createOrder);

// Thêm sản phẩm vào đơn hàng hiện tại của user
router.post('/addProductToOrder', orderController.addProductToOrder);

// Lấy thông tin chi tiết của một đơn hàng theo orderID
router.get('/getOrder/:orderID', orderController.getOrder);

// Thanh toán đơn hàng hiện tại của user
router.post('/checkoutOrder', orderController.checkoutOrder);

// Lấy tất cả các đơn hàng của một user theo userID
router.get('/getOrdersByUserID/:userID', orderController.getOrdersByUserID);

// Lấy các voucher có thể áp dụng cho đơn hàng
router.get('/getApplicableVouchers/:userID/:orderID', orderController.getApplicableVouchers);

// Áp dụng voucher vào đơn hàng
router.post('/applyVoucherToOrder', orderController.applyVoucherToOrder);

module.exports = router