class Order {
    constructor(orderID, orderDate, totalAmount, status, reasonCancelContent, userID, statusOrderID, paymentID) {
        this.orderID = orderID;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.status = status;
        this.reasonCancelContent = reasonCancelContent;
        this.userID = userID;
        this.statusOrderID = statusOrderID;
        this.paymentID = paymentID;
    }
}
module.exports = Order;