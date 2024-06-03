const orderRepository = require('../repository/orderRepository');

const orderService = {
    getAllOrders: async (req, res) => {
        return await orderRepository.getAllOrders();
    },

    createOrder: async (userID) => {
        try {
            const orderID = await orderRepository.createOrder(userID);
            return orderID;
        } catch (error) {
            throw new Error(`Error creating order: ${error.message}`);
        }
    },

    addProductToOrder: async (userID, productID, quantity, price) => {
        try {
            let openOrder = await orderRepository.getOpenOrderForUser(userID);
            if (!openOrder) {
                // Nếu không có giỏ hàng hiện tại, tạo giỏ hàng mới và thêm sản phẩm và
                const newOrderID = await orderRepository.createOrder(userID);
                await orderRepository.addProductToOrder(newOrderID, productID, quantity, price);
            } else {
                // Nếu đã có giỏ hàng, thêm sản phẩm vào đơn hàng hiện tại
                await orderRepository.addProductToOrder(openOrder.OrderID, productID, quantity, price);
            }
        } catch (error) {
            throw new Error(`Error adding product to order: ${error.message}`);
        }
    },

    getOrder: async (orderID) => {
        try {
            const order = await orderRepository.getOrder(orderID);
            return order;
        } catch (error) {
            throw new Error(`Error getting order: ${error.message}`);
        }
    },

    checkoutOrder: async (userID, paymentID) => {
        try {
            let openOrder = await orderRepository.getOpenOrderForUser(userID);
            if (!openOrder) {
                throw new Error('No open order to checkout');
            }
            await orderRepository.checkoutOrder(openOrder.OrderID, paymentID);
        } catch (error) {
            throw new Error(`Error checking out order: ${error.message}`);
        }
    },

    getOrdersByUserID: async (userID) => {
        try {
            const orders = await orderRepository.getOrdersByUserID(userID);
            return orders;
        } catch (error) {
            throw new Error(`Error getting orders for user: ${error.message}`);
        }
    },
    getApplicableVouchers: async (userID, orderID) => {
        try {
            const order = await orderRepository.getOrder(orderID);
            if (!order || order.length === 0) {
                throw new Error('Order not found');
            }
            const orderTotal = order.reduce((total, item) => total + item.Price * item.Quantity, 0);
            const currentDate = new Date();
            const vouchers = await orderRepository.getApplicableVouchers(userID, orderTotal, currentDate);
            return vouchers;
        } catch (error) {
            throw new Error(`Error getting applicable vouchers: ${error.message}`);
        }
    },

    applyVoucherToOrder: async (orderID, voucherID) => {
        try {
            await orderRepository.applyVoucherToOrder(orderID, voucherID);
        } catch (error) {
            throw new Error(`Error applying voucher to order: ${error.message}`);
        }
    }
};

module.exports = orderService;
