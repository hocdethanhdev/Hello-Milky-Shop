const { deleteVoucher } = require("../dao/voucherDAO");
const voucherRepository = require("../repository/voucherRepository");

const voucherService = {
  getAllVouchers: async (req, res) => {
    return await voucherRepository.getAllVouchers();
  },

  deleteVoucher: async (VoucherID) => {
    return await voucherRepository.deleteVoucher(VoucherID);
  },

  getVouchersforUser: async (UserID) => {
    return await voucherRepository.getVouchersforUser(UserID);
  },

  addVoucher: (voucherObject) => {
    // Add validation if needed
    if (new Date(voucherObject.startDate) > new Date(voucherObject.expiryDate)) {
      throw new Error('Start date cannot be later than expiry date');
    }
    return voucherRepository.addVoucher(voucherObject);
  },

  searchVoucherByDate: (startDate, expiryDate) => {
    // Validate date range
    if (new Date(startDate) > new Date(expiryDate)) {
      throw new Error('Start date cannot be later than expiry date');
    }
    return voucherRepository.searchVoucherByDate(startDate, expiryDate);
  },

  updateVoucher: (voucherID, voucherObject) => {
    // Add validation if needed
    if (new Date(voucherObject.startDate) > new Date(voucherObject.expiryDate)) {
      throw new Error('Start date cannot be later than expiry date');
    }
    return voucherRepository.updateVoucher(voucherID, voucherObject);
  },


  saveVoucherForUser: async (userID, voucherID) => {
    // Check if the voucher is already saved for the user
    const existingVoucher = await voucherRepository.getVoucherForUser(userID, voucherID);
    if (existingVoucher) {
      throw { status: 400, message: 'User has already saved this voucher' };
    }
    // Proceed to save the voucher
    return await voucherRepository.saveVoucherForUser(userID, voucherID);
  },

  removeVoucherFromUser: async (userID, voucherID) => {
    return await voucherRepository.removeVoucherFromUser(userID, voucherID);
  },

  getVouchersByUserID: async (userID) => {
    return await voucherRepository.getVouchersByUserID(userID);
  },

  updateVoucherStatusAndRemoveFromUser: async (oldStatus, newStatus) => {
    try {
      await voucherRepository.updateVoucherStatusAndRemoveFromUser(oldStatus, newStatus);
    } catch (error) {
      throw new Error(`Error updating voucher status and removing from user: ${error.message}`);
    }
  },


}

module.exports = voucherService;
