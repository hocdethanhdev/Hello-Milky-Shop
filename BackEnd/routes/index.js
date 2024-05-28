const user = require('./userRouter');
const product = require('./productRouter');
const auth = require('./authRouter');

const initRouters = (app) => {

    app.use('/api/v1/user', user);

    app.use('/api/v1/product', product);

    app.use('/api/v1/auth', auth);

    return app;
};

module.exports = initRouters;
