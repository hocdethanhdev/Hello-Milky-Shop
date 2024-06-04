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

insert into ProductPromotionList(PromotionID, ProductID, PriceAfterDiscount) 
values(1, 'SM0001', 0)
insert into ProductPromotionList(PromotionID, ProductID, PriceAfterDiscount) 
values(2, 'SM0001', 0)

/*
INSERT INTO Message (Message, TimeStamp, ChatID) VALUES ('Hello there!', '2024-05-30', 1);
INSERT INTO Message (Message, TimeStamp, ChatID) VALUES ('How are you doing?', '2024-05-30', 1);
INSERT INTO Message (Message, TimeStamp, ChatID) VALUES ('I hope you are well.', '2024-05-30', 1);
INSERT INTO Message (Message, TimeStamp, ChatID) VALUES ('Yes, I am good.', '2024-05-30', 1);
INSERT INTO Message (Message, TimeStamp, ChatID) VALUES ('What about you?', '2024-05-30', 1);
INSERT INTO Message (Message, TimeStamp, ChatID) VALUES ('I am also fine, thanks.', '2024-05-30', 1);
INSERT INTO Message (Message, TimeStamp, ChatID) VALUES ('Can I help you with something?', '2024-05-30', 1);
INSERT INTO Message (Message, TimeStamp, ChatID) VALUES ('No, I am good.', '2024-05-30', 1);
INSERT INTO Message (Message, TimeStamp, ChatID) VALUES ('Thanks for asking though.', '2024-05-30', 1);
INSERT INTO Message (Message, TimeStamp, ChatID) VALUES ('You are welcome!', '2024-05-30', 1);
*/

/*
insert into Comment(UserID, ProductID, Description) values ('M0000001', 'SE0001', N'Tốt')
insert into Comment(UserID, ProductID, Description) values ('M0000001', 'SE0002', N'Tốt')
insert into Comment(UserID, ProductID, Description) values ('M0000001', 'SE0003', N'Tốt')
*/

/*
INSERT INTO Orders (OrderDate, TotalAmount, Status, UserID) VALUES
('2024-05-01', 5000000, 0, 'M0000001'),
('2024-05-02', 3200000, 0, 'M0000001'),
('2024-05-03', 4300000, 0, 'M0000001'),
('2024-05-04', 2100000, 0, 'M0000001'),
('2024-05-05', 7600000, 0, 'M0000001'),
('2024-05-06', 5400000, 0, 'M0000001'),
('2024-05-07', 3300000, 0, 'M0000001'),
('2024-05-08', 2700000, 0, 'M0000001'),
('2024-05-09', 4800000, 0, 'M0000001'),
('2024-05-10', 6200000, 0, 'M0000001');
INSERT INTO OrderDetail (Quantity, Price, OrderID, ProductID) VALUES
(2, 1000000, 1, 'SM0001'),
(1, 3200000, 2, 'SM0002'),
(3, 1290000, 3, 'SM0003'),
(2, 700000, 4, 'SM0004'),
(1, 7600000, 5, 'SM0005'),
(4, 5400000, 6, 'SM0006'),
(2, 660000, 7, 'SM0006'),
(3, 900000, 8, 'SM0007'),
(1, 4800000, 9, 'SM0008'),
(2, 1240000, 10, 'SM0009'),

(1, 500000, 1, 'SE0001'),
(2, 1080000, 2, 'SE0002'),
(1, 600000, 3, 'SE0003'),
(2, 960000, 4, 'SE0004'),
(1, 4500000, 5, 'SE0005'),
(2, 1040000, 6, 'SE0006'),
(1, 550000, 7, 'SE0007'),
(1, 5300000, 8, 'SE0008'),
(1, 5700000, 9, 'SE0009'),
(1, 560000, 10, 'SE0010');
*/

