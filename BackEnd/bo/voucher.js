class Voucher {
    constructor(voucherID, code, quantity, discountPercentage,
        maxDiscount, minDiscount, startDate, expiryDate, voucherName) {
        this.voucherID = voucherID;
        this.code = code;
        this.quantity = quantity;
        this.discountPercentage = discountPercentage;
        this.maxDiscount = maxDiscount;
        this.minDiscount = minDiscount;
        this.startDate = startDate;
        this.expiryDate = expiryDate;
        this.voucherName = voucherName;
    }
}
module.exports = Voucher;