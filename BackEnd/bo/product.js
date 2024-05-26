class Product {
  constructor(
    ProductID,
    ProductName,
    Description,
    Price,
    StockQuantity,
    Image,
    ExpirationDate,
    ManufacturingDate,
    BrandName,
    ProductCategoryName,
    Status
  ) {
    this.ProductID = ProductID;
    this.ProductName = ProductName;
    this.Description = Description;
    this.Price = Price;
    this.StockQuantity = StockQuantity;
    this.Image = Image;
    this.ExpirationDate = ExpirationDate;
    this.ManufacturingDate = ManufacturingDate;
    this.ProductCategoryName = ProductCategoryName;
    this.BrandName = BrandName;
    this.Status = Status;
  }
}
module.exports = Product;
