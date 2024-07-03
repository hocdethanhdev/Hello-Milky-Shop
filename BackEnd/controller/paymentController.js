const paymentService = require("../service/paymentService");
require("dotenv").config();
const moment = require("moment");
const crypto = require("crypto");
const { Buffer } = require("buffer"); // Explicitly import Buffer from Node.js buffer module

const bankCode = "VNBANK";

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;

  // Loop through keys of the object
  for (key in obj) {
    // Check if the key exists directly on the object
    if (Object.hasOwnProperty.call(obj, key)) {
      str.push(encodeURIComponent(key));
    }
  }

  str.sort();

  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }

  return sorted;
}

const createVNPayPayment = async (req, res) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";

  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let tmnCode = process.env.VNPAY_TMN_CODE;
  let secretKey = process.env.VNPAY_HASH_SECRET;
  let vnpUrl = process.env.VNPAY_URL;
  let returnUrl = process.env.VNPAY_RETURN_URL;
  let orderId = req.body.orderID;

  let amount = req.body.amount;

  let locale = req.body.language;
  if (locale === null || locale === "") {
    locale = "vn";
  }

  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex"); // Ensure Buffer is imported correctly

  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  res.json({ url: vnpUrl });
};

const vnpayReturn = async (req, res, next) => {
  let vnp_Params = req.query;

  let secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  let secretKey = process.env.VNPAY_HASH_SECRET;

  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    try {
      // Kiểm tra đơn hàng trong database
      const order = await paymentService.getOrderByID(vnp_Params["vnp_TxnRef"]);

      if (order.message === "false") {
        req.result = { message: "Order not found", status: 0, code: "01" };
        next();
      }

      const paymentStatus = vnp_Params["vnp_ResponseCode"] === "00" ? 1 : 0;
      if (paymentStatus === 1) {
        const PayMethod = "VNPay";
        let date = new Date();
        let PayTime = moment(date).format("YYYY-MM-DD HH:mm:ss").toString();
        await paymentService.createPayment(
          PayMethod,
          vnp_Params["vnp_TransactionNo"],
          vnp_Params["vnp_CardType"],
          vnp_Params["vnp_OrderInfo"],
          vnp_Params["vnp_Amount"] / 100,
          PayTime,
          vnp_Params["vnp_TxnRef"]
        );
      }

      req.result = {
        orderID: vnp_Params["vnp_TxnRef"],
        status: paymentStatus,
        code: vnp_Params["vnp_ResponseCode"],
      };

      next();
    } catch (err) {
      console.error(err);
      req.result = {
        message: "Internal Server Error",
        code: "99",
      };
      next();
    }
  } else {
    req.result = {
      message: "Invalid signature",
      code: "97",
    };
    next();
  }
};

module.exports = {
  createVNPayPayment,
  vnpayReturn,
};
