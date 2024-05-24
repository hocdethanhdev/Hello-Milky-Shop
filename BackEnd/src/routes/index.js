const user = require('./user');
const auth = require('./auth');

const initRouters = (app) => {

    app.use('/api/v1/user', user);

    app.use('/api/v1/auth', auth)

    app.get('/', (req, res) => {
        res.send('Server on');
    });

    return app;
};

module.exports = initRouters;
