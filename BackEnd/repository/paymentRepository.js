const paymentDAO = require("../dao/paymentDAO");

const paymentRepository = {
  createPayment: async (PayMethod, TradingCode, CardType, PayDetail, Amount, PayTime, OrderID) => {
    return await paymentDAO.createPayment(PayMethod, TradingCode, CardType, PayDetail, Amount, PayTime, OrderID);
  }
};

module.exports = paymentRepository;
