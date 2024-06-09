class Order {
    constructor(orderID, orderDate, totalAmount, status, userID, statusOrderID, paymentID) {
        this.orderID = orderID;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.status = status;
        this.userID = userID;
        this.statusOrderID = statusOrderID;
        this.paymentID = paymentID;
    }
}
module.exports = Order;