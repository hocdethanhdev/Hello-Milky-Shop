const mssql = require("mssql");
const dbConfig = require("../config/db.config");
const Promotion = require("../bo/promotion");

const promotionDAO = {
    getAllPromotions: () => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err, result) {
                const request = new mssql.Request();
                request.query(`SELECT * FROM Promotion;`,
                    (err, res) => {
                        if (err) reject(err);

                        resolve(res.recordset);
                    });
            });
        });
    },

    addPromotion: (promotionObject) => {
        const promotion = new Promotion(
            null,
            promotionObject.promotionName,
            promotionObject.description,
            promotionObject.discountPercentage,
            promotionObject.startDate,
            promotionObject.endDate
        );

        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();

                // Kiểm tra ngày bắt đầu và ngày kết thúc
                if (new Date(promotion.startDate) > new Date(promotion.endDate)) {
                    return reject({
                        status: 400,
                        message: 'Start date cannot be later than expiry date'
                    });
                }

                request
                    .input('promotionName', mssql.VarChar, promotion.promotionName)
                    .input('description', mssql.VarChar, promotion.description)
                    .input('discountPercentage', mssql.Float, promotion.discountPercentage)
                    .input('startDate', mssql.DateTime, promotion.startDate)
                    .input('endDate', mssql.DateTime, promotion.endDate);

                const insertQuery = `
                    INSERT INTO Promotion (PromotionName, Description, DiscountPercentage, StartDate, EndDate)
                    VALUES (@promotionName, @description, @discountPercentage, @startDate, @endDate)
                `;

                request.query(insertQuery, (err, res) => {
                    if (err) return reject(err);
                    resolve(res);
                });
            });
        });
    },

    updatePromotion: (promotionID, promotionObject) => {
        const promotion = new Promotion(
            promotionID,
            promotionObject.promotionName,
            promotionObject.description,
            promotionObject.discountPercentage,
            promotionObject.startDate,
            promotionObject.endDate
        );

        return new Promise((resolve, reject) => {

            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);


                const request = new mssql.Request();

                // Kiểm tra ngày bắt đầu và ngày kết thúc
                if (new Date(promotion.startDate) > new Date(promotion.endDate)) {
                    return reject({
                        status: 400,
                        message: 'Start date cannot be later than end date'
                    });
                }

                request
                    .input('promotionID', promotionID)
                    .input('promotionName', mssql.VarChar, promotion.promotionName)
                    .input('description', mssql.VarChar, promotion.description)
                    .input('discountPercentage', mssql.Float, promotion.discountPercentage)
                    .input('startDate', mssql.DateTime, promotion.startDate)
                    .input('endDate', mssql.DateTime, promotion.endDate);

                const updateQuery = `
                    UPDATE Promotion
                    SET 
                        PromotionName = @promotionName,
                        Description = @description,
                        DiscountPercentage = @discountPercentage,
                        StartDate = @startDate,
                        EndDate = @endDate
                    WHERE PromotionID = @promotionID
                `;

                request.query(updateQuery, (err, res) => {
                    if (err) return reject(err);
                    resolve(res);
                });
            });
        });
    },

    searchPromotionByName: (promotionName) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('promotionName', mssql.VarChar, `%${promotionName}%`);

                const searchQuery = `
                    SELECT * FROM Promotion WHERE PromotionName LIKE @promotionName
                `;

                request.query(searchQuery, (err, res) => {
                    if (err) return reject(err);
                    resolve(res.recordset);

                    const promotion = res.recordset;
                    if (!promotion[0]) resolve({
                        err: "Not found the promotion!"
                    })
                });
            });
        });
    },

    getProductsApplyAnPromotion: (promotionID) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('promotionID', promotionID);

                const searchQuery = `
                    SELECT p.* 
                    FROM Product p
                    INNER JOIN ProductPromotionList pp ON p.ProductID = pp.ProductID
                    WHERE pp.PromotionID = @promotionID
                `;

                request.query(searchQuery, (err, res) => {
                    if (err) return reject(err);
                    resolve(res.recordset);
                });
            });
        });
    },

    applyPromotionToProduct: (productID, promotionID) => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                request.input('productID', mssql.VarChar, productID)
                    .input('promotionID', mssql.Int, promotionID);

                const insertQuery = `
                    INSERT INTO ProductPromotionList (ProductID, PromotionID)
                    VALUES (@productID, @promotionID)
                `;

                request.query(insertQuery, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
        });
    },
    getCurrentProductsHavingPromotion: () => {
        return new Promise((resolve, reject) => {
            mssql.connect(dbConfig, function (err) {
                if (err) return reject(err);

                const request = new mssql.Request();
                const currentDate = new Date();

                const searchQuery = `
                    SELECT p.* , pp.PriceAfterDiscount
                    FROM Product p
                    INNER JOIN ProductPromotionList pp ON p.ProductID = pp.ProductID
                    INNER JOIN Promotion promo ON pp.PromotionID = promo.PromotionID
                    WHERE promo.StartDate <= @currentDate AND promo.EndDate >= @currentDate
                `;

                request.input('currentDate', mssql.DateTime, currentDate);

                request.query(searchQuery, (err, res) => {
                    if (err) return reject(err);
                    resolve(res.recordset);
                });
            });
        });
    },


};

module.exports = promotionDAO;
