use HelloMilkyShop

INSERT INTO Role VALUES ('Admin'), ('Staff'), ('Member')

INSERT INTO Brand (BrandName) VALUES 
('Anmum'),
('Enfamama A+'),
('Similac Mom'),
('Similac'),
('Enfamil'),
('Aptamil'),
('Friso'),
('Dielac Mama'),
('Nestle Mom & Me'),
('Morinaga'),
('NutiFood'),
('Abbott');

insert into ProductCategory values (N'Sữa cho mẹ bầu'), (N'Sữa cho em bé')

INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Anmum Materna', N'Nutritional milk for pregnant and breastfeeding mothers', 350000, 50, 'anmum_materna.jpg', '2025-12-31', '2024-01-01', 1, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P002', N'Enfamama A+', N'Milk powder with DHA and calcium for mothers', 320000, 60, 'enfamama.jpg', '2025-12-31', '2024-01-01', 2, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P003', N'Similac Mom', N'Milk powder with essential nutrients for mothers', 370000, 40, 'similac_mom.jpg', '2025-12-31', '2024-01-01', 3, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P007', N'Friso Mum Gold', N'Milk formula with prebiotics for pregnant mothers', 340000, 30, 'friso_mum_gold.jpg', '2025-12-31', '2024-01-01', 7, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P008', N'Dielac Mama Gold', N'Milk powder with DHA for pregnant and lactating mothers', 300000, 45, 'dielac_mama_gold.jpg', '2025-12-31', '2024-01-01', 8, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P009', N'Nestle Mom & Me', N'Milk for pregnant and breastfeeding mothers', 360000, 55, 'nestle_mom_me.jpg', '2025-12-31', '2024-01-01', 9, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P010', N'Morinaga Mama', N'Japanese milk for pregnant women', 380000, 50, 'morinaga_mama.jpg', '2025-12-31', '2024-01-01', 10, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P011', N'NutiFood Nuti IQ Mum', N'Nutritional milk for pregnant women', 310000, 35, 'nutifood_nuti_iq_mum.jpg', '2025-12-31', '2024-01-01', 11, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P012', N'Abbott Similac Mom', N'Milk powder with essential nutrients for mothers', 370000, 40, 'abbott_similac_mom.jpg', '2025-12-31', '2024-01-01', 12, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P013', N'Meiji Mama', N'Japanese nutritional milk for pregnant women', 390000, 50, 'meiji_mama.jpg', '2025-12-31', '2024-01-01', 4, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P014', N'Physiolac Mom', N'Nutritional milk for pregnant and breastfeeding mothers', 330000, 45, 'physiolac_mom.jpg', '2025-12-31', '2024-01-01', 5, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P015', N'XO Mom', N'Korean milk powder for pregnant women', 350000, 50, 'xo_mom.jpg', '2025-12-31', '2024-01-01', 6, 1)

INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P004', N'Similac Pro-Advance', N'Infant formula', 500000, 100, 'similac_pro_advance.jpg', '2025-12-31', '2024-01-01', 4, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P005', N'Enfamil NeuroPro', N'Infant formula with MFGM and DHA', 540000, 80, 'enfamil_neuropro.jpg', '2025-12-31', '2024-01-01', 5, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P006', N'Aptamil Gold+', N'Infant formula with prebiotics and DHA', 600000, 70, 'aptamil_gold.jpg', '2025-12-31', '2024-01-01', 6, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P016', N'Friso Gold 1', N'Infant formula with prebiotics for 0-6 months', 480000, 90, 'friso_gold_1.jpg', '2025-12-31', '2024-01-01', 7, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P017', N'Dielac Alpha Step 1', N'Milk powder for infants from 0-6 months', 450000, 85, 'dielac_alpha_step_1.jpg', '2025-12-31', '2024-01-01', 8, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P018', N'Nestle NAN Optipro 1', N'Infant formula for 0-6 months', 520000, 75, 'nestle_nan_optipro_1.jpg', '2025-12-31', '2024-01-01', 9, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P019', N'Morinaga Hagukumi', N'Japanese infant formula for 0-6 months', 550000, 80, 'morinaga_hagukumi.jpg', '2025-12-31', '2024-01-01', 10, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P020', N'NutiFood GrowPLUS+ Red', N'Infant formula for weight gain', 530000, 65, 'nutifood_growplus_red.jpg', '2025-12-31', '2024-01-01', 11, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P021', N'Abbott Pediasure', N'Nutritional supplement for children', 570000, 90, 'abbott_pediasure.jpg', '2025-12-31', '2024-01-01', 12, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P022', N'Meiji Hohoemi', N'Japanese milk powder for infants', 560000, 70, 'meiji_hohoemi.jpg', '2025-12-31', '2024-01-01', 4, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P023', N'Physiolac Relais 1', N'Infant formula for 0-6 months', 490000, 85, 'physiolac_relais_1.jpg', '2025-12-31', '2024-01-01', 5, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P024', N'XO Infant Formula', N'Korean infant formula for 0-6 months', 510000, 80, 'xo_infant_formula.jpg', '2025-12-31', '2024-01-01', 6, 2)

INSERT INTO Voucher (Code, DiscountPercentage, MaxDiscount, MinDiscount, StartDate, ExpiryDate, VoucherName, Quantity)
VALUES
  ('VOUCHER1', 10, 100000, 0,'2024-12-30', '2024-12-31', 'Voucher 1',10),
  ('VOUCHER2', 15, 150000, 0,'2024-12-30', '2024-12-31', 'Voucher 2',10),
  ('VOUCHER3', 20, 200000, 0,'2024-12-30', '2024-12-31', 'Voucher 3',10),
  ('VOUCHER4', 25, 250000, 0,'2024-12-30', '2024-12-31', 'Voucher 4',10),
  ('VOUCHER5', 30, 300000, 0,'2024-12-30', '2024-12-31', 'Voucher 5',10),
  ('VOUCHER6', 35, 350000, 0,'2024-12-30', '2024-12-31', 'Voucher 6',10);


INSERT INTO ArticleCategory VALUES (N'Tổng hợp'), (N'Tin khuyến mãi'), (N'Tư vấn mua sắm')

INSERT INTO Promotion (PromotionName, Description, StartDate, EndDate, DiscountPercentage) VALUES
('Summer Sale', 'Huge discounts on all products', '2024-05-01', '2024-06-30', 10),
('Winter Sale', 'Special discounts for winter', '2024-05-01', '2024-12-31', 15),
('Black Friday', 'Black Friday discounts on selected items', '2024-11-25', '2024-11-30', 20),
('Christmas Sale', 'Christmas special discounts', '2024-05-20', '2024-12-25', 25),
('New Year Sale', 'New Year special discounts', '2024-12-31', '2025-01-05', 30),
('Easter Sale', 'Easter special discounts', '2024-04-10', '2024-04-20', 35),
('Valentine Day Sale', 'Valentine Day special discounts', '2024-02-10', '2024-02-15', 40),
('Back to School Sale', 'Back to School special discounts', '2024-08-15', '2024-08-30', 45),
('Halloween Sale', 'Halloween special discounts', '2024-05-25', '2024-10-31', 50),
('Anniversary Sale', 'Anniversary special discounts', '2024-09-01', '2024-09-10', 55);

/*
WITH RandomProducts AS (
    SELECT ProductID, 
           ROW_NUMBER() OVER (PARTITION BY ProductCategoryID ORDER BY NEWID()) AS rn
    FROM Product
)
INSERT INTO ProductPromotionList (PromotionID, ProductID)
SELECT p.PromotionID, rp.ProductID
FROM (SELECT PromotionID FROM Promotion) p
CROSS JOIN (SELECT ProductID FROM RandomProducts WHERE rn <= 5) rp
ORDER BY p.PromotionID;
*/