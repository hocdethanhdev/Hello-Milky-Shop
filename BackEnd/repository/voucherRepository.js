const voucherDAO = require("../dao/voucherDAO");

const voucherRepository = {
    getAllVouchers: async () => {
        return await voucherDAO.findAllVouchers();
    },
    addVoucher: async (voucher) => {
        return await voucherDAO.addVoucher(voucher);
    },
    searchVoucherByDate: async (startDate, expiryDate) => {
        return await voucherDAO.searchVoucherByDate(startDate, expiryDate);
    },
    updateVoucher: async (voucherID, voucherObject) => {
        return await voucherDAO.updateVoucher(voucherID, voucherObject);
    },
    saveVoucherForUser: async (userID, voucherID) => {
        return await voucherDAO.saveVoucherForUser(userID, voucherID);
    },
    getVouchersByUserID: async (userID) => {
        return await voucherDAO.getVouchersByUserID(userID);
    }

}

module.exports = voucherRepository;