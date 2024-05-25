const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./routes/userRouter')(app)
app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});