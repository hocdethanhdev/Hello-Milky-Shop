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
('Abbott'),
('Ensure'),
('XO'),
('Vinamilk');

insert into ProductCategory values (N'Sữa cho mẹ bầu'), (N'Sữa cho em bé')

INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Ensure Úc vị Vanilla 850g', N'Sữa Ensure Úc vị Vanilla 850g là một thức uống dinh dưỡng chất lượng cao cho những người cần thêm dinh dưỡng. ENSURE chứa các nhu cầu dinh dưỡng cần thiết bao gồm các carbohydrate, protein, 15 vitamin và 14 khoáng chất, thích hợp làm nguồn dinh dưỡng chính cho người đang dưỡng bệnh hay nguồn dinh dưỡng bổ sung cho các bữa ăn hàng ngày. Với ENSURE bạn có thể chắc chắn mình đang có những gì tốt nhất mà khoa học dinh dưỡng mang đến.', 780000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230613/sua-ensure-uc-vi-vanilla-850g.jpg', '2025-12-31', '2024-01-01', 13, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa FrisoMum Gold 900g (hương cam)', N'Sữa Friso hương cam là thực phẩm bổ sung dành cho bà mẹ mang thai và cho con bú, cung cấp dưỡng chất quan trọng đáp ứng nhu cầu dinh dưỡng đặc biệt của mẹ bầu. Người mẹ suốt giai đoạn mang thai và cho con bú có nhu cầu gia tăng năng lượng cà các dưỡng chất thiết yếu.', 509000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20200928/friso-mom-orange-900g.png', '2025-12-31', '2024-01-01', 7, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Frisomum Gold hương Vani - 900g', N'Sữa Friso Mum Gold Vanilla là thực phẩm bổ sung dành cho bà mẹ mang thai và cho con bú, cung cấp dưỡng chất quan trọng đáp ứng nhu cầu dinh dưỡng đặc biệt của mẹ bầu. Người mẹ suốt giai đoạn mang thai và cho con bú có nhu cầu gia tăng năng lượng cà các dưỡng chất thiết yếu. 

Các nghiên cứu khoa học đã chứng minh não trẻ bắt đầu phát triển khoảng tuần thứ 8 và giai đoạn trí não phát triển nhanh nhất là khoảng thời gian giữa thai kỳ tới 18 tháng sau khi sinh. Trong giai đoạn này, sự can thiệp bằng dinh dưỡng đặc biệt quan trọng với sự phát triển trí não trẻ.', 575000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20200928/mum-vani-mh2-900.png', '2025-12-31', '2024-01-01', 7, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Frisomum Gold hương Vani - 400g', N'Sữa Friso Mum Gold Vanilla là thực phẩm bổ sung dành cho bà mẹ mang thai và cho con bú, cung cấp dưỡng chất quan trọng đáp ứng nhu cầu dinh dưỡng đặc biệt của mẹ bầu. Người mẹ suốt giai đoạn mang thai và cho con bú có nhu cầu gia tăng năng lượng cà các dưỡng chất thiết yếu. 

