
const orderRepository = require('../repository/orderRepository');

const orderService = {

    transferOrderDetailsToNewOrder: async (OrderID) => {
        return await orderRepository.transferOrderDetailsToNewOrder(OrderID);
    },

    countOrdersPayed: async () => {
        return await orderRepository.countOrdersPayed();
    },

    getInfoToShip: async (StatusOrderID) => {
        return await orderRepository.getInfoToShip(StatusOrderID);
    },

    getUserIDFromOrderID: async (OrderID) => {
        return await orderRepository.getUserIDFromOrderID(OrderID);
    },

    countOrdersIn7Days: async () => {
        return await orderRepository.countOrdersIn7Days();
    },

    countOrdersByStatusOrderID: async (statusOrderID) => {
        try {
            const orders = await orderRepository.countOrdersByStatusOrderID(statusOrderID);
            return orders;
        } catch (error) {
            throw new Error(`Error counting order by status order ID: ${error.message}`);
        }
    },

    removeProductFromOrder: async (orderID, productID) => {
        try {
            await orderRepository.removeProductFromOrder(orderID, productID);
        } catch (error) {
            throw new Error(`Error removing product from order: ${error.message}`);
        }
    },

    countOrdersWaitToConfirm: async () => {
        return await orderRepository.countOrdersWaitToConfirm();
    },

    countNewOrders: async () => {
        return await orderRepository.countNewOrders();
    },

    getOpenOrderForUser: async (id) => {
        return await orderRepository.getOpenOrderForUser(id);
    },

    getAllOrders: async () => {
        return await orderRepository.getAllOrders();
    },

    searchOrderByUserName: async (userName) => {
        try {
            const orders = await orderRepository.searchOrderByUserName(userName);
            return orders;
        } catch (error) {
            throw new Error(`Error searching orders by user name: ${error.message}`);
        }
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
                // Nếu không có giỏ hàng hiện tại, tạo giỏ hàng mới và thêm sản phẩm vào
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

    checkoutOrder: async (orderID) => {
        try {
            await orderRepository.checkoutOrder(orderID);
        } catch (error) {
            throw new Error(`Error checking out order: ${error.message}`);
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
    },

    getOrdersByUserID: async (userID) => {
        try {
            const orders = await orderRepository.getOrdersByUserID(userID);
            return orders;
        } catch (error) {
            throw new Error(`Error getting orders for user: ${error.message}`);
        }
    },

    getPreviousOrderAddress: async (userID) => {
        try {
            const order = await orderRepository.getPreviousOrderAddress(userID);
            return order;
        } catch (error) {
            throw new Error(`Error getting the previous order address: ${error.message}`);
        }
    },
    getOrderDetailByOrderID: async (orderID) => {
        try {
            const orderDetail = await orderRepository.getOrderDetailByOrderID(orderID);
            return orderDetail;
        } catch (error) {
            throw new Error(`Error getting the order detail: ${error.message}`);
        }
    },
    changeQuantityOfProductInOrder: async (orderID, productQuantities) => {
        try {
            await orderRepository.changeQuantityOfProductInOrder(orderID, productQuantities);
            return { message: "Order quantities updated and unselected items moved to a new order successfully" };
        } catch (error) {
            throw new Error(`Error changing quantity of products in order: ${error.message}`);
        }
    },
    updateStatusOrderID: async (orderID, statusOrderID) => {
        try {
            await orderRepository.updateStatusOrderID(orderID, statusOrderID);
        } catch (error) {
            throw new Error(`Error updating status of order: ${error.message}`);
        }
    },
    updateStatusAfterDays: async (days, oldStatus, newStatus) => {
        try {
            await orderRepository.updateStatusAfterDays(days, oldStatus, newStatus);
        } catch (error) {
            throw new Error(`Error updating status of orders: ${error.message}`);
        }
    },
    getOrdersByStatusOrderID: async (orderID) => {
        try {
            const orderDetail = await orderRepository.getOrdersByStatusOrderID(orderID);
            return orderDetail;
        } catch (error) {
            throw new Error(`Error getting the order: ${error.message}`);
        }
    },

    addInfoCusToOrder: async (receiver, phoneNumber, address, userID) => {
        return await orderRepository.addInfoCusToOrder(receiver, phoneNumber, address, userID);
    },

    getTodayRevenue: async () => {
        return await orderRepository.getTodayRevenue();
    },

    getRevenueLastSevenMonths: async () => {
        return await orderRepository.getRevenueLastSevenMonths();
    },

    getOrdersForUserByStatusOrderID: async (userID, statusOrderID) => {
        try {
            const orders = await orderRepository.getOrdersForUserByStatusOrderID(userID, statusOrderID);
            return orders;
        } catch (error) {
            throw new Error(`Error getting the order for user: ${error.message}`);
        }
    },
    cancelOrder: async (orderId, reasonCancelContent, userId) => {
        try {
            const order = await orderRepository.getOrderByID(orderId);

            if (!order) {
                throw new Error('Order not found');
            }

            if (order.userID === userId) {
                reasonCancelContent = 'Đơn hàng đã bị hủy bởi khách hàng';
            }

            await orderRepository.cancelOrder(orderId, reasonCancelContent);
        } catch (error) {
            console.error('Error canceling order:', error);
            throw error;
        }
    },

    updateTotalAmountOfOrder: async (orderID, totalAmount) => {
        try {
            const orders = await orderRepository.updateTotalAmountOfOrder(orderID, totalAmount);
            return orders;
        } catch (error) {
            throw new Error(`Error update the total amount of an order: ${error.message}`);
        }
    },

    updateShippingAddressID: async (orderID, shippingAddressID) => {
        try {
            const orders = await orderRepository.updateShippingAddressID(orderID, shippingAddressID);
            return orders;
        } catch (error) {
            throw new Error(`Error update the shipping address ID of an order: ${error.message}`);
        }
    },

    getReasonCancleOrderByUserID: async (userID) => {
        try {
            const orders = await orderRepository.getReasonCancleOrderByUserID(userID);
            return orders;
        } catch (error) {
            throw new Error(`Error getting the reason: ${error.message}`);
        }
    },
}

module.exports = orderService;