INSERT INTO City (CityName) VALUES
('Hà Nội'),
('Hồ Chí Minh'),
('Đà Nẵng'),
('Hải Phòng'),
('Cần Thơ'),
('Đà Lạt'),
('Huế'),
('Nha Trang'),
('Vũng Tàu'),
('Buôn Ma Thuột'),
('Pleiku'),
('Rạch Giá'),
('Long Xuyên'),
('Thủ Dầu Một'),
('Biên Hòa'),
('Vĩnh Long'),
('Cao Lãnh'),
('Tân An'),
('Cà Mau'),
('Bạc Liêu');

-- Hà Nội
INSERT INTO District (DistrictName, CityID) VALUES
('Ba Đình', 1),
('Hoàn Kiếm', 1),
('Tây Hồ', 1),
('Long Biên', 1),
('Cầu Giấy', 1),
('Đống Đa', 1),
('Hai Bà Trưng', 1),
('Hoàng Mai', 1),
('Thanh Xuân', 1),
('Sóc Sơn', 1),
('Đông Anh', 1),
('Gia Lâm', 1),
('Nam Từ Liêm', 1),
('Thanh Trì', 1),
('Bắc Từ Liêm', 1),
('Mê Linh', 1),
('Hà Đông', 1),
('Sơn Tây', 1),
('Quận 1', 2),
('Quận 3', 2),
('Quận 4', 2),
('Quận 5', 2),
('Quận 6', 2),
('Quận 7', 2),
('Quận 8', 2),
('Quận 10', 2),
('Quận 11', 2),
('Quận 12', 2),
('Bình Thạnh', 2),
('Gò Vấp', 2),
('Phú Nhuận', 2),
('Tân Bình', 2),
('Tân Phú', 2),
('Bình Tân', 2),
('Bình Chánh', 2),
('Củ Chi', 2),
('Hóc Môn', 2),
('Nhà Bè', 2),
('Cần Giờ', 2),

-- Đà Nẵng
('Hải Châu', 3),
('Thanh Khê', 3),
('Sơn Trà', 3),
('Ngũ Hành Sơn', 3),
('Liên Chiểu', 3),
('Cẩm Lệ', 3),
('Hòa Vang', 3),
('Hoàng Sa', 3),

-- Hải Phòng
('Hồng Bàng', 4),
('Lê Chân', 4),
('Ngô Quyền', 4),
('Kiến An', 4),
('Hải An', 4),
('Đồ Sơn', 4),
('Dương Kinh', 4),
('Thủy Nguyên', 4),
('An Dương', 4),
('An Lão', 4),
('Kiến Thụy', 4),
('Tiên Lãng', 4),
('Vĩnh Bảo', 4),
('Cát Hải', 4),
('Bạch Long Vĩ', 4),

-- Cần Thơ
('Ninh Kiều', 5),
('Ô Môn', 5),
('Bình Thủy', 5),
('Cái Răng', 5),
('Thốt Nốt', 5),
('Vĩnh Thạnh', 5),
('Cờ Đỏ', 5),
('Phong Điền', 5),
('Thới Lai', 5),

-- Đà Lạt
('Ward 1', 6),
('Ward 2', 6),
('Ward 3', 6),
('Ward 4', 6),
('Ward 5', 6),
('Ward 6', 6),
('Ward 7', 6),
('Ward 8', 6),
('Ward 9', 6),
('Ward 10', 6),
('Ward 11', 6),
('Ward 12', 6),

-- Huế
('Phú Vang', 7),
('Phú Lộc', 7),
('Nam Đông', 7),
('A Lưới', 7),
('Hương Thủy', 7),
('Hương Trà', 7),
('Quảng Điền', 7),
('Phong Điền', 7),

-- Nha Trang
('Diên Khánh', 8),
('Ninh Hòa', 8),
('Cam Lâm', 8),
('Vạn Ninh', 8),
('Khánh Sơn', 8),
('Khánh Vĩnh', 8),

