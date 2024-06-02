const paymentDAO = require("../dao/paymentDAO");

const paymentRepository = {
  createPayment: async (PayMethod, TradingCode, CardType, PayDetail, Amount, PayTime) => {
    return await paymentDAO.createPayment(PayMethod, TradingCode, CardType, PayDetail, Amount, PayTime);
  }
};

module.exports = paymentRepository;
