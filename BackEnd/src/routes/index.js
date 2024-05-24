const user = require('./user');
const auth = require('./auth');
const product = require('./product');

const initRouters = (app) => {

    app.use('/api/v1/user', user);

    app.use('/api/v1/auth', auth);

    app.use('/api/v1/product', product);

    app.get('/', (req, res) => {
        res.send('Server on');
    });

    return app;
};

module.exports = initRouters;
