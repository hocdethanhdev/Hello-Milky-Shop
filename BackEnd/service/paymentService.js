const paymentDAO = require("../dao/paymentDAO");
const paymentRepository = require("../repository/paymentRepository")

const getOrderByID = async (order_id) => {
  const payment = await paymentDAO.getOrderByID(order_id);
  if (payment.err) {
    return { err: payment.err };
  }
  return payment;
};

const createPayment = async (PayMethod, TradingCode, CardType, PayDetail, Amount, PayTime, OrderID) => {
  const payment = await paymentRepository.createPayment(PayMethod, TradingCode, CardType, PayDetail, Amount, PayTime, OrderID);
  if (payment.err) {
    return { err: payment.err };
  }
  return payment;
};

module.exports = {
  getOrderByID,
  createPayment,
};
