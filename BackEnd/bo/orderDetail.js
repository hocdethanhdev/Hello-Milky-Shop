class OrderDetail {
    constructor(orderDetailID, quantity, price, orderID, productID) {
        this.orderDetailID = orderDetailID;
        this.quantity = quantity;
        this.price = price;
        this.orderID = orderID;
        this.productID = productID;
    }
}
module.exports = OrderDetail;