Các nghiên cứu khoa học đã chứng minh não trẻ bắt đầu phát triển khoảng tuần thứ 8 và giai đoạn trí não phát triển nhanh nhất là khoảng thời gian giữa thai kỳ tới 18 tháng sau khi sinh. Trong giai đoạn này, sự can thiệp bằng dinh dưỡng đặc biệt quan trọng với sự phát triển trí não trẻ.', 260000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20200928/mum-vani-mh2-400g.png', '2025-12-31', '2024-01-01', 7, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Frisomum Gold hương cam - 400g', N'Sữa Friso hương cam là thực phẩm bổ sung dành cho bà mẹ mang thai và cho con bú, cung cấp dưỡng chất quan trọng đáp ứng nhu cầu dinh dưỡng đặc biệt của mẹ bầu. Người mẹ suốt giai đoạn mang thai và cho con bú có nhu cầu gia tăng năng lượng cà các dưỡng chất thiết yếu.', 260000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20200928/friso-mom-orange-400g.png', '2025-12-31', '2024-01-01', 13, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Ensure Gold Vigor nước chai 237ml (lốc 6 chai)', N'Sữa Ensure Gold Vigor nước chai 237ml là công thức dinh dưỡng đầy đủ và cân đối dạng lỏng, bổ sung dinh dưỡng giúp duy trì và tăng cường sức khỏe, rất thích hợp cho người ốm mệt, suy dinh dưỡng hoặc làm việc nhiều. Sản phẩm được đóng chai 237ml tiện dụng và dễ mang theo cũng như sử dụng.', 390000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230414/sua-ensure-gold-vigor-nuoc-chai-237ml-loc-6-chai.png', '2025-12-31', '2024-01-01', 13, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Ensure Đức vị vani 400g', N'Sữa Ensure Đức vị vani 400g là sản phẩm nổi tiếng và được ưa chuộng của hãng Abbott sản xuất dành cho thị trường Đức. Sản phẩm với hàm lượng chất dinh dưỡng cao gồm protein, vitamin, khoáng chất,... hỗ trợ cung cấp đầy đủ dưỡng chất cho người gầy, người suy dinh dưỡng đặc biệt người già người sau phẫu thuật, người mới ốm dậy.', 380000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230419/sua-ensure-duc-vi-vani-400g-1.png', '2025-12-31', '2024-01-01', 13, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Ensure Gold 850g - hương vani', N'Ensure gold là dòng sản phẩm dinh dưỡng đặc biệt cho người lớn tuổi. Công thức sữa rất thích hợp với người kém ăn và vừa mới ốm dậy.Công thức sữa Ensure Gold 850g có bổ sung nhiều lợi khuẩn tiêu hóa với các chuỗi FOS. Hệ dưỡng chất này giúp người lớn tuổi có thể tiêu hóa và hấp thu tốt các dưỡng chất trong sữa và thực phẩm. Khi lớn tuổi thì chức năng tiêu hóa đã giảm nên việc hấp thu thức ăn cũng giảm sút. Điều này khiến triệu chứng đầy bụng, khó tiêu trầm trọng hơn.Mặt khác hấp thu kém khiến đề kháng của cơ thể yếu và nhận được ít dưỡng chất hơn. Giải pháp dinh dưỡng Ensure gold đặc biệt giúp người mới ốm dậy, người cao tuổi có thể tiêu hóa tốt và hấp thu tối đa các dưỡng chất. Công thức còn bổ xung các chất xơ hòa tan để tránh tình trạng táo bón.

Chất béo trong Ensure gold rất tốt cho hệ tim mạch. Do có chứa các axit béo và cholesterol thấp nên đây có thể nói là nguồn thực phẩm lành mạnh cho người lớn tuổi. Các cholesterol xấu bị hạn chế khiến cho nguy cơ mắc bệnh về tim mạch ( bệnh thường gặp và gây tử vong cao ở người cao tuổi) giảm.Uống Ensure gold hàng ngày, người cao tuổi có thể nhận được nhiều vitamin và khoáng chất để có một cơ thể khỏe mạnh. Nguồn đạm, chất béo được hấp thu để cơ thể nhận được nhiều dinh dưỡng và nhanh chóng hồi phục. Đồng thời cơ thể ngày càng khỏe mạnh để lao động nhẹ hay vui chơi bên giai đình.

