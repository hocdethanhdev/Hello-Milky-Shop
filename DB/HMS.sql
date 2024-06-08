use master

drop database HelloMilkyShop

create database HelloMilkyShop

use HelloMilkyShop


CREATE TABLE Role (
RoleID int IDENTITY NOT NULL, 
RoleName varchar(10) NOT NULL, 
PRIMARY KEY (RoleID));

CREATE TABLE Users (
UserID varchar(8) NOT NULL, 
UserName nvarchar(50) NULL, 
PhoneNumber varchar(15) NULL, 
Email varchar(30) NULL, 
Password varchar(100) NULL, 
Status bit default 1,
RoleID int foreign key references Role(RoleID) default 3, 
PRIMARY KEY (UserID));

CREATE TABLE Chat (
ChatID int IDENTITY NOT NULL,  
MemberID varchar(8) foreign key references Users(UserID),
StaffID varchar(8) foreign key references Users(UserID), 
PRIMARY KEY (ChatID));

create table Message (
MessageID int IDENTITY NOT NULL,
Message nvarchar(750),
TimeStamp date default getdate(),
ChatID int foreign key references Chat(ChatID)
)

CREATE TABLE ArticleCategory (
ArticleCategoryID int IDENTITY NOT NULL, 
ArticleCategoryName nvarchar(255) NULL, 
PRIMARY KEY (ArticleCategoryID));

CREATE TABLE Article (
ArticleID int IDENTITY NOT NULL, 
Title nvarchar(150) NOT NULL,
HeaderImage varchar(50),
Content nvarchar(4000) NOT NULL, 
PublishDate date default getdate() NOT NULL, 
AuthorID varchar(8) foreign key references Users(UserID), 
ArticleCategoryID int foreign key references ArticleCategory(ArticleCategoryID), 
PRIMARY KEY (ArticleID));

CREATE TABLE Brand (
BrandID int identity NOT NULL, 
BrandName nvarchar(255) NULL, 
PRIMARY KEY (BrandID));

CREATE TABLE ProductCategory (
ProductCategoryID int IDENTITY NOT NULL, 
ProductCategoryName nvarchar(255) NULL, 
PRIMARY KEY (ProductCategoryID));

CREATE TABLE Product (
ProductID varchar(6) NOT NULL, 
ProductName nvarchar(100) NULL, 
Description nvarchar(3000) NULL, 
Price int NULL, 
StockQuantity int NULL, 
Image varchar(255) NULL, 
ExpirationDate date NULL, 
ManufacturingDate date NULL, 
Status bit default 1,
BrandID int foreign key references Brand(BrandID),
ProductCategoryID int foreign key references ProductCategory(ProductCategoryID), 
PRIMARY KEY (ProductID));

CREATE TABLE Comment (
CommentID int IDENTITY NOT NULL, 
Description nvarchar(3000) NULL, 
CommentDate date default getdate() NULL, 
Rep nvarchar(3000) null,
ProductID varchar(6) foreign key references Product(ProductID),
UserID varchar(8) foreign key references Users(UserID), 
PRIMARY KEY (CommentID));

CREATE TABLE Payment (
PaymentID int IDENTITY NOT NULL, 
PayMethod varchar(50) NOT NULL, 
TradingCode varchar(20) NULL,
CardType varchar(10)Null,
PayDetail varchar(255) null,
Amount int,
PayTime Datetime default getdate() NOT NULL, 
OrderID int foreign key references Orders(OrderID),
PRIMARY KEY (PaymentID));

CREATE TABLE Orders (
OrderID int IDENTITY NOT NULL, 
OrderDate date NULL, 
TotalAmount int NULL, 
Status bit,
Address nvarchar(255) NULL, 
UserID varchar(8) foreign key references Users(UserID), 
PRIMARY KEY (OrderID));

CREATE TABLE Voucher (
VoucherID int IDENTITY NOT NULL, 
Quantity int NOT NULL,
DiscountPercentage float NOT NULL, 
MaxDiscount int NOT NULL, 
MinDiscount int NOT NULL, 
Status bit default 1,
StartDate date not null,
ExpiryDate date NOT NULL, 
VoucherName nvarchar(30) NOT NULL, 
PRIMARY KEY (VoucherID));

CREATE TABLE UserVoucher (
UserVoucherID int IDENTITY primary key,
UserID varchar(8) foreign key references Users(UserID), 
VoucherID int foreign key references Voucher(VoucherID)); 

CREATE TABLE VoucherOrder (
VoucherOrderID int IDENTITY primary key,
VoucherID int foreign key references Voucher(VoucherID), 
OrderID int foreign key references Orders(OrderID)); 

CREATE TABLE OrderDetail (
OrderDetailID int IDENTITY NOT NULL, 
Quantity int NOT NULL, 
Price int NOT NULL, 
OrderID int foreign key references Orders(OrderID), 
ProductID varchar(6) foreign key references Product(ProductID), 
PRIMARY KEY (OrderDetailID));

CREATE TABLE Promotion (
PromotionID int IDENTITY NOT NULL,
PromotionName nvarchar(255) Null,
Description nvarchar(3000)null,
DiscountPercentage Float NOT NULL,
StartDate date NOT NULL, 
EndDate date NOT NULL, 
PRIMARY KEY (PromotionID));

