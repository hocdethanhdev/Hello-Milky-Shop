const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const Order = require("../bo/order");

const orderDAO = {
    getAllOrders: () => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err, result) {
                const request = new mssql.Request();
                request.query(`SELECT * FROM Orders;`,
                    (err, res) => {
                        if (err) reject(err);

                        resolve(res.recordset);
                    });
            });
        });
    },
    createOrder: (userID) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('userID', mssql.VarChar, userID)
                    .input('orderDate', mssql.DateTime, new Date())
                    .input('status', mssql.Int, '0')
                    .input('totalAmount', mssql.Float, 0);

                const insertQuery = `
                    INSERT INTO Orders (orderDate, totalAmount, status, userID, paymentID)
                    VALUES (@orderDate, @totalAmount, @status, @userID, NULL);
                    SELECT SCOPE_IDENTITY() AS orderID;
                `;

                request.query(insertQuery, (err, result) => {
                    if (err) return reject(err);
                    const orderID = result.recordset[0].orderID;
                    resolve(orderID);
                });
            });
        });
    },

    addProductToOrder: (orderID, productID, quantity, price) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('orderID', mssql.Int, orderID)
                    .input('productID', mssql.VarChar, productID)
                    .input('quantity', mssql.Int, quantity)
                    .input('price', mssql.Float, price);

                const insertQuery = `
                    IF EXISTS (SELECT 1 FROM OrderDetail WHERE OrderID = @orderID AND ProductID = @productID)
                    BEGIN
                        UPDATE OrderDetail
                        SET Quantity = Quantity + @quantity
                        WHERE OrderID = @orderID AND ProductID = @productID;
                    END
                    ELSE
                    BEGIN
                        INSERT INTO OrderDetail (OrderID, ProductID, Quantity, Price)
                        VALUES (@orderID, @productID, @quantity, @price);
                    END
                `;

                request.query(insertQuery, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
        });
    },

    getOrder: (orderID) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('orderID', mssql.Int, orderID);

                const selectQuery = `
                    SELECT o.OrderID, o.OrderDate, o.TotalAmount, o.Status, o.UserID, od.ProductID, od.Quantity, od.Price
                    FROM Orders o
                    JOIN OrderDetail od ON o.OrderID = od.OrderID
                    WHERE o.OrderID = @orderID
                `;

                request.query(selectQuery, (err, result) => {
                    if (err) return reject(err);
                    resolve(result.recordset);
                });
            });
        });
    },

    checkoutOrder: (orderID, paymentID) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const transaction = new mssql.Transaction();
                transaction.begin(err => {
                    if (err) return reject(err);

                    const request = new mssql.Request(transaction);
                    request.input('orderID', mssql.Int, orderID)
                        .input('paymentID', mssql.Int, paymentID);

                    const updateOrderQuery = `
                        UPDATE Orders
                        SET status = 1, paymentID = @paymentID
                        WHERE orderID = @orderID
                    `;

                    request.query(updateOrderQuery, (err, result) => {
                        if (err) {
                            transaction.rollback();
                            return reject(err);
                        }

                        transaction.commit(err => {
                            if (err) {
                                transaction.rollback();
                                return reject(err);
                            }
                            resolve(result);
                        });
                    });
                });
            });
        });
    },

    getOrdersByUserID: (userID) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('userID', mssql.VarChar, userID);

                const selectQuery = `
                    SELECT * FROM Orders WHERE UserID = @userID
                `;

                request.query(selectQuery, (err, result) => {
                    if (err) return reject(err);
                    resolve(result.recordset);
                });
            });
        });
    },

    getOpenOrderForUser: (userID) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('userID', mssql.VarChar, userID);

                const selectQuery = `
                    SELECT * FROM Orders WHERE UserID = @userID AND status = 0
                `;

                request.query(selectQuery, (err, result) => {
                    if (err) return reject(err);
                    resolve(result.recordset[0]);
                });
            });
        });
    },
    //Chức năng cho phép lấy những voucher đã lưu mà có thể áp dụng cho đơn hàng
    getApplicableVouchers: (userID, orderTotal, currentDate) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('userID', mssql.VarChar, userID)
                    .input('orderTotal', mssql.Float, orderTotal)
                    .input('currentDate', mssql.DateTime, currentDate);

                const selectQuery = `
                    SELECT v.*
                    FROM Voucher v
                    JOIN UserVoucher uv ON v.VoucherID = uv.VoucherID
                    WHERE uv.UserID = @userID
                    AND v.MinDiscount <= @orderTotal
                    AND v.MaxDiscount >= @orderTotal
                    AND v.Status = 1
                    AND v.StartDate <= @currentDate
                    AND v.ExpiryDate >= @currentDate
                `;

                request.query(selectQuery, (err, result) => {
                    if (err) return reject(err);
                    resolve(result.recordset);
                });
            });
        });
    },
    // Áp dụng voucher vào đơn hàng
    applyVoucherToOrder: (orderID, voucherID) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('orderID', mssql.Int, orderID)
                    .input('voucherID', mssql.Int, voucherID);

                const insertQuery = `
                    INSERT INTO VoucherOrder (OrderID, VoucherID)
                    VALUES (@orderID, @voucherID)
                `;

                request.query(insertQuery, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
        });
    }
}
module.exports = orderDAO;