-- Vũng Tàu
('Bà Rịa', 9),
('Long Điền', 9),
('Đất Đỏ', 9),
('Châu Đức', 9),
('Xuyên Mộc', 9),
('Côn Đảo', 9),
('Tân Thành', 9),

-- Buôn Ma Thuột
('Cư Mgar', 10),
('Ea HLeo', 10),
('Ea Kar', 10),
('Krông Ana', 10),
('Krông Bông', 10),
('Krông Buk', 10),
('Krông Năng', 10),
('Krông Pắc', 10),
('Lăk', 10),
('Buôn Đôn', 10),
('Ea Sup', 10),
('MDrak', 10),

-- Pleiku
('An Khê', 11),
('Ayun Pa', 11),
('Chư Păh', 11),
('Chư Prông', 11),
('Chư Sê', 11),
('Đắk Đoa', 11),
('Đắk Pơ', 11),
('Đức Cơ', 11),
('Ia Grai', 11),
('Ia Pa', 11),
('Kbang', 11),
('Kông Chro', 11),
('Krông Pa', 11),
('Mang Yang', 11),
('Phú Thiện', 11),

-- Rạch Giá
('Vĩnh Thuận', 12),
('Giồng Riềng', 12),
('Gò Quao', 12),
('Hòn Đất', 12),
('Tân Hiệp', 12),
('An Minh', 12),
('An Biên', 12),
('Châu Thành', 12),
('Kiên Lương', 12),
('U Minh Thượng', 12),
('Vĩnh Bảo', 12),

-- Long Xuyên
('Châu Đốc', 13),
('Tân Châu', 13),
('An Phú', 13),
('Châu Phú', 13),
('Châu Thành', 13),
('Phú Tân', 13),
('Thoại Sơn', 13),
('Tri Tôn', 13),
('Tịnh Biên', 13),

-- Thủ Dầu Một
('Dĩ An', 14),
('Thuận An', 14),
('Bến Cát', 14),
('Tân Uyên', 14),
('Bàu Bàng', 14),
('Bắc Tân Uyên', 14),
('Phú Giáo', 14),
('Dầu Tiếng', 14),

-- Biên Hòa
('Long Khánh', 15),
('Xuân Lộc', 15),
('Thống Nhất', 15),
('Trảng Bom', 15),
('Cẩm Mỹ', 15),
('Long Thành', 15),
('Nhơn Trạch', 15),
('Vĩnh Cửu', 15),
('Định Quán', 15),
('Tân Phú', 15),

-- Vĩnh Long
('Bình Tân', 16),
('Long Hồ', 16),
('Mang Thít', 16),
('Tam Bình', 16),
('Trà Ôn', 16),
('Vũng Liêm', 16),
('Bình Minh', 16),

-- Cao Lãnh
('Sa Đéc', 17),
('Hồng Ngự', 17),
('Lai Vung', 17),
('Lấp Vò', 17),
('Tam Nông', 17),
('Thanh Bình', 17),
('Tháp Mười', 17),
('Châu Thành', 17),
('Tân Hồng', 17),

-- Tân An
('Bến Lức', 18),
('Cần Đước', 18),
('Cần Giuộc', 18),
('Châu Thành', 18),
('Đức Hòa', 18),
('Đức Huệ', 18),
('Mộc Hóa', 18),
('Tân Hưng', 18),
('Tân Thạnh', 18),
('Tân Trụ', 18),
('Thạnh Hóa', 18),
('Thủ Thừa', 18),
('Vĩnh Hưng', 18),

-- Cà Mau
('Ngọc Hiển', 19),
('Năm Căn', 19),
('Phú Tân', 19),
('Thới Bình', 19),
('Trần Văn Thời', 19),
('U Minh', 19),
('Cái Nước', 19),
('Đầm Dơi', 19),

-- Bạc Liêu
('Giá Rai', 20),
('Hòa Bình', 20),
('Hồng Dân', 20),
('Phước Long', 20),
('Vĩnh Lợi', 20),
('Đông Hải', 20);
