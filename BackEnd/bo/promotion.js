class Promotion {
    constructor(promotionID, promotionName, description, discountPercentage, image, startDate, endDate, status) {
        this.promotionID = promotionID;
        this.promotionName = promotionName;
        this.description = description;
        this.discountPercentage = discountPercentage;
        this.image = image;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
    }
}

module.exports = Promotion;