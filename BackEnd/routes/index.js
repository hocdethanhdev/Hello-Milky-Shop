const user = require('./userRouter');
const product = require('./productRouter');

const initRouters = (app) => {

    app.use('/api/v1/user', user);

    app.use('/api/v1/product', product);

    return app;
};

module.exports = initRouters;
