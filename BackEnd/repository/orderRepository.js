const orderDAO = require('../dao/orderDAO');

const orderRepository = {

    countOrdersIn7Days: () => {
        return orderDAO.countOrdersIn7Days();
    },

    countOrdersFinish: () => {
        return orderDAO.countOrdersFinish();
    },

    countOrdersCancel:() => {
        return orderDAO.countOrdersCancel();
    },

    countOrdersWaitToConfirm: () => {
        return orderDAO.countOrdersWaitToConfirm();
    },

    countNewOrders: () => {
        return orderDAO.countNewOrders();
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


};

module.exports = orderRepository;
