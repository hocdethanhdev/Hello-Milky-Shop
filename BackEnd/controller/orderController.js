const orderService = require('../service/orderService');

const countOrdersIn7Days = async (req, res) => {
    try {
        const orders = await orderService.countOrdersIn7Days();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const countOrdersByStatusOrderID = async (req, res) => {
    try {
        const { statusOrderID } = req.body;
        const orders = await orderService.countOrdersByStatusOrderID(statusOrderID);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const countNewOrders = async (req, res) => {
    try {
        const orders = await orderService.countNewOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOpenOrderForUser = (req, res) => {
    orderService.getOpenOrderForUser(req.params.id)
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({ message: err.message })
        );
}
const removeProductFromOrder = async (req, res) => {
    try {
        const { OrderID, ProductID } = req.body;
        await orderService.removeProductFromOrder(OrderID, ProductID);
        res.status(200).json({ message: 'Product removed from order successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
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

const changeQuantityOfProductInOrder = async (req, res) => {
    try {
        const { orderID, productQuantities } = req.body;
        await orderService.changeQuantityOfProductInOrder(orderID, productQuantities);
        res.status(200).json({ message: 'Order quantities updated and unselected items moved to a new order successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

const updateStatusOrderID = async (req, res) => {
    const orderID = req.params.OrderID;
    const { statusOrderID } = req.body;
    try {
        const result = await orderService.updateStatusOrderID(orderID, statusOrderID);
        res.status(200).json({ message: 'Status order ID have been updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getOrdersByStatusOrderID = async (req, res) => {
    try {
        const statusOrderID = req.params.statusOrderID;
        const address = await orderService.getOrdersByStatusOrderID(statusOrderID);
        res.status(200).json({ address });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const addInfoCusToOrder = async (req, res) => {
    try {
        const { receiver, phoneNumber, address, userID } = req.body;
        await orderService.addInfoCusToOrder(receiver, phoneNumber, address, userID);
        res.status(200).json({ message: 'Info Customer added to order' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getTodayRevenue = async (req, res) => {
    try {
        const revenue = await orderService.getTodayRevenue();
        res.status(200).json(revenue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRevenueLastSevenMonths = async (req, res) => {
    try {
        const revenues = await orderService.getRevenueLastSevenMonths();
        res.status(200).json(revenues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrdersForUserByStatusOrderID = async (req, res) => {
    try {
        const { userID, statusOrderID } = req.params;
        const orders = await orderService.getOrdersForUserByStatusOrderID(userID, statusOrderID);
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const { orderID, reasonCancelContent, userID } = req.body;
        await orderService.cancelOrder(orderID, reasonCancelContent, userID);
        res.status(200).json({ message: 'Order canceled successfully' });
    } catch (error) {
        console.error('Error in cancelOrder controller:', error);
        res.status(500).json({ error: error.message });
    }
};

const updateTotalAmountOfOrder = async (req, res) => {
    try {
        const { orderID, totalAmount } = req.body;
        await orderService.updateTotalAmountOfOrder(orderID, totalAmount);
        res.status(200).json({ message: 'The amount of the order updated successfully' });
    } catch (error) {
        console.error('Error in updateTotalAmountOfOrder controller:', error);
        res.status(500).json({ error: error.message });
    }
};

const updateShippingAddressID = async (req, res) => {
    try {
        const { orderID, shippingAddressID } = req.body;
        await orderService.updateShippingAddressID(orderID, shippingAddressID);
        res.status(200).json({ message: 'The shipping address ID of the order updated successfully' });
    } catch (error) {
        console.error('Error in updateShippingAddressID controller:', error);
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
    getOrderDetailByOrderID,
    changeQuantityOfProductInOrder,
    updateStatusOrderID,
    getOpenOrderForUser,
    removeProductFromOrder,
    getOrdersByStatusOrderID,
    addInfoCusToOrder,
    countNewOrders,
    countOrdersIn7Days,
    getTodayRevenue,
    getRevenueLastSevenMonths,
    countOrdersByStatusOrderID,
    getOrdersForUserByStatusOrderID,
    cancelOrder,
    updateTotalAmountOfOrder,
    updateShippingAddressID
};