const express = require("express");
const cors = require("cors");
require("dotenv").config();
const initRouters = require("./src/routes");
const bodyParser = require('body-parser');
const { connectionDatabase, closeConnection } = require("./connection_database"); // Import hàm kết nối

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL, // URL của client
    methods: ["GET", "POST", "PUT", "DELETE"], // Những phương thức được phép truy cập
  })
);

// CRUD
app.use(express.json()); // Đọc dữ liệu (JSON) từ client gửi lên
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // Đọc dữ liệu dạng x-www-form-urlencoded

// Kết nối đến cơ sở dữ liệu trước khi xử lý bất kỳ yêu cầu nào
connectionDatabase()
  .then(() => {
    initRouters(app);

    const PORT = process.env.PORT || 8888;
    const listener = app.listen(PORT, () => {
      console.log("Server is running at " + listener.address().port);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
  closeConnection()

//controllers: thanh điều hướng, nhận yêu cầu API gửi lên rồi đưa cho service. Sau khi nhận respone từ  services sẽ đem đưa cho API. (điều hướng)

//services: lấy yêu cầu từ controllers, xử lý, lấy data... rồi đưa lại cho controllers. (xử lý)

//routes: định nghĩa API

//mỗi folder có 1 file index.js, khi import 1 folder thì sẽ tìm file index.js

//model: db
