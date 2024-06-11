const router = require('express').Router();
require('dotenv').config();

const orderController = require("../controller/orderController");

router.get('/getAllOrders', orderController.getAllOrders);

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

// Lấy order trước đó của user
router.get('/getPreviousOrderAddress/:userID', orderController.getPreviousOrderAddress);

router.get('/getOrderDetailByOrderID/:orderID', orderController.getOrderDetailByOrderID);

router.get('/searchOrderByUserName/:userName', orderController.searchOrderByUserName);

// Thay đổi số lượng sản phẩm trong đơn hàng
router.post('/changeQuantityOfProductInOrder', orderController.changeQuantityOfProductInOrder);

// Cập nhật trạng thái đơn hàng
router.post('/updateStatusOrderID/:OrderID', orderController.updateStatusOrderID);

router.get('/getOpenOrderForUser/:id', orderController.getOpenOrderForUser);

router.get('/countOrdersPayed', orderController.countOrdersPayed);

router.get('/countNewOrders', orderController.countNewOrders);

router.get('/countOrdersWaitToConfirm', orderController.countOrdersWaitToConfirm);

router.get('/countOrdersCancel', orderController.countOrdersCancel);

router.get('/countOrdersFinish', orderController.countOrdersFinish);

router.get('/countOrdersIn7Days', orderController.countOrdersIn7Days);

module.exports = router