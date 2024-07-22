const mssql = require("mssql");
const dbConfig = require("../config/db.config");

const orderDAO = {
  checkOrderOfUser: (UserID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request().input(
          "UserID",
          mssql.VarChar,
          UserID
        );
        request.query(
          `SELECT count(OrderID) as count
          FROM Orders o
          JOIN Users u ON u.UserID = o.UserID
          WHERE u.UserID = @UserID AND (o.StatusOrderID = 2 OR o.StatusOrderID = 1);`,
          (err, res) => {
            if (err) reject(err);
            resolve({
              status: res.recordset[0].count > 0 ? 1 : 0,
            });
          }
        );
      });
    });
  },
  countOrdersPayed: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request();
        request.query(
          `SELECT count(OrderID) as count
          FROM Orders o
          WHERE Status = 1
          AND YEAR(OrderDate) = YEAR(GETUTCDATE()) 
          AND MONTH(OrderDate) = MONTH(GETUTCDATE());`,
          (err, res) => {
            if (err) reject(err);

            resolve({
              err: res?.recordset[0] !== null ? 0 : 1,
              count: res.recordset[0].count,
            });
          }
        );
      });
    });
  },
  getInfoToShip: (StatusOrderID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request().input(
          "StatusOrderID",
          mssql.Int,
          StatusOrderID
        );
        request.query(
          `SELECT OrderID, UserName, u.PhoneNumber, sa.Address
          FROM Orders o
          JOIN Users u ON u.UserID = o.UserID
          JOIN ShippingAddress sa ON sa.ShippingAddressID = o.ShippingAddressID
          WHERE StatusOrderID = @StatusOrderID;`,
          (err, res) => {
            if (err) reject(err);

            resolve({
              err: res?.recordset[0] !== null ? 0 : 1,
              data: res.recordset ?? null,
            });
          }
        );
      });
    });
  },
  getUserIDFromOrderID: (OrderID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request().input(
          "OrderID",
          mssql.Int,
          OrderID
        );
        request.query(
          `SELECT o.UserID
          FROM Payment p 
          JOIN Orders o ON o.OrderID = p.OrderID
          JOIN Users u ON u.UserID = o.UserID
          WHERE o.OrderID = @OrderID;`,
          (err, res) => {
            if (err) reject(err);

            resolve({
              err: res?.recordset[0] !== null ? 0 : 1,
              UserID: res?.recordset[0].UserID,
            });
          }
        );
      });
    });
  },
  countOrdersIn7Days: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request();
        request.query(
          `WITH DateList AS (
          SELECT CAST(GETDATE() AS DATE) AS OrderDate
          UNION ALL
          SELECT DATEADD(DAY, -1, OrderDate)
          FROM DateList
          WHERE OrderDate > DATEADD(DAY, -6, CAST(GETDATE() AS DATE))
          )
          SELECT dl.OrderDate, COUNT(o.OrderID) AS count
          FROM DateList dl
          LEFT JOIN Orders o ON dl.OrderDate = o.OrderDate
          WHERE o.StatusOrderID = 4
          GROUP BY dl.OrderDate
          ORDER BY dl.OrderDate;`,
          (err, res) => {
            if (err) reject(err);

            resolve({
              err: res.recordset[0] !== null ? 0 : 1,
              data: res.recordset ?? null,
            });
          }
        );
      });
    });
  },

  countOrdersByStatusOrderID: (statusOrderID, timePeriod) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request.input("statusOrderID", mssql.Int, statusOrderID);

        let timeCondition;
        switch (timePeriod) {
          case "week":
            timeCondition = "AND OrderDate >= DATEADD(day, -7, GETDATE())";
            break;
          case "month":
            timeCondition = "AND OrderDate >= DATEADD(month, -1, GETDATE())";
            break;
          case "day":
          default:
            timeCondition = "AND OrderDate >= DATEADD(day, -1, GETDATE())";
            break;
        }

        const query = `
          SELECT COUNT(OrderID) as count 
          FROM Orders 
          WHERE StatusOrderID = @statusOrderID AND Status = 1 ${timeCondition};
        `;

        request.query(query, (err, res) => {
          if (err) return reject(err);

          resolve({ count: res.recordset[0].count });
        });
      });
    });
  },

  countNewOrders: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request();
        request.query(
          `SELECT COUNT(OrderID) as count
          FROM Orders 
          WHERE Status = 1 
          AND CAST(OrderDate AS DATE) = CAST(GETUTCDATE() AS DATE);
          `,
          (err, res) => {
            if (err) reject(err);

            resolve({ count: res.recordset[0].count });
          }
        );
      });
    });
  },

  getAllOrders: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function () {
        const request = new mssql.Request();
        request.query(
          `SELECT * FROM Orders 
          WHERE ORDERS.STATUS=1;`,
          (err, res) => {
            if (err) reject(err);

            resolve(res.recordset);
          }
        );
      });
    });
  },
  searchOrderByUserName: (userName) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const trimmedUserName = userName.trim().replace(/\s+/g, " ");

        const request = new mssql.Request();

        request.input("userName", mssql.VarChar, `%${trimmedUserName}%`);

        const selectQuery = `
                SELECT o.*
                FROM Orders o
                JOIN Users u ON o.UserID = u.UserID
                WHERE u.UserName COLLATE SQL_Latin1_General_CP1_CI_AS LIKE @userName
                `;

        request.query(selectQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result.recordset);
        });
      });
    });
  },

  createOrder: (userID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request
          .input("userID", mssql.VarChar, userID)
          .input("orderDate", mssql.DateTime, new Date())
          .input("status", mssql.Int, "0")
          .input("totalAmount", mssql.Float, 0);

        const insertQuery = `
                    INSERT INTO Orders (orderDate, totalAmount, status, userID)
                    VALUES (@orderDate, @totalAmount, @status, @userID);
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
        request
          .input("orderID", mssql.Int, orderID)
          .input("productID", mssql.VarChar, productID)
          .input("quantity", mssql.Int, quantity)
          .input("price", mssql.Float, price);

        const insertQuery = `
                    IF EXISTS (SELECT 1 FROM OrderDetail WHERE OrderID = @orderID AND ProductID = @productID)
                    BEGIN
                        DECLARE @newQuantity INT;
                        SELECT @newQuantity = CASE 
                                                WHEN (Quantity + @quantity) > p.StockQuantity THEN p.StockQuantity 
                                                ELSE (Quantity + @quantity) 
                                              END
                        FROM OrderDetail od
                        JOIN Product p ON od.ProductID = p.ProductID
                        WHERE od.OrderID = @orderID AND od.ProductID = @productID;

                        UPDATE OrderDetail
                        SET Quantity = @newQuantity
                        WHERE OrderID = @orderID AND ProductID = @productID;
                    END
                    ELSE
                    BEGIN
                        DECLARE @stockQuantity INT;
                        SELECT @stockQuantity = StockQuantity FROM Product WHERE ProductID = @productID;

                        IF @quantity > @stockQuantity
                        BEGIN
                            SET @quantity = @stockQuantity;
                        END

                        INSERT INTO OrderDetail (OrderID, ProductID, Quantity, Price)
                        VALUES (@orderID, @productID, @quantity, @price);

                        UPDATE Orders
                        SET TotalAmount = TotalAmount + (@quantity * @price)
                        WHERE OrderID = @orderID;
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
        request.input("orderID", mssql.Int, orderID);

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

  getOrdersByUserID: (userID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request.input("userID", mssql.VarChar, userID);

        const selectQuery = `            
                  SELECT o.OrderID, p.ProductID, p.ProductName, pc.ProductCategoryName, od.Quantity, p.Price as 'OldPrice', p.Image, od.Price as 'NewPrice', so.StatusOrderName, o.ReasonCancelContent, o.TotalAmount, o.OrderDate
                  FROM Orders o
                  JOIN StatusOrder s ON o.StatusOrderID = s.StatusOrderID
                  LEFT JOIN OrderDetail od ON o.OrderID = od.OrderID
                  LEFT JOIN Product p ON od.ProductID = p.ProductID
                  LEFT JOIN ProductCategory pc ON p.ProductCategoryID = pc.ProductCategoryID
                  LEFT JOIN StatusOrder so ON o.StatusOrderID = so.StatusOrderID
                  WHERE o.Status = 1 AND UserID =  @UserID
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
        request.input("userID", mssql.VarChar, userID);

        const selectQuery = `
                    SELECT TOP 1 * FROM Orders 
                    WHERE UserID = @userID AND status = 0
                `;

        request.query(selectQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result.recordset[0]);
        });
      });
    });
  },

  getApplicableVouchers: (userID, orderTotal, currentDate) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request
          .input("userID", mssql.VarChar, userID)
          .input("orderTotal", mssql.Float, orderTotal)
          .input("currentDate", mssql.DateTime, currentDate);

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
        request
          .input("orderID", mssql.Int, orderID)
          .input("voucherID", mssql.Int, voucherID);

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
  },

  getPreviousOrderAddress: (userID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request.input("userID", mssql.VarChar, userID);

        const selectQuery = `
                    SELECT TOP 1 Address
                    FROM Orders
                    WHERE UserID = @userID
                    ORDER BY OrderID DESC
                `;

        request.query(selectQuery, (err, result) => {
          if (err) return reject(err);
          resolve(
            result.recordset.length > 0 ? result.recordset[0].Address : null
          );
        });
      });
    });
  },
  getOrderDetailByOrderID: (orderID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();

        request.input("orderID", mssql.Int, orderID);

        const selectQuery = `
                    SELECT o.OrderID, od.Quantity, p.ProductID, p.ProductName, p.Image, p.Price
                    FROM Orders o
                    JOIN OrderDetail od ON o.OrderID = od.OrderID
                    JOIN Product p ON od.ProductID = p.ProductID
                    WHERE o.OrderID = @orderID
                `;

        request.query(selectQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result.recordset);
        });
      });
    });
  },

  changeQuantityOfProductInOrder: (orderID, productQuantities) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const transaction = new mssql.Transaction();
        transaction.begin((err) => {
          if (err) return reject(err);

          const request = new mssql.Request(transaction);
          // Step 1: Update quantities for selected products
          const updateQueries = productQuantities
            .map((pq) => {
              return `
              UPDATE OrderDetail
              SET Quantity = ${pq.quantity}
              WHERE OrderID = ${orderID} AND ProductID = '${pq.productID}';
            `;
            })
            .join("\n");

          // Step 2: Transfer unselected items to a new order
          const productIDs = productQuantities
            .map((pq) => `'${pq.productID}'`)
            .join(",");
          const transferUnselectedItemsQuery = `
            INSERT INTO Orders (orderDate, totalAmount, status, userID)
            SELECT orderDate, 0, 0, userID
            FROM Orders
            WHERE OrderID = ${orderID};

            DECLARE @newOrderID INT = SCOPE_IDENTITY();
    
            INSERT INTO OrderDetail (OrderID, ProductID, Quantity, Price)
            SELECT @newOrderID, ProductID, Quantity, Price
            FROM OrderDetail
            WHERE OrderID = ${orderID} AND ProductID NOT IN (${productIDs});
          `;

          // Step 3: Delete unselected items from the current order
          const deleteQuery = `
            DELETE FROM OrderDetail
            WHERE OrderID = ${orderID} AND ProductID NOT IN (${productIDs});
          `;

          // Combine all queries
          const finalQuery = `
            ${updateQueries}
            ${transferUnselectedItemsQuery}
            ${deleteQuery}
          `;
          // Execute the final query
          request.query(finalQuery, (err, result) => {
            if (err) {
              transaction.rollback();
              return reject(err);
            }

            transaction.commit((err) => {
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

  removeProductFromOrder: (orderID, productID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request
          .input("orderID", mssql.Int, orderID)
          .input("productID", mssql.VarChar, productID);

        const deleteQuery = `
                DELETE FROM OrderDetail
                WHERE OrderID = @orderID AND ProductID = @productID;

                IF NOT EXISTS (SELECT 1 FROM OrderDetail WHERE OrderID = @orderID)
                BEGIN
                    DELETE FROM Orders WHERE OrderID = @orderID;
                END
            `;

        request.query(deleteQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  transferOrderDetailsToNewOrder: (OrderID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request().input(
          "OrderID",
          mssql.Int,
          OrderID
        );

        const transferOrderDetailsToNewOrderQuery = `
          BEGIN TRANSACTION;
  
          INSERT INTO Orders (orderDate, totalAmount, status, userID)
          SELECT orderDate, 0, 0, userID
          FROM Orders
          WHERE OrderID = @OrderID;
  
          DECLARE @newOrderID INT = SCOPE_IDENTITY();
  
          UPDATE OrderDetail
          SET OrderID = @newOrderID
          WHERE OrderID = @OrderID;
  
          DELETE FROM Orders WHERE OrderID = @OrderID;
  
          COMMIT TRANSACTION;
        `;

        request.query(transferOrderDetailsToNewOrderQuery, (err, res) => {
          if (err) {
            return reject(err);
          }

          resolve({
            err: res.rowsAffected[0] > 0 ? 0 : 1,
          });
        });
      });
    });
  },
  refundQuantityOfProduct: async (OrderID) => {
    try {
      await mssql.connect(dbConfig);

      const transaction = new mssql.Transaction();
      await transaction.begin();

      const request = new mssql.Request(transaction);
      request.input("orderID", mssql.Int, OrderID);

      const getOrderDetailsQuery = `
        SELECT ProductID, Quantity
        FROM Orders o
        JOIN OrderDetail od ON o.OrderID = od.OrderID
        WHERE o.OrderID = @OrderID;
      `;
      const orderDetailsResult = await request.query(getOrderDetailsQuery);
      const orderDetails = orderDetailsResult.recordset;

      const updateProductQueries = orderDetails
        .map((detail) => {
          return `
            UPDATE Product
            SET StockQuantity = StockQuantity + ${detail.Quantity}
            WHERE ProductID = '${detail.ProductID}'
          `;
        })
        .join("; ");

      await request.query(updateProductQueries);

      await transaction.commit();
      return { err: 0 };
    } catch (err) {
      console.error(err);
      try {
        await transaction.rollback();
      } catch (rollbackError) {
        console.error("Rollback failed:", rollbackError);
      }
      throw err;
    }
  },
  checkoutOrder: async (orderID) => {
    try {
      await mssql.connect(dbConfig);

      const transaction = new mssql.Transaction();
      await transaction.begin();

      const request = new mssql.Request(transaction);
      request.input("orderID", mssql.Int, orderID);

      const checkStatusOrderQuery =
        "SELECT Status FROM Orders WHERE OrderID = @orderID";
      const checkStatusOrderResult = await request.query(checkStatusOrderQuery);

      if (!checkStatusOrderResult.recordset[0].Status) {
        const getOrderDetailsQuery = `
        SELECT ProductID, Quantity
        FROM OrderDetail
        WHERE OrderID = @orderID;
      `;
        const orderDetailsResult = await request.query(getOrderDetailsQuery);
        const orderDetails = orderDetailsResult.recordset;

        const updateProductQueries = orderDetails
          .map((detail) => {
            return `
            UPDATE Product
            SET StockQuantity = StockQuantity - ${detail.Quantity}
            WHERE ProductID = '${detail.ProductID}';
          `;
          })
          .join("; ");

        await request.query(updateProductQueries);

        const updateOrderQuery = `
        UPDATE Orders
        SET status = 1, StatusOrderID = 1, OrderDate = GETDATE()
        WHERE orderID = @orderID;
      `;
        await request.query(updateOrderQuery);

        await transaction.commit();
        return { err: 0 };
      } else {
        await transaction.rollback();
        return { err: 1, message: "Order status is already updated." };
      }
    } catch (err) {
      console.error(err);
      try {
        await transaction.rollback();
      } catch (rollbackError) {
        console.error("Rollback failed:", rollbackError);
      }
      throw err;
    }
  },

  updateStatusOrderID: (orderID, statusOrderID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);
        const request = new mssql.Request();
        request
          .input("orderID", mssql.Int, orderID)
          .input("statusOrderID", mssql.Int, statusOrderID);

        const updateQuery = `

                    UPDATE Orders
                    SET StatusOrderID = @statusOrderID
                    WHERE OrderID = @orderID;
                `;

        request.query(updateQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },
  updateStatusAfterDays: (days, oldStatus, newStatus) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request
          .input("days", mssql.Int, days)
          .input("oldStatus", mssql.Int, oldStatus)
          .input("newStatus", mssql.Int, newStatus);

        const updateQuery = `
                    UPDATE Orders
                    SET StatusOrderID = @newStatus
                    WHERE StatusOrderID = @oldStatus
                    AND DATEDIFF(day, OrderDate, GETDATE()) > @days;
                `;

        request.query(updateQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  getOrdersByStatusOrderID: (statusOrderID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request.input("statusOrderID", mssql.Int, statusOrderID);

        const selectQuery = `
                    SELECT o.*, sa.Receiver, sa.Address 
                    FROM Orders o
                    JOIN StatusOrder s ON o.StatusOrderID = s.StatusOrderID
                    LEFT JOIN ShippingAddress sa on o.ShippingAddressID = sa.ShippingAddressID
                    WHERE o.Status = 1 AND o.StatusOrderID = @statusOrderID
                `;

        request.query(selectQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result.recordset);
        });
      });
    });
  },

  addInfoCusToOrder: (receiver, phoneNumber, address, userID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request
          .input("receiver", mssql.NVarChar, receiver)
          .input("phoneNumber", mssql.VarChar, phoneNumber)
          .input("address", mssql.NVarChar, address)
          .input("userID", mssql.VarChar, userID);

        const insertQuery = `
                    INSERT INTO ShippingAddress (Receiver, PhoneNumber, Address, UserID)
                    VALUES (@receiver, @phoneNumber, @address, @userID);
    
                    DECLARE @shippingAddressID INT;
                    SET @shippingAddressID = SCOPE_IDENTITY();

                    UPDATE Orders
                    SET ShippingAddressID = @shippingAddressID
                    WHERE OrderID = (
                        SELECT TOP 1 OrderID
                        FROM Orders
                        WHERE UserID = @userID AND Status = 0 
                        ORDER BY OrderDate DESC
                    );
                `;

        request.query(insertQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  updateShippingAddressID: (orderID, shippingAddressID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request
          .input("orderID", mssql.Int, orderID)
          .input("shippingAddressID", mssql.Int, shippingAddressID);

        const updateQuery = `
                    UPDATE Orders
                    SET ShippingAddressID = @shippingAddressID
                    WHERE OrderID = @orderID;
                `;

        request.query(updateQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  getTodayRevenue: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        const query = `
          SELECT SUM(TotalAmount) AS revenue
          FROM Orders
          WHERE Status = 1
          AND CAST(OrderDate AS DATE) = CAST(GETUTCDATE() AS DATE);
        `;

        request.query(query, (err, result) => {
          if (err) return reject(err);
          resolve(result.recordset[0].revenue || 0);
        });
      });
    });
  },

  getRevenueLastSevenMonths: () => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        const query = `
          WITH MonthList AS (
            SELECT 
              DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1) AS MonthStart
            UNION ALL
            SELECT 
              DATEADD(MONTH, -1, MonthStart)
            FROM MonthList
            WHERE MonthStart > DATEADD(MONTH, -5, DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1))
          )
          SELECT 
            FORMAT(MonthStart, 'yyyy-MM') AS Month, 
            ISNULL(SUM(o.TotalAmount), 0) AS revenue
          FROM 
            MonthList ml
          LEFT JOIN 
            Orders o 
          ON 
            ml.MonthStart = DATEFROMPARTS(YEAR(o.OrderDate), MONTH(o.OrderDate), 1)
          AND 
            o.Status = 1
          GROUP BY 
            ml.MonthStart
          ORDER BY 
            ml.MonthStart;
        `;

        request.query(query, (err, result) => {
          if (err) return reject(err);
          resolve(result.recordset);
        });
      });
    });
  },

  getOrdersForUserByStatusOrderID: (userID, statusOrderID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request
          .input("userID", mssql.VarChar, userID)
          .input("statusOrderID", mssql.Int, statusOrderID);

        const selectQuery = `
                  SELECT o.OrderID, p.ProductID, p.ProductName, pc.ProductCategoryName, od.Quantity, p.Price, p.Image, od.Price, o.ReasonCancelContent
                  FROM Orders o
                  JOIN StatusOrder s ON o.StatusOrderID = s.StatusOrderID
                  LEFT JOIN OrderDetail od ON o.OrderID = od.OrderID
                  LEFT JOIN Product p ON od.ProductID = p.ProductID
                  LEFT JOIN ProductCategory pc ON p.ProductCategoryID = pc.ProductCategoryID
                  WHERE o.Status = 1 AND o.StatusOrderID = @statusOrderID AND UserID =  @userID
                `;

        request.query(selectQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result.recordset);
        });
      });
    });
  },

  cancelOrder: (orderID, reasonCancelContent) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request
          .input("orderId", mssql.Int, orderID)
          .input("reasonCancelContent", mssql.NVarChar, reasonCancelContent);

        const updateQuery = `
              UPDATE Orders
              SET ReasonCancelContent = @reasonCancelContent, StatusOrderID = 3
              WHERE OrderID = @orderId
          `;

        request.query(updateQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  getOrderById: (orderId) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request.input("orderId", mssql.Int, orderId);

        const selectQuery = `
                SELECT *
                FROM Orders
                WHERE OrderID = @orderId
            `;

        request.query(selectQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result.recordset[0]);
        });
      });
    });
  },

  updateTotalAmountOfOrder: (orderID, totalAmount) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request
          .input("orderID", mssql.Int, orderID)
          .input("totalAmount", mssql.Int, totalAmount);

        const selectQuery = `
              UPDATE Orders
              SET Orders.TotalAmount = @totalAmount
              WHERE OrderID = @orderID
                `;

        request.query(selectQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result.recordset);
        });
      });
    });
  },

  findReasonCancleOrderByUserID: (userID) => {
    return new Promise((resolve, reject) => {
      mssql.connect(dbConfig, function (err) {
        if (err) return reject(err);

        const request = new mssql.Request();
        request.input("userID", mssql.VarChar, userID);

        const selectQuery = `
                 SELECT OrderID, ReasonCancelContent
                 FROM Orders o
                 JOIN StatusOrder so ON o.StatusOrderID = so.StatusOrderID
                 WHERE UserID = @userID AND so.StatusOrderID =3
                `;

        request.query(selectQuery, (err, result) => {
          if (err) return reject(err);
          resolve(result.recordset);
        });
      });
    });
  },
};

module.exports = orderDAO;
