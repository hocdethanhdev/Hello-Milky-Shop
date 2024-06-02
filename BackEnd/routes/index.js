const user = require('./userRouter');
const product = require('./productRouter');
const auth = require('./authRouter');
const comment = require('./commentRouter');
const payment = require('./paymentRouter');

const initRouters = (app) => {

    app.use('/api/v1/user', user);

    app.use('/api/v1/product', product);

    app.use('/api/v1/auth', auth);

    app.use('/api/v1/comment', comment);

    app.use('/api/v1/payment', payment);

    return app;
};

module.exports = initRouters;
