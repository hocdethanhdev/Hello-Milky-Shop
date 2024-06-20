const voucherService = require("../service/voucherService");

const getAllVouchers = async (req, res) => {
    try {
        const obj = await voucherService.getAllVouchers();
        if (!obj)
            res.status(404).send('Not found')
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all voucher:", error);
        res.status(500).send("Internal Server Error");
    }
};

const addVoucher = async (req, res) => {
    try {
        const obj = await voucherService.addVoucher(req.body);
        res.status(200).json({ message: 'Voucher have been added successfully' });
    } catch (error) {
        console.error("Error while adding the voucher: ", error);
        res.status(500).send("Internal Server Error");
    }
};

const searchVoucherByDate = async (req, res) => {
    const { startDate, expiryDate } = req.query;
    try {
        const obj = await voucherService.searchVoucherByDate(startDate, expiryDate);
        res.send(obj);
    } catch (error) {
        console.error("Error while search the voucher by date: ", error);
        res.status(500).send("Internal Server Error");
    }
};

const updateVoucher = async (req, res) => {
    const voucherID = req.params.id;
    const voucherData = req.body;
    try {
        const updatedVoucher = await voucherService.updateVoucher(voucherID, voucherData);
        res.status(200).json({ message: 'Voucher have been update successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const saveVoucherForUser = async (req, res) => {
    try {
        const { userID, voucherID } = req.body;
        await voucherService.saveVoucherForUser(userID, voucherID);
        res.status(200).json({ message: 'Voucher saved for user successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeVoucherFromUser = async (req, res) => {
    try {
        const { userID, voucherID } = req.body;
        await voucherService.removeVoucherFromUser(userID, voucherID);
        res.status(200).json({ message: 'Voucher removed from user successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getVouchersByUserID = async (req, res) => {
    try {
        const userID = req.params.userID;
        const vouchers = await voucherService.getVouchersByUserID(userID);
        res.status(200).json(vouchers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getVouchersforUser = async (req, res) => {
    try {
        const obj = await voucherService.getVouchersforUser();
        if (!obj)
            res.status(404).send('Not found')
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all voucher:", error);
        res.status(500).send("Internal Server Error");
    }
};



module.exports = {
    getAllVouchers,
    addVoucher,
    searchVoucherByDate,
    updateVoucher,
    saveVoucherForUser,
    getVouchersByUserID,
    getVouchersforUser,
    removeVoucherFromUser,
};
