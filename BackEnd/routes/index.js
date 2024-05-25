const user = require('./userRouter');

const initRouters = (app) => {

    app.use('/api/v1/user', user);

    app.get('/', (req, res) => {
        res.send('Server on');
    });

    return app;
};

module.exports = initRouters;
