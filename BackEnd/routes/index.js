const article = require('./articleRouter');
const user = require('./userRouter');
const chat = require('./chatRouter');

const initRouters = (app) => {



    app.use('/api/v1/article', article);
    app.use('/api/v1/user', user);
    app.use('/api/v1/chat', chat)

    return app;
};

module.exports = initRouters;