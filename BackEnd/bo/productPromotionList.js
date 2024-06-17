class ProductPromotionList{
    constructor(ProductPromotionID, PriceAfterDiscount, ProductID, PromotionID){
        this.ProductPromotionID = ProductPromotionID;
        this.PriceAfterDiscount = PriceAfterDiscount;
        this.ProductID = ProductID;
        this.PromotionID = PromotionID;
    }
}
module.exports = ProductPromotionList;