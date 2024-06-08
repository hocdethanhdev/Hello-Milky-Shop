const orderService = require('../service/orderService');

const getAllOrders = async (req, res) => {
    orderService.getAllOrders()
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({ message: err.message })
        );
}

const searchOrderByUserName = async (req, res) => {
    try {
        const userName = req.params.userName;
        const orders = await orderService.searchOrderByUserName(userName);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createOrder = async (req, res) => {
    try {
        const userID = req.body.userID;
        const orderID = await orderService.createOrder(userID);
        res.status(201).json({ orderID });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addProductToOrder = async (req, res) => {
    try {
        const { userID, productID, quantity, price } = req.body;
        await orderService.addProductToOrder(userID, productID, quantity, price);
        res.status(200).json({ message: 'Product added to order' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrder = async (req, res) => {
    try {
        const orderID = req.params.orderID;
        const order = await orderService.getOrder(orderID);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const checkoutOrder = async (req, res) => {
    try {
        const { userID } = req.body;
        await orderService.checkoutOrder(userID);
        res.status(200).json({ message: 'Order checked out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getApplicableVouchers = async (req, res) => {
    try {
        const { userID, orderID } = req.params;
        const vouchers = await orderService.getApplicableVouchers(userID, orderID);
        res.status(200).json(vouchers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const applyVoucherToOrder = async (req, res) => {
    try {
        const { orderID, voucherID } = req.body;
        await orderService.applyVoucherToOrder(orderID, voucherID);
        res.status(200).json({ message: 'Voucher applied to order' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getOrdersByUserID = async (req, res) => {
    try {
        const userID = req.params.userID;
        const orders = await orderService.getOrdersByUserID(userID);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getPreviousOrderAddress = async (req, res) => {
    try {
        const userID = req.params.userID;
        const address = await orderService.getPreviousOrderAddress(userID);
        res.status(200).json({ address });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrderDetailByOrderID = async (req, res) => {
    try {
        const orderID = req.params.orderID;
        const address = await orderService.getOrderDetailByOrderID(orderID);
        res.status(200).json({ address });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllOrders,
    createOrder,
    addProductToOrder,
    getOrder,
    checkoutOrder,
    getOrdersByUserID,
    getApplicableVouchers,
    applyVoucherToOrder,
    getPreviousOrderAddress,
    searchOrderByUserName,
    getOrderDetailByOrderID
};