Ensure gold hoàn toàn có thể thay thế bữa ăn vì công thức sữa có chứa đầy đủ dưỡng chất, vitamin. Đặc biệt lượng canxi cao cho người cao tuổi khắc phục tình trạng loãng xương. Điều này giúp người cao tuổi khỏe mạnh hơn tuy nhiên lượng canxi này được magie, vitamin D hỗ trợ nên không khiến người dùng bị nóng hay gây dư thừa canxi.', 879000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230322/sua-ensure-gold-850g.png', '2025-12-31', '2024-01-01', 13, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Ensure Gold 400g - hương vani', N'Sữa Ensure Gold 400g - hương vani cung cấp dinh dưỡng đấy đủ và cân đối, dùng thay thế bữa ăn, hoặc bổ sung cho chế độ ăn hàng ngày. Ensure Gold thích hợp cho người lớn, người ăn uống kém, đặc biệt cho người bệnh cần phục hồi nhanh.', 415000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20200424/sua-ensure-gold-400g-huong-vani.png', '2025-12-31', '2024-01-01', 13, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa bột XO Mom - 800g', N'Sữa bột XO Mom - 800g  là sản phẩm của tập đoàn Namyang, Hàn Quốc. Được thành lập từ 13/3/1964, trải qua hơn 40 năm nghiên cứu và phát triển, Namyang trở thành Tập đoàn nghiên cứu và sản xuất các sản phẩm bơ sữa dinh dưỡng hàng đầu của Hàn Quốc.', 528000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230603/sua-bot-xo-mom-800g.jpg', '2025-12-31', '2024-01-01', 14, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa bột XO Mom - 400g', N'Sữa bột XO Mom - 400g  là sản phẩm của tập đoàn Namyang, Hàn Quốc.  XO Mom với công thức đặc biệt đầy đủ các vitamin và khoáng chất cùng chất đạm, DHA, prebiotic là nguồn dinh dưỡng bổ sung rất tốt cho bà mẹ mang thai và cho con bú. Không chỉ vậy, sữa với thành phần tách kem bổ sung vào khẩu phần ăn cho phụ nữ mang thai, duy trì sức khỏe và vẻ đẹp của bạn. ', 286000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230603/sua-bot-xo-mom-400g.jpg', '2025-12-31', '2024-01-01', 14, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa bột Vinamilk Canxi Pro 900g', N'Sữa bột Vinamilk Canxi Pro 900g là sản phẩm dinh dưỡng ít béo, bổ sung Canxi, được đặc chế một cách khoa học, giúp hấp thu canxi tối ưu, xây dựng hệ xương chắc khỏe, cùng với sự kết hợp độc đáo Collagen thủy phân để giúp phòng ngừa thoái hóa khớp hiệu quả. Với hương vị ngọt nhẹ, ít béo và giá trị dinh dưỡng cao, sữa bột Vinamilk Canxi Pro sẽ là món quà ý nghĩa cho sức khỏe gia đình bạn.', 357000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230324/sua-bot-vinamilk-canxi-pro-900g-it-beo-bo-sung-canxi.png', '2025-12-31', '2024-01-01', 15, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa bột Optimum Mama Gold 900g', N'Sữa bột Optimum Mama Gold 900g  với hương vị Vani thơm ngon, thay thế bữa ăn phụ, bổ sung DHA, Canxi, Sắt cùng vitamin và khoáng chất thiết yếu, bổ sung cho chế độ ăn thiếu đạm và vi chất dinh dưỡng, giúp duy trì sức khoẻ của bà mẹ trước và sau khi sinh.', 397000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20221228/sua-bot-vinamilk-optimum-mama-gold-hop-thiec-900g-1.png', '2025-12-31', '2024-01-01', 15, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa bột Dielac Mama Gold Vani 900g', N'Sữa bột Dielac Mama Gold Vani 900g là sản phẩm dinh dưỡng dành riêng cho bà mẹ mang thai và cho con bú, giúp tăng cường sức khỏe cho mẹ và hỗ trợ sự phát triển lành mạnh của thai nhi. Với hương vị thơm ngon, ít béo, uống 2 ly mỗi ngày giúp đáp ứng nhu cầu Axit Folic cho bà mẹ mang thai. Đồng thời, Dielac Mama Gold còn tăng cường DHA, Canxi, Sắt cùng 28 loại vitamin và khoáng chất thiết yếu khác.', 237000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230324/sua-bot-dielac-mama-gold-vani-900g.png', '2025-12-31', '2024-01-01', 15, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa bột pha sẵn Sure Prevent Gold - Hộp 6 chai', N'Sữa bột pha sẵn Sure Prevent Gold - Hộp 6 chai với thiết kế tiện lợi, dễ dàng mang theo và sử dụng, giúp cung cấp dinh dưỡng đầy đủ và cân đối cho người lớn tuổi, hỗ trợ tăng cường sức khỏe tổng thể. Chất lượng quốc tế với các dưỡng chất được nhập khẩu 100% từ Châu Âu, Hoa Kỳ và Hàn Quốc.', 162000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20221229/sua-bot-pha-san-sure-prevent-gold-hop-6-chai-1.png', '2025-12-31', '2024-01-01', 15, 1)

INSERT INTO Voucher (DiscountPercentage, MaxDiscount, MinDiscount, StartDate, ExpiryDate, VoucherName, Quantity)
VALUES
  ( 10, 100000, 0,'2024-12-30', '2024-12-31', 'Voucher 1',10),
  (15, 150000, 0,'2024-12-30', '2024-12-31', 'Voucher 2',10),
  (20, 200000, 0,'2024-12-30', '2024-12-31', 'Voucher 3',10),
  ( 25, 250000, 0,'2024-12-30', '2024-12-31', 'Voucher 4',10),
  ( 30, 300000, 0,'2024-12-30', '2024-12-31', 'Voucher 5',10),
  ( 35, 350000, 0,'2024-12-30', '2024-12-31', 'Voucher 6',10);


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
