const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const Voucher = require("../bo/voucher");

const voucherDAO = {
    findAllVouchers: () => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err, result) {
                const request = new mssql.Request();
                request.query(`SELECT * FROM Voucher;`,
                    (err, res) => {
                        if (err) reject(err);

                        resolve(res.recordset);
                    });
            });
        });
    },
    addVoucher: (voucherObject) => {
        const VoucherID = 1;
        const voucher = new Voucher(VoucherID, voucherObject.code, voucherObject.quantity, voucherObject.discountPercentage,
            voucherObject.maxDiscount, voucherObject.minDiscount, voucherObject.startDate, voucherObject.expiryDate, voucherObject.voucherName);

        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err, result) {
                if (err) return reject(err);

                const request = new mssql.Request();

                // Kiểm tra ngày bắt đầu và ngày kết thúc
                if (new Date(voucher.startDate) > new Date(voucher.expiryDate)) {
                    return reject({
                        status: 400,
                        message: 'Start date cannot be later than expiry date'
                    });
                }

                // Kiểm tra xem mã voucher đã tồn tại chưa
                request.input('code', mssql.VarChar, voucher.code);
                request.query('SELECT COUNT(*) AS count FROM Voucher WHERE Code = @code', (err, result) => {
                    if (err) return reject(err);

                    if (result.recordset[0].count > 0) {
                        return reject({
                            status: 400,
                            message: 'Voucher code already exists'
                        });
                    }


                    //  Thêm dữ liệu voucher vào cơ sở dữ liệu
                    const insertRequest = new mssql.Request();
                    insertRequest.input('code', mssql.VarChar, voucher.code)
                        .input('quantity', mssql.Int, voucher.quantity)
                        .input('discountPercentage', mssql.Float, voucher.discountPercentage)
                        .input('maxDiscount', mssql.Int, voucher.maxDiscount)
                        .input('minDiscount', mssql.Int, voucher.minDiscount)
                        .input('startDate', mssql.Date, voucher.startDate)
                        .input('expiryDate', mssql.Date, voucher.expiryDate)
                        .input('voucherName', mssql.VarChar, voucher.voucherName);
                    insertRequest.query(`
                        INSERT INTO Voucher(Code, Quantity, DiscountPercentage, MaxDiscount, MinDiscount, StartDate, ExpiryDate, VoucherName)
                        VALUES (@code, @quantity, @discountPercentage, @maxDiscount, @minDiscount, @StartDate, @expiryDate, @voucherName)
                    ;`,
                        (err, res) => {
                            if (err)
                                return reject(err);

                            resolve(res.recordset);
                        })
                });
            });
        });
    },

    searchVoucherByDate: (startDate, expiryDate) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err, result) {
                const request = new mssql.Request()
                    .input('startDate', mssql.Date, startDate)
                    .input('expiryDate', mssql.Date, expiryDate);

                const query = `
                SELECT * FROM Voucher 
                WHERE expiryDate BETWEEN @startDate AND @expiryDate
            `;

                request.query(query, (err, res) => {
                    if (err) reject(err);

                    const voucher = res.recordset;
                    if (!voucher[0]) resolve({
                        err: "Not found the voucher!"
                    })
                    resolve(voucher);
                })
            })
        })
    },
    updateVoucher: (voucherID, voucherObject) => {
        const voucher = new Voucher(voucherID, voucherObject.code, voucherObject.quantity, voucherObject.discountPercentage,
            voucherObject.maxDiscount, voucherObject.minDiscount, voucherObject.startDate, voucherObject.expiryDate, voucherObject.voucherName);
        return new Promise((resolve, reject) => {

            mssql.connect(dbConfig, function (err) {

                if (err) return reject(err);

                const request = new mssql.Request();

                // Kiểm tra ngày bắt đầu và ngày kết thúc
                if (new Date(voucher.startDate) > new Date(voucher.expiryDate)) {
                    return reject({
                        status: 400,
                        message: 'Start date cannot be later than expiry date'
                    });
                }

                // Kiểm tra xem mã voucher đã tồn tại chưa
                request.input('code', mssql.VarChar, voucher.code);

                request.query('SELECT COUNT(*) AS count FROM Voucher WHERE Code = @code', (err, result) => {
                    if (err) return reject(err);

                    if (result.recordset[0].count > 0) {
                        return reject({
                            status: 400,
                            message: 'Voucher code already exists!!'
                        });
                    };
                    request
                        .input('voucherID', voucherID)
                        .input('quantity', mssql.Int, voucher.quantity)
                        .input('discountPercentage', mssql.Float, voucher.discountPercentage)
                        .input('maxDiscount', mssql.Int, voucher.maxDiscount)
                        .input('minDiscount', mssql.Int, voucher.minDiscount)
                        .input('startDate', mssql.Date, voucher.startDate)
                        .input('expiryDate', mssql.Date, voucher.expiryDate)
                        .input('voucherName', mssql.VarChar, voucher.voucherName);


                    const updateQuery = `
                    UPDATE Voucher
                    SET 
                        code = @code,
                        quantity = @quantity,
                        discountPercentage = @discountPercentage,
                        minDiscount = @minDiscount,
                        maxDiscount = @maxDiscount,
                        startDate = @startDate,
                        expiryDate = @expiryDate,
                        voucherName = @voucherName
                    WHERE voucherID = @voucherID
                `;
                    request.query(updateQuery, (err, res) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(res);
                    })

                })


            })
        })

    },

    saveVoucherForUser: (userID, voucherID) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('userID', mssql.VarChar, userID)
                    .input('voucherID', mssql.Int, voucherID);

                const insertQuery = `
                    INSERT INTO UserVoucher (UserID, VoucherID)
                    VALUES (@userID, @voucherID);
                `;

                request.query(insertQuery, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
        });
    },

    getVouchersByUserID: (userID) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('userID', mssql.VarChar, userID);

                const query = `
                    SELECT * FROM UserVoucher WHERE UserID = @userID;
                `;

                request.query(query, (err, result) => {
                    if (err) return reject(err);
                    resolve(result.recordset);
                });
            });
        });
    }

};

module.exports = voucherDAO;
