class Promotion {
    constructor(promotionID, promotionName, description, discountPercentage, image, startDate, endDate) {
        this.promotionID = promotionID;
        this.promotionName = promotionName;
        this.description = description;
        this.discountPercentage = discountPercentage;
        this.image = image;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

module.exports = Promotion;