const article = require("./articleRouter");
const user = require("./userRouter");
const product = require("./productRouter");
const auth = require("./authRouter");
const comment = require("./commentRouter");
const payment = require("./paymentRouter");
const chat = require("./chatRouter");

const initRouters = (app) => {
  app.use("/api/v1/product", product);

  app.use("/api/v1/auth", auth);

  app.use("/api/v1/comment", comment);

  app.use("/api/v1/payment", payment);

  app.use("/api/v1/article", article);

  app.use("/api/v1/user", user);
  
  app.use("/api/v1/chat", chat);

  return app;
};

module.exports = initRouters;
