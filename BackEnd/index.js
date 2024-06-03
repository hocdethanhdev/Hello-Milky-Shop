const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const initRouters = require("./routes/index");
const app = express();
const io = require('socket.io')

app.use(
  cors({
    origin: process.env.CLIENT_URL, 
    methods: ["GET", "POST", "PUT", "DELETE"], 
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initRouters(app);

const PORT = process.env.PORT || 8888;
const listener = app.listen(PORT, () => {
  console.log("Server is running at " + listener.address().port);
});