CREATE TABLE ProductPromotionList (
ProductPromotionID int IDENTITY NOT NULL, 
PriceAfterDiscount int,
ProductID varchar(6) NOT NULL foreign key references Product(ProductID), 
PromotionID int NOT NULL foreign key references Promotion(PromotionID), 
PRIMARY KEY (ProductPromotionID));

CREATE TABLE City (
    ID INT IDENTITY PRIMARY KEY,
    CityName VARCHAR(100) NOT NULL
);

CREATE TABLE District (
    ID INT IDENTITY PRIMARY KEY,
    DistrictName VARCHAR(100) NOT NULL,
    CityID INT FOREIGN KEY REFERENCES City(ID)
);

go
create trigger trg_PriceAfterDiscount
ON ProductPromotionList
After insert
as
	DECLARE @PromotionID int
	SELECT @PromotionID = PromotionID
	FROM inserted

	DECLARe @DiscountPercentage float
	SELECT @DiscountPercentage = DiscountPercentage
	FROM Promotion
	WHERE @PromotionID = PromotionID

	DEClARE @ProductID varchar(6)
	SELECT @ProductID = ProductID
	FROM inserted

	DECLARE @Price int
	SELECT @Price = Price
	FROM Product
	WHERE ProductID = @ProductID

	Update ProductPromotionList
	SET PriceAfterDiscount = @Price - @Price * @DiscountPercentage /100
	WHERE ProductID = @ProductID
go
CREATE TRIGGER trg_InsertUserID
ON Users
AFTER INSERT
AS
	DECLARE @UserIDInsert varchar(8);
	SELECT @UserIDInsert = UserID
    FROM inserted;
    -- Chuỗi UserID tự tăng với chữ cái và số
    DECLARE @prefix NVARCHAR(1); -- Chữ cái đầu tiên của UserID
    DECLARE @nextID INT; -- Số tự tăng

    -- Lấy RoleID của bản ghi vừa chèn
    SET @prefix = (SELECT CASE WHEN RoleID = 1 THEN 'A' WHEN RoleID = 2 THEN 'S' ELSE 'M' END FROM inserted);

    -- Lấy số tự tăng cho UserID
    SET @nextID = (SELECT ISNULL(MAX(CAST(SUBSTRING(UserID, 2, 7) AS INT)), 0) + 1 FROM Users WHERE SUBSTRING(UserID, 1, 1) = @prefix);

    -- Tạo UserID
    DECLARE @userID NVARCHAR(8);
    SET @userID = @prefix + RIGHT('0000000' + CAST(@nextID AS NVARCHAR(7)), 7);

    -- Cập nhật UserID cho bản ghi vừa chèn
    UPDATE Users SET UserID = @userID WHERE UserID = @UserIDInsert;
go
CREATE TRIGGER trg_generate_ProductID
ON Product
AFTER INSERT
AS
    DECLARE @ProductIDPrefix NVARCHAR(2);
    DECLARE @NextID INT;
    DECLARE @ProductCategoryID INT;

    -- Lấy dữ liệu vừa mới được chèn vào
    SELECT @ProductCategoryID = ProductCategoryID
    FROM inserted;

    -- Chọn prefix cho ProductID dựa trên ProductCategoryID
    IF @ProductCategoryID = 1
        SET @ProductIDPrefix = 'SM';
    ELSE IF @ProductCategoryID = 2
        SET @ProductIDPrefix = 'SE';
    
	-- Tìm số lượng sản phẩm hiện có trong cùng loại
    SET @NextID = (SELECT ISNULL(MAX(CAST(SUBSTRING(ProductID, 3, 4) AS INT)), 0) + 1 FROM Product WHERE SUBSTRING(ProductID, 1,2) = @ProductIDPrefix);

    -- Đảm bảo rằng NextID sẽ có đúng 4 chữ số
    DECLARE @FormattedNextID VARCHAR(4);
    SET @FormattedNextID = RIGHT('000' + CAST(@NextID AS VARCHAR(4)), 4);

    -- Tạo ProductID mới và cập nhật vào bảng Product
    DECLARE @NewProductID VARCHAR(6);
    SET @NewProductID = @ProductIDPrefix + @FormattedNextID;

-- Kiểm tra xem ProductID mới đã tồn tại hay chưa
	IF NOT EXISTS (SELECT 1 FROM Product WHERE ProductID = @NewProductID)
	BEGIN
		UPDATE p
		SET ProductID = @NewProductID
		FROM inserted i
		INNER JOIN Product p ON i.ProductID = p.ProductID
		WHERE p.ProductID = i.ProductID;
	END

CREATE TRIGGER trg_Quantity_In_Stock 
ON Payment
AFTER UPDATE
AS
BEGIN
    DECLARE @OrderID int;

    -- Retrieve OrderID from the inserted table
    SELECT @OrderID = i.OrderID
    FROM inserted i;

    -- Update the Product table to reflect the new stock quantity
    UPDATE p
    SET p.StockQuantity = p.StockQuantity - od.Quantity
    FROM Product p
    JOIN OrderDetail od ON p.ProductID = od.ProductID
    WHERE od.OrderID = @OrderID;
END;
