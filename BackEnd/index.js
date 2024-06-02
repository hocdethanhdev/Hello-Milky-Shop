const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const initRouters = require("./routes");
require('./config/passport')

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL, 
    methods: ["GET", "POST", "PUT", "DELETE"], 
  })
);

app.use(session({
  secret: 'HelloMilkyShop', //secret key: dat gi cung dc
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } //dung https thi dat true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initRouters(app);

const PORT = process.env.PORT || 8888;
const listener = app.listen(PORT, () => {
  console.log("Server is running at " + listener.address().port);
});
