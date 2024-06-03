const voucher = require('./voucherRouter');
const promotion = require('./promotionRouter');
const order = require('./orderRouter');

const initRouters = (app) => {

    app.use('/api/v1/voucher', voucher);

    app.use('/api/v1/promotion', promotion);

    app.use('/api/v1/order', order)

    app.get('/', (req, res) => {
        res.send('Server on');
    });

    return app;
};

module.exports = initRouters;
