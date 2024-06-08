const voucherRepository = require("../repository/voucherRepository");

const voucherService = {
  getAllVouchers: async (req, res) => {
    return await voucherRepository.getAllVouchers();
  },

  getVouchersforUser: async (req, res) => {
    return await voucherRepository.getVouchersforUser();
  },

  addVoucher: async (voucher) => {
    return await voucherRepository.addVoucher(voucher);
  },

  searchVoucherByDate: async (startDate, expiryDate) => {
    return await voucherRepository.searchVoucherByDate(startDate, expiryDate);
  },

  updateVoucher: async (voucherID, voucherObject) => {
    return await voucherRepository.updateVoucher(voucherID, voucherObject);
  },

  saveVoucherForUser: async (userID, voucherID) => {
    return await voucherRepository.saveVoucherForUser(userID, voucherID);
  },

  getVouchersByUserID: async (userID) => {
    return await voucherRepository.getVouchersByUserID(userID);
  }


}

module.exports = voucherService;
