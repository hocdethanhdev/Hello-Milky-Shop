const orderDAO = require('../dao/orderDAO');

const orderRepository = {
    getAllOrders: () => {
        return orderDAO.getAllOrders();
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

    checkoutOrder: (orderID, paymentID) => {
        return orderDAO.checkoutOrder(orderID, paymentID);
    },

    getOrdersByUserID: (userID) => {
        return orderDAO.getOrdersByUserID(userID);
    },

    getApplicableVouchers: (userID, orderTotal, currentDate) => {
        return orderDAO.getApplicableVouchers(userID, orderTotal, currentDate);
    },

    applyVoucherToOrder: (orderID, voucherID) => {
        return orderDAO.applyVoucherToOrder(orderID, voucherID);
    }
};

module.exports = orderRepository;
