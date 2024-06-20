const orderDAO = require('../dao/orderDAO');

const orderRepository = {

    getUserIDFromOrderID: (OrderID) => {
        return orderDAO.getUserIDFromOrderID(OrderID);
    },

    countOrdersIn7Days: () => {
        return orderDAO.countOrdersIn7Days();
    },
    countNewOrders: () => {
        return orderDAO.countNewOrders();
    },
    countOrdersByStatusOrderID: (statusOrderID) => {
        return orderDAO.countOrdersByStatusOrderID(statusOrderID);
    },
    removeProductFromOrder: (orderID, productID) => {
        return orderDAO.removeProductFromOrder(orderID, productID);
    },
    countOrdersPayed: () => {
        return orderDAO.countOrdersPayed();
    },
    getAllOrders: () => {
        return orderDAO.getAllOrders();
    },
    searchOrderByUserName: (userName) => {
        return orderDAO.searchOrderByUserName(userName);
    },
    createOrder: (userID) => {
        return orderDAO.createOrder(userID);
    },
    addProductToOrder: (orderID, productID, quantity, price) => {
        return orderDAO.addProductToOrder(orderID, productID, quantity, price);
    },
    getOrder: (orderID) => {
        return orderDAO.getOrder(orderID);
    },
    getOpenOrderForUser: (userID) => {
        return orderDAO.getOpenOrderForUser(userID);
    },
    checkoutOrder: (orderID) => {
        return orderDAO.checkoutOrder(orderID);
    },
    getApplicableVouchers: (userID, orderTotal, currentDate) => {
        return orderDAO.getApplicableVouchers(userID, orderTotal, currentDate);
    },
    applyVoucherToOrder: (orderID, voucherID) => {
        return orderDAO.applyVoucherToOrder(orderID, voucherID);
    },
    getPreviousOrderAddress: (userID) => {
        return orderDAO.getPreviousOrderAddress(userID);
    },
    getOrderDetailByOrderID: (orderID) => {
        return orderDAO.getOrderDetailByOrderID(orderID);
    },
    getOrdersByUserID: (userID) => {
        return orderDAO.getOrdersByUserID(userID);
    },
    changeQuantityOfProductInOrder: (orderID, productQuantities) => {
        return orderDAO.changeQuantityOfProductInOrder(orderID, productQuantities);
    },
    updateStatusOrderID: (orderID, statusOrderID) => {
        return orderDAO.updateStatusOrderID(orderID, statusOrderID);
    },
    updateStatusAfterDays: (days, oldStatus, newStatus) => {
        return orderDAO.updateStatusAfterDays(days, oldStatus, newStatus);
    },

    getOrdersByStatusOrderID: (statusOrderID) => {
        return orderDAO.getOrdersByStatusOrderID(statusOrderID);
    },
    addInfoCusToOrder: (receiver, phoneNumber, address, userID) => {
        return orderDAO.addInfoCusToOrder(receiver, phoneNumber, address, userID);
    },
    getTodayRevenue: () => {
        return orderDAO.getTodayRevenue();
    },
    getRevenueLastSevenMonths: () => {
        return orderDAO.getRevenueLastSevenMonths();
    },
    getOrdersForUserByStatusOrderID: (userID, statusOrderID) => {
        return orderDAO.getOrdersForUserByStatusOrderID(userID, statusOrderID);
    },
    cancelOrder: (orderId, reasonCancelContent) => {
        return orderDAO.cancelOrder(orderId, reasonCancelContent);
    },
    getOrderByID: (orderId) => {
        return orderDAO.getOrderById(orderId);
    },
    updateTotalAmountOfOrder: (orderID, totalAmount) => {
        return orderDAO.updateTotalAmountOfOrder(orderID, totalAmount);
    },
    updateShippingAddressID: (orderID, shippingAddressID) => {
        return orderDAO.updateShippingAddressID(orderID, shippingAddressID);
    },
    getReasonCancleOrderByUserID: async (userID) => {
        return await orderDAO.findReasonCancleOrderByUserID(userID);
    },
};

module.exports = orderRepository;
