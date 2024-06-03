class Order {
    constructor(orderID, orderDate, totalAmount, status, userID, paymentID) {
        this.orderID = orderID;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.status = status;
        this.userID = userID;
        this.paymentID = paymentID;
    }
}
module.exports = Order;