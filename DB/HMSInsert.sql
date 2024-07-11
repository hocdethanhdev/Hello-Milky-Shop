use HelloMilkyShop
go
INSERT INTO Role VALUES ('Admin'), ('Staff'), ('Member'), ('Shipper')
go
INSERT INTO ArticleCategory VALUES (N'Sức Khỏe cho bé'), (N'Sức Khỏe cho mẹ'), (N'Tin khuyến mãi')
go
insert into ProductCategory values (N'Sữa cho mẹ bầu'), (N'Sữa cho em bé')
go
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
('VinaMilk'),
('Grow'),
('Celia'),
('Meiji'),
('Nestle'),
('Abbott Grow');
go
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Abbott Grow số 4 hương vani 1.7kg (từ 2 tuổi)', N'Sữa Abbott Grow số 4 hương vani 1.7kg loại mới bổ sung thêm 20% canxi, hỗ trợ bé phát triển xương và chiều cao nhờ được bổ sung canxi, vitamin D với tỷ lệ canxi/phốt pho thích hợp theo khuyến cáo của Châu và Hoa Kỳ và sự có mặt của hỗn hợp chất béo thực vật không chứa dầu cọ.', 584000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230506/sua-abbott-grow-4-1-7kg-tren-2-tuoi-2.jpg', '2025-12-31', '2024-01-01', 20, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Abbott Grow Gold 3+ hương vani 900g (3-6 tuổi)', N'Sữa Abbott Grow Gold 3+ hương vani 900g (3-6 tuổi) với hệ dưỡng chất tiên tiến G Power+ giàu vi chất và protein chất lượng cao, đủ 9 acid amin thiết yếu, hỗ trợ quá trình phát triển toàn diện cả về thể chất lẫn trí não của bé trong giai đoạn từ 3 đến 6 tuổi. Giai đoạn bé bước sang lứa tuổi mầm non - lứa tuổi bắt đầu đến trường lớp, học hỏi cũng như giao tiếp nhiều hơn với mọi người xung quanh và thế giới bên ngoài.', 424000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230506/sua-bot-abbott-grow-gold-3-huong-vani-lon-900g-1.jpg', '2025-12-31', '2024-01-01', 20, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Abbott Grow 2 - 900g (6-12 tháng)', N'Sữa Abbott Grow 2 (900g) là thức ăn công thức được thiết kế khoa học cho bé từ 6-12 tháng tuổi, giàu đạm và các dưỡng chất thiết yếu, giúp bé phát triển tốt thể chất và sức đề kháng. Sản phẩm có hương vị thơm ngon, dễ uống, cung cấp nguồn dinh dưỡng hoàn hảo cho sự khởi đầu tốt nhất.', 344000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230313/sua-abbott-grow-2-900g-6-12-thang.png', '2025-12-31', '2024-01-01', 20, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Abbott Grow 3 - 900g (1-2 tuổi)', N'Sữa Abbott Grow 3 (900g) với hệ dưỡng chất tiên tiến G Power+ giàu dưỡng chất và protein chất lượng cao, đủ 9 acid amin thiết yếu, giúp bé từ 1 tuổi trở lên phát triển tốt về thể chất và trí tuệ. Sản phẩm cung cấp đầy đủ các dưỡng chất thiết yếu và năng lượng để phát triển tốt chiều cao, tăng cường sức đề kháng và tăng cân khỏe mạnh.', 300000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230313/sua-abbott-grow-3.png', '2025-12-31', '2024-01-01', 20, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Abbott Grow Gold hương vani 180ml (lốc 4 hộp)', N'Sữa Abbott Grow Gold hương vani thơm ngon bổ sung hàm lượng DHA, Taurin, Acid Linoleic và Acid Alpha Linolenic giúp trẻ phát triển trí não và thị giác hiệu quả. Sữa được sản xuất theo công thức đặc biệt với tỷ lệ Canxi/Photpho thích hợp hỗ trợ sự phát triển hệ xương và răng, cho bé phát triển chiều cao nhanh chóng, nâng cao tầm vóc, chống thấp còi.', 69000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230424/sua-abbott-grow-gold-huong-vani-180ml-loc-4-hop.png', '2025-12-31', '2024-01-01', 20, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Aptakid New Zealand số 3 900g (24 tháng+)', N'Từ 24 tháng tuổi trở lên nhu cầu dinh dưỡng của bé tăng lên, Sữa Aptakid New Zealand số 3 900g với công thức đặc biệt sẽ cung cấp đầy đủ các chất dinh dưỡng cần thiết cho bé. Sữa có hàm lượng dinh dưỡng cao, thích hợp với cơ địa của đa số trẻ em Việt Nam, giúp các bé phát triển toàn diện hơn. Đặc biệt, sản phẩm có chứa bộ dưỡng chất Synbiotic, hàm lượng cao DHA, Calcium, 16 Vitamins và khoáng chất góp phần giúp trẻ phát triển bình thường và khỏe mạnh.', 614000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20240526/aptakid.jpg', '2025-12-31', '2024-01-01', 6, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Profutura Duobiotik số 2 800g (6-12 tháng)', N'Sữa Aptamil Profutura Duobiotik số 2 mang đến nguồn dưỡng chất tối ưu dành riêng cho trẻ từ 6 - 12 tháng tuổi. Bên cạnh hệ dưỡng chất kết hợp Prebiotics scGOS/lcFOS (9:1) và HMO 3’-GL giúp tăng cường miễn dịch và hỗ trợ đường ruột, sản phẩm còn bổ sung DHA & ARA; ALA phát triển não bộ và vitamin C, D giúp phát triển hệ xương và chức năng miễn dịch ở trẻ.', 814000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230325/sua-aptamil-profutura-duobiotik-so-2-800g-6-12-thang.png', '2025-12-31', '2024-01-01', 6, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Aptamil Đức số 1 - 800g (0-6 tháng)', N'Sữa mẹ là thức ăn tốt nhất cho trẻ sơ sinh và trẻ nhỏ. Với những tác động bên ngoài môi trường giúp cho trẻ nhỏ sẽ cho con bạn được lớn lên với hệ tiêu hóa an toàn và dùng được những chức năng tốt nhát cho bé nhà bạn. Với những loại sữa dành cho bé từ 0-6 tháng dưới đây sẽ là những loại sữa tác động đến sức khỏe của bé một cách an toàn nhất. Với những giây phút ấm áp bên cha mẹ và đáp ứng cho trẻ được thích thú nhất,  sữa aptamil đức số 1 hộp 800g là loại sữa công thức cao cấp nhập khẩu từ Đức dành cho bé từ khi mới sinh ra khi mẹ không đủ sữa. Được đánh giá là loại sữa mát, mịn, dễ uống Aptamil Đức được rất nhiều bà mẹ thông thái lựa chọn cho con mình.', 565000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230206/sua-aptamil-duc-so-1-800g-new.jpeg', '2025-12-31', '2024-01-01', 6, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa pha sẵn Aptakid 180ml lốc 3 hộp (từ 3 tuổi)', N'Sữa pha sẵn Aptakid 180ml lốc 3 hộp (từ 3 tuổi) được làm từ sữa tươi với hương vị thơm ngon, đem đến nguồn dưỡng chất an toàn và chất lượng để bé hấp thu tốt và phát triển khỏe mạnh. Sữa pha sẵn tiện lợi sẽ là lựa chọn tối ưu giúp mẹ bổ sung nguồn dinh dưỡng toàn diện cho bé yêu mà không phải mất thời gian pha sữa vào bình cho bé mang đi.', 68000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230615/sua-pha-san-aptakid-180ml-tu-3-tuoi-2.jpg', '2025-12-31', '2024-01-01', 6, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa bột Aptamil Essensis số 1 (900g)', N'Sữa bột Aptamil Essensis số 1 (900g) với thành phần sữa chứa hơn 200 loại HMO trong dinh dưỡng tự nhiên, và hỗn hợp đặc biệt của prebiotic GOS / FOS giúp hỗ trợ sự trưởng thành của hệ thống miễn dịch của trẻ ngay từ giai đoạn đầu đời.', 1424000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230314/sua-bot-aptamil-essensis-so-1-900g.png', '2025-12-31', '2024-01-01', 6, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Celia Expert số 2 - 900g (6-12 tháng)', N'Sữa celia Expert số 2 (900g) dành cho trẻ từ 6 đến 12 tháng tuổi. Bổ sung DHA, ARA cho bé thông minh ngay từ khi còn nhỏ. Sự kết hợp giữa probiotics & prebiotic làm tăng sức đề kháng, giúp hoàn thiện hệ tiêu hóa còn non nớn của bé. Prebiotic FOS bảo vệ các mô ruột khỏi những tổn thương giúp bé hấp thu tốt hơn.', 420000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230411/sua-celia-expert-so-2-900g.png', '2025-12-31', '2024-01-01', 17, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Celia Expert số 1 - 900g (0-6 tháng)', N'Sữa Celia Expert số 1 900g với công thức dinh dưỡng đặc chế dành riêng cho bé từ sơ sinh đến 6 tháng tuổi. Các thành phần trong sữa Celia Expert 1 của Pháp chứa đầy đủ các dưỡng chất, giúp bảo vệ hệ tiêu hóa, điều hòa hệ miễn dịch, phát triển não bộ và các tế bào thần kinh của bé.', 430000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230411/sua-celia-expert-so-1-900g.png', '2025-12-31', '2024-01-01', 17, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Ensure Úc vị Vanilla 850g', N'Sữa Ensure Úc vị Vanilla 850g là một thức uống dinh dưỡng chất lượng cao cho những người cần thêm dinh dưỡng. ENSURE chứa các nhu cầu dinh dưỡng cần thiết bao gồm các carbohydrate, protein, 15 vitamin và 14 khoáng chất, thích hợp làm nguồn dinh dưỡng chính cho người đang dưỡng bệnh hay nguồn dinh dưỡng bổ sung cho các bữa ăn hàng ngày. Với ENSURE bạn có thể chắc chắn mình đang có những gì tốt nhất mà khoa học dinh dưỡng mang đến.', 780000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230613/sua-ensure-uc-vi-vanilla-850g.jpg', '2025-12-31', '2024-01-01', 13, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa FrisoMum Gold 900g (hương cam)', N'Sữa Friso hương cam là thực phẩm bổ sung dành cho bà mẹ mang thai và cho con bú, cung cấp dưỡng chất quan trọng đáp ứng nhu cầu dinh dưỡng đặc biệt của mẹ bầu. Người mẹ suốt giai đoạn mang thai và cho con bú có nhu cầu gia tăng năng lượng cà các dưỡng chất thiết yếu.', 509000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20200928/friso-mom-orange-900g.png', '2025-12-31', '2024-01-01', 7, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Frisomum Gold hương Vani - 900g', N'Sữa Friso Mum Gold Vanilla là thực phẩm bổ sung dành cho bà mẹ mang thai và cho con bú, cung cấp dưỡng chất quan trọng đáp ứng nhu cầu dinh dưỡng đặc biệt của mẹ bầu. Người mẹ suốt giai đoạn mang thai và cho con bú có nhu cầu gia tăng năng lượng cà các dưỡng chất thiết yếu. 

Các nghiên cứu khoa học đã chứng minh não trẻ bắt đầu phát triển khoảng tuần thứ 8 và giai đoạn trí não phát triển nhanh nhất là khoảng thời gian giữa thai kỳ tới 18 tháng sau khi sinh. Trong giai đoạn này, sự can thiệp bằng dinh dưỡng đặc biệt quan trọng với sự phát triển trí não trẻ.', 575000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20200928/mum-vani-mh2-900.png', '2025-12-31', '2024-01-01', 7, 1)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES

('P001', N'Sữa Celia Expert số 3 - 900g (1-3 tuổi)', N'Thế giới bên ngoài luôn diệu kì và kích thích sự tìm tòi, khám phá nơi trẻ. Hãy cùng Lactalist chăm sóc bé yêu tốt nhất với sữa celia Expert số 3, hộp thiếc 900g, dành cho trẻ từ 1 - 3 tuổi. Với những ưu điểm vượt trội, Celia Expert 3 giúp tăng cường hệ miễn dịch, cho bé cơ thể khỏe mạnh, cao lớn, thông minh, thỏa sức khám phá những điều mới mẻ. Sữa ở dạng bột mịn, óng, không bị vón cục và không có tạp chất lạ. Sữa bột cho bé Celia Expert số 3 (900g) màu kem trắng, có mùi thơm của sữa, có vị tinh bột và vị ngọt tự nhiên của sữa mẹ.', 410000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230411/sua-celia-expert-so-3-900g.png', '2025-12-31', '2024-01-01', 17, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa bột Meiji HP cho bé dị ứng đạm sữa bò 850g', N'Sữa bột Meiji HP cho bé dị ứng đạm sữa bò 850g Bé của bạn dị ứng đạm sữa bò, bạn phân vân không biết nên cho bé uống sữa nào? Và mua ở đâu chất lượng mà giá phải chăng.Sữa Meiji HP Mirufi dành cho bé dị ứng đạm bò Khối lượng: 850gr Sữa Meiji HP là một dòng sản phẩm của tập đoàn Meiji Nhật ', 870000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230316/sua-bot-meiji-hp-cho-be-di-ung-dam-sua-bo-850g.png', '2025-12-31', '2024-01-01', 18, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Meiji số 9 - 800gr (1-3 tuổi)', N'Sữa Meiji số 9 là sản phẩm sữa của Nhật với hương vị gần giống sữa mẹ, dễ uống, cung cấp đầy đủ chất dinh dưỡng cần thiết cho trẻ trong giai đoạn phát triển này.

Sữa Meiji số 9 là một dòng sản phẩm cao cấp dành cho thị trường nội địa Nhật Bản, được sản xuất dựa trên công nghệ hiện đại theo tiêu chuẩn dinh dưỡng do chính phủ Nhật Bản quy định hoàn toàn được làm từ nguyên liệu sữa sạch, tuân thủ nghiêm ngặt các yêu cầu về chất lượng và vệ sinh an toàn thực phẩm đạt tiêu chuẩn ISO 9001. ', 394000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230422/sua-meiji-so-9-820gr.jpg', '2025-12-31', '2024-01-01', 18, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Meiji 0 (0-1 tuổi) Infant Formula EZcube', N'Sữa Meiji thanh Infant Formula EZcube số 0 gồm 16 thanh được sản xuất trên dây chuyên công nghệ tiên tiến hoàn toàn tự động, đạt tiêu chuẩn ISO9001 nên cha mẹ có thể yên tâm khi bé yêu sử dụng. Sữa có công thức gần giống sữa mẹ, với vị thơm ngon dễ uống, đáp ứng nhu cầu dinh dưỡng của bé từ 0 đến 1 tuổi. Sản phẩm được đóng trong hộp giấy gồm 16 thanh tiện dụng để mẹ mang theo để pha cho bé khi đi du lịch, đi chơi xa hay về quê.', 355000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20240528/san-pham-dinh-duong-cong-thuc-cho-tre-tu-0-12-thang-meiji-0-1-year-old-infant-formula-ezcube-540g.png', '2025-12-31', '2024-01-01', 18, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa bột Meiji HP cho bé dị ứng đạm sữa bò', N'Sữa bột Meiji HP cho bé dị ứng đạm sữa bò (6 thanh) dành cho trẻ bị dị ứng sữa bò, “kén sữa”, giúp bé tăng trưởng tốt nhất. Đây là dòng sữa có chứa các enzym phân giải đạm sữa chất lượng cao và không chứa đường Lactose nên sữa có hương vị thơm ngon như sữa mẹ, rất dễ uống, giúp bé dễ hấp thu dinh dưỡng hiệu quả hơn.', 250000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230614/sua-bot-meiji-hp-cho-be-di-ung-dam-sua-bo-6-thanh-1.jpg', '2025-12-31', '2024-01-01', 19, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa bột Milo (1kg)', N'Sữa bột Milo (1kg) với công thức tối ưu vitamin và khoáng chất giúp tăng trưởng chiều cao một cách vượt trội, góp phần giúp bé có một thể lực tốt nhất. Thành phần chính từ lúa mạch, hương sô cô la thơm ngon, giúp bé cảm thấy ngon miệng mỗi ngày. Công thức toàn diện của Milo dành cho bé từ 24 tháng tuổi trở lên.', 280000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230419/sua-bot-milo-1kg.png', '2025-12-31', '2024-01-01', 19, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Kid Essentials Nestle 800g (1-10 tuổi)', N'Sữa Kid Essentials Nestle (800g) được sản xuất bởi thương hiệu Nestle hàng đầu của Úc, đảm bảo chất lượng cũng như độ an toàn cho trẻ khi sử dụng. Sản phẩm có bổ sung tinh bột, là thức ăn bổ sung có công thức đặc biệt, giúp bé không bị chán hay ngấy, dành cho các bé đặc biệt lười ăn, chậm tăng cân, sau ốm. Sữa có thể uống thay cơm, thay thực phẩm (nếu bé bị chán ăn) & có thể uống nhiều lần trong ngày tùy thích. ', 580000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230606/sua-kid-essentials-nestle-800g-1-10-tuoi.jpg', '2025-12-31', '2024-01-01', 19, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Nan Nga số 4 800g (từ 18 tháng trở lên)', N'Bạn nên chọn sữa NAN Nga số 4 cho trẻ vì các chất chính như: ARA, DHA, lactose đều được bổ sung trong sữa. giúp bé phát triển cân nặng, chiều cao, cơ xương,… Vừa tăng cường hệ thống miễn dịch. Bé lớn hơn 1 tuổi sẽ cho con uống những loại sữa phù hợp hơn những chất dinh dưỡng được yêu nhất cho trẻ, bổ sung các dưỡng chất cần thiết cho sự phát triển thể chất và trí não, với yếu tố kết hợp để giúp bé tăng cường sức đề kháng và phát triển trí thông minh ở trẻ. ',469000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230322/sua-nan-nga-so-4-800g-tu-18-thang-tro-len.jpg', '2025-12-31', '2024-01-01', 19, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa tiệt trùng Nestle NutriStrong hương socola 180ml', N'Sữa tiệt trùng Nestle NutriStrong hương socola 180ml với công thức NutriStrong cung cấp đến 25% nhu cầu canxi cần thiết mỗi ngày cho trẻ, kết hợp cùng các dưỡng chất thiết yếu như Vitamin D, A, B3, B6, B8, B9 và chất đạm, cho xương chắc khỏe, giúp bé luôn mạnh mẽ để sẵng sàng trước mọi thử thách hằng ngày.', 33000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230621/sua-tiet-trung-socola-nestle-180ml-2.jpg', '2025-12-31', '2024-01-01', 19, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa tiệt trùng Nestle NutriStrong hương dâu 180ml', N'Sữa tiệt trùng Nestle NutriStrong hương dâu 180ml với công thức NutriStrong cung cấp đến 25% nhu cầu canxi cần thiết mỗi ngày cho trẻ, kết hợp cùng các dưỡng chất thiết yếu như Vitamin D, A, B3, B6, B8, B9 và chất đạm, cho xương chắc khỏe, giúp bé luôn mạnh mẽ để sẵng sàng trước mọi thử thách hằng ngày.', 33000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230621/sua-tiet-trung-huong-dau-trang-nestle-nutristrong-180ml-3.jpghttps://media.shoptretho.com.vn/upload/image/product/20230621/sua-tiet-trung-huong-dau-trang-nestle-nutristrong-180ml-3.jpg', '2025-12-31', '2024-01-01', 19, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa tiệt trùng Nestle NutriStrong có đường 180ml', N'Sữa tiệt trùng Nestle NutriStrong có đường 180ml với công thức NutriStrong cung cấp đến 25% nhu cầu canxi cần thiết mỗi ngày cho trẻ, kết hợp cùng các dưỡng chất thiết yếu như Vitamin D, A, B3, B6, B8, B9 và chất đạm, cho xương chắc khỏe, giúp bé luôn mạnh mẽ để sẵng sàng trước mọi thử thách hằng ngày.', 33000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230621/sua-tiet-trung-co-duong-nestle-nutristrong-180ml-2.jpg', '2025-12-31', '2024-01-01', 19, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Bột cacao pha sữa Nestle Nesquik Chocolate Mỹ 266g', N'Bột cacao pha sữa Nestle Nesquik Chocolate Mỹ 266g với thành phần cacao nguyên chất, được bổ sung thêm một số dưỡng chất như: vitamin C, D, B6 và khoáng chất thiết yếu, ít đường, ít chất béo và không chứa các chất tạo hương, tạo vị, chất bảo quản. Sản phẩm là sự lựa chọn hoàn hảo cho sức khỏe của cả gia đình, bạn có thể dùng làm đồ uống mỗi buổi sáng, thêm vào sữa cho bé yêu, hay làm món bánh sô-cô-la ngon béo,..', 345000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230418/bot-cacao-pha-sua-nestle-nesquik-chocolate-my-266g.png', '2025-12-31', '2024-01-01', 19, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa bột Nan Pelargon - 400g', N'Sữa bột Nestle Nan Pelargon - 400g là loại sữa có chất liệu an toàn từ chính những dinh dưỡng từ tự nhiên và chế biến từ sữa bò nguyên kem với 20% và chất béo này được coi như sữa công thức dành cho trẻ sơ sinh. Với những cách chọn và sử dụng sữa bột Nestle Nan Pelargon 400g là một loại sữa có chất dinh dưỡng với những cách chọn và sử dụng các loại dinh dưỡng tốt nhất cho trẻ, chống các bệnh về đường tiêu hóa sẽ nguy hại đến trẻ do lên men từ vi khuẩn lactic chọn lọc. Sữa bột Pelargon được đánh giá là có thành phần giống như sữa mẹ nên bé trong độ tuổi từ 0 - 12 tháng đều sử dụng được.', 214000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20150323/sua-bot-nan-pelargon-400g-new-2.png', '2025-12-31', '2024-01-01', 19, 2)
INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa nước Nestlé NAN Optipro Kid 115ml (lốc 6 hộp)', N'Sữa nước Nestlé NAN Optipro Kid 115ml (lốc 6 hộp) chứa đầy đủ các dưỡng chất thiết yếu như Omega 3, Canxi, Vitamin D… giúp trẻ phát triển toàn diện về thể chất và trí tuệ, để trẻ có thể phát huy tối đa tiềm năng trong tương lai. Sản phẩm được pha sẵn, đóng trong hộp giấy tiện lợi, để mẹ mang theo cho trẻ khi đến trường, đi du lịch, đi chơi...', 62000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230323/sua-nuoc-nestle-nan-optipro-kid-115ml-loc-6-hop.png', '2025-12-31', '2024-01-01', 19, 2)
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
go
INSERT INTO Voucher ( DiscountPercentage, MaxDiscount, MinDiscount, StartDate, ExpiryDate, VoucherName, Quantity)
VALUES
  ( 10, 100000, 0,'2024-12-30', '2024-12-31', 'Voucher 1',10),
  ( 15, 150000, 0,'2024-12-30', '2024-12-31', 'Voucher 2',10),
  ( 20, 200000, 0,'2024-12-30', '2024-12-31', 'Voucher 3',10);
INSERT INTO Voucher (DiscountPercentage, MaxDiscount, MinDiscount, StartDate, ExpiryDate, VoucherName, Quantity)
VALUES
  ( 10, 100000, 0,'2024-12-30', '2024-12-31', 'Voucher 1',10),
  (15, 150000, 0,'2024-12-30', '2024-12-31', 'Voucher 2',10),
  (20, 200000, 0,'2024-12-30', '2024-12-31', 'Voucher 3',10),

  ( 25, 250000, 0,'2024-12-30', '2024-12-31', 'Voucher 4',10),
  ( 30, 300000, 0,'2024-12-30', '2024-12-31', 'Voucher 5',10),
  ( 35, 350000, 0,'2024-12-30', '2024-12-31', 'Voucher 6',10);
go
INSERT INTO Promotion (PromotionName,Image, Description, StartDate, EndDate, DiscountPercentage) VALUES
('Christmas Sale','https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2FKhuy%E1%BA%BFn%20m%C3%A3i%20Gi%C3%A1ng%20Sinh.png?alt=media&token=4b702aae-a933-4ac0-8ac6-dacaaaa440c2', 'Christmas discounts on all products', '2024-12-24', '2024-12-25', 10),
('Summer Sale','https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2FKhuy%E1%BA%BFn%20m%C3%A3i%20h%C3%A8%20ver2.png?alt=media&token=30de266b-ef8c-4bb1-9ac4-645e998267b2', 'Special discounts for summer', '2024-06-10', '2024-08-10', 15),
('Black Friday','https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2FBlack%20Friday.png?alt=media&token=059c6509-e0f5-4e03-b634-090ca37b98da', 'Black Friday discounts on selected items', '2024-03-01', '2024-03-31', 20),
('Tet Sale','https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2FKhuy%E1%BB%85n%20m%C3%A3i%20T%E1%BA%BFt.png?alt=media&token=8c3869d9-3241-403c-82fb-fe514cb40c9a', 'Tet special discounts', '2025-02-14', '2025-02-21', 30),
('Spring Sale','https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2FKhuy%E1%BA%BFn%20m%C3%A3i%20Xu%C3%A2n.png?alt=media&token=79746084-18f1-468a-a5ba-f2b0e2f41123', 'Special discounts for spring', '2024-01-01', '2024-01-31', 35),
('Fall Sale','https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2FKhuy%E1%BA%BFn%20m%C3%A3i%20Thu.png?alt=media&token=5ec0dcc4-05db-4a00-89ae-b912afa08451', 'Special discounts for fall', '2024-09-01', '2024-09-30', 40),
('Winter Sale','https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2FKhuy%E1%BA%BFn%20m%C3%A3i%20%C4%90%C3%B4ng.png?alt=media&token=1b382806-bd3c-4bd9-bde6-7d0abafb5e0f', 'Special discounts for winter', '2024-11-04', '2024-11-15', 45);
go
insert into ProductPromotionList(PromotionID, ProductID, PriceAfterDiscount) 
values(1, 'SM0001', 0)
insert into ProductPromotionList(PromotionID, ProductID, PriceAfterDiscount) 
values(2, 'SM0001', 0)
insert into ProductPromotionList(PromotionID, ProductID, PriceAfterDiscount) 
values(2, 'SM0002', 0)
insert into ProductPromotionList(PromotionID, ProductID, PriceAfterDiscount) 
values(2, 'SM0003', 0)
insert into ProductPromotionList(PromotionID, ProductID, PriceAfterDiscount) 
values(2, 'SE0001', 0)
insert into ProductPromotionList(PromotionID, ProductID, PriceAfterDiscount) 
values(2, 'SE0017', 0)
insert into ProductPromotionList(PromotionID, ProductID, PriceAfterDiscount) 
values(2, 'SE0003', 0)
insert into ProductPromotionList(PromotionID, ProductID, PriceAfterDiscount) 
values(2, 'SE0010', 0)
go
INSERT INTO City (CityName) VALUES
(N'Hà Nội'),
(N'Hồ Chí Minh'),
(N'Đà Nẵng'),
(N'Hải Phòng'),
(N'Cần Thơ'),
(N'Lâm Đồng'),
(N'Huế'),
(N'Khánh Hòa'),
(N'Vũng Tàu'),
(N'Đăk lắk'),
(N'Gia Lai'),
(N'Kiên Giang'),
(N'An Giang'),
(N'Bình Dương'),
(N'Đồng Nai'),
(N'Vĩnh Long'),
(N'Đồng Tháp'),
(N'Long An'),
(N'Cà Mau'),
(N'Bạc Liêu'),
(N'Tiền Giang'),
(N'Bắc Giang'),
(N'Bắc Cạn'),
(N'Bắc Ninh'),
(N'Bến Tre'),
(N'Bình Định'),
(N'Bình Phước'),
(N'Bình Thuận'),
(N'Cao Bằng'),
(N'Đắk Nông'),
(N'Điện Biên'),
(N'Hà Giang'),
(N'Hà Tĩnh'),
(N'Hải Dương'),
(N'Hòa Bình'),
(N'Hậu Giang'),
(N'Hưng Yên'),
(N'Kon Tum'),
(N'Lai Châu'),
(N'Lào Cai'),
(N'Nam Định'),
(N'Nghệ An'),
(N'Phú Thọ'),
(N'Phú Yên'),
(N'Quảng Bình'),
(N'Quảng Nam'),
(N'Quảng Ngãi'),
(N'Quảng Ninh'),
(N'Quảng Trị'),
(N'Sóc Trăng'),
(N'Sơn La'),
(N'Tây Ninh'),
(N'Thái Bình'),
(N'Thái Nguyên'),
(N'Thanh Hóa'),
(N'Trà Vinh'),
(N'Tuyên Quang'),
(N'Vĩnh Phúc'),
(N'Yên Bái'),
(N'Lạng Sơn'),
(N'Hà Nam'),
(N'Ninh Bình'),
(N'Ninh Thuận');

INSERT INTO District (DistrictName, CityID) VALUES
-- Hà Nội
(N'Ba Đình', 1),
(N'Ba Vì', 1),
(N'Bắc Từ Liêm', 1),
(N'Cầu Giấy', 1),
(N'Chương Mỹ', 1),
(N'Đan Phượng', 1),
(N'Đông Anh', 1),
(N'Đống Đa', 1),
(N'Gia Lâm', 1),
(N'Hà Đông', 1),
(N'Hai Bà Trưng', 1),
(N'Hoài Đức', 1),
(N'Hoàn Kiếm', 1),
(N'Hoàng Mai', 1),
(N'Tây Hồ', 1),
(N'Long Biên', 1),
(N'Mê Linh', 1),
(N'Mỹ Đức', 1),
(N'Nam Từ Liêm', 1),
(N'Phú Xuyên', 1),
(N'Thanh Xuân', 1),
(N'Phúc Thọ', 1),
(N'Quốc Oai', 1),
(N'Sóc Sơn', 1),
(N'Tây Hồ', 1),
(N'Thạch Thất', 1),
(N'Thanh Oai', 1),
(N'Thanh Trì', 1),
(N'Thanh Xuân', 1),
(N'Thường Tín', 1),
(N'Sơn Tây', 1),
(N'Ứng Hòa', 1),
--HCM
(N'Quận 1', 2),
(N'Quận 3', 2),
(N'Quận 4', 2),
(N'Quận 5', 2),
(N'Quận 6', 2),
(N'Quận 7', 2),
(N'Quận 8', 2),
(N'Quận 10', 2),
(N'Quận 11', 2),
(N'Quận 12', 2),
(N'Bình Thạnh', 2),
(N'Gò Vấp', 2),
(N'Phú Nhuận', 2),
(N'Tân Bình', 2),
(N'Tân Phú', 2),
(N'Bình Tân', 2),
(N'Bình Chánh', 2),
(N'Củ Chi', 2),
(N'Hóc Môn', 2),
(N'Nhà Bè', 2),
(N'Cần Giờ', 2),
(N'TP Thủ Đức', 2),

-- Đà Nẵng
(N'Hải Châu', 3),
(N'Thanh Khê', 3),
(N'Sơn Trà', 3),
(N'Ngũ Hành Sơn', 3),
(N'Liên Chiểu', 3),
(N'Cẩm Lệ', 3),
(N'Hòa Vang', 3),
(N'Hoàng Sa', 3),

-- Hải Phòng
(N'Hồng Bàng', 4),
(N'Lê Chân', 4),
(N'Ngô Quyền', 4),
(N'Kiến An', 4),
(N'Hải An', 4),
(N'Đồ Sơn', 4),
(N'Dương Kinh', 4),
(N'Thủy Nguyên', 4),
(N'An Dương', 4),
(N'An Lão', 4),
(N'Kiến Thụy', 4),
(N'Tiên Lãng', 4),
(N'Vĩnh Bảo', 4),
(N'Cát Hải', 4),
(N'Bạch Long Vĩ', 4),

-- Cần Thơ
(N'Ninh Kiều', 5),
(N'Ô Môn', 5),
(N'Bình Thủy', 5),
(N'Cái Răng', 5),
(N'Thốt Nốt', 5),
(N'Vĩnh Thạnh', 5),
(N'Cờ Đỏ', 5),
(N'Phong Điền', 5),
(N'Thới Lai', 5),

-- Lâm Đồng
(N'Bảo Lâm', 6),
(N'Cát Tiên', 6),
(N'Đạ Huoai', 6),
(N'Đạ Tẻh', 6),
(N'Đam Rông', 6),
(N'Di Linh', 6),
(N'Đơn Dương', 6),
(N'Đức Trọng', 6),
(N'Lạc Dương', 6),
(N'Lâm Hà', 6),
(N'TP Bảo Lộc', 6),
(N'TP Đà Lạt', 6),

-- Huế
(N'Phú Vang', 7),
(N'Phú Lộc', 7),
(N'Nam Đông', 7),
(N'A Lưới', 7),
(N'Hương Thủy', 7),
(N'Hương Trà', 7),
(N'Quảng Điền', 7),
(N'Phong Điền', 7),

-- Khánh Hòa
(N'Diên Khánh', 8),
(N'Ninh Hòa', 8),
(N'Cam Lâm', 8),
(N'Vạn Ninh', 8),
(N'Khánh Sơn', 8),
(N'Khánh Vĩnh', 8),
(N'Ninh Hòa', 8),
(N'TP Cam Ranh', 8),
(N'TP Nha Trang', 8),
(N'Trường Sa', 8),
(N'Vạn Ninh', 8),

-- Vũng Tàu
(N'TP Bà Rịa', 9),
(N'Long Điền', 9),
(N'Đất Đỏ', 9),
(N'Châu Đức', 9),
(N'Xuyên Mộc', 9),
(N'Côn Đảo', 9),
(N'Tân Thành', 9),

-- Đăk lắk
(N'Cư Mgar', 10),
(N'Cư Kuin', 10),
(N'Ea HLeo', 10),
(N'Ea Kar', 10),
(N'Krông Ana', 10),
(N'Krông Bông', 10),
(N'Krông Buk', 10),
(N'Krông Năng', 10),
(N'Krông Pắc', 10),
(N'Lăk', 10),
(N'Buôn Đôn', 10),
(N'Ea Sup', 10),
(N'MDrak', 10),

-- Gia Lai
(N'An Khê', 11),
(N'Ayun Pa', 11),
(N'Chư Păh', 11),
(N'Chư Prông', 11),
(N'Chư Sê', 11),
(N'Đắk Đoa', 11),
(N'Đắk Pơ', 11),
(N'Đức Cơ', 11),
(N'Ia Grai', 11),
(N'Ia Pa', 11),
(N'Kbang', 11),
(N'Kông Chro', 11),
(N'Krông Pa', 11),
(N'Mang Yang', 11),
(N'Phú Thiện', 11),

-- Kiên Giang
(N'Giang Thành', 12),
(N'Vĩnh Thuận', 12),
(N'Giồng Riềng', 12),
(N'Gò Quao', 12),
(N'Hòn Đất', 12),
(N'Tân Hiệp', 12),
(N'An Minh', 12),
(N'An Biên', 12),
(N'Châu Thành', 12),
(N'Kiên Lương', 12),
(N'U Minh Thượng', 12),
(N'Vĩnh Bảo', 12),
(N'Kiên Hải', 12),
(N'Phú Quốc', 12),
(N'TP Rạch Giá', 12),

-- AN Giang
(N'TP Châu Đốc', 13),
(N'Tân Châu', 13),
(N'An Phú', 13),
(N'Châu Phú', 13),
(N'Châu Thành', 13),
(N'Phú Tân', 13),
(N'Thoại Sơn', 13),
(N'Tri Tôn', 13),
(N'Tịnh Biên', 13),
(N'TP Long Xuyên', 13),
(N'Chợ mới', 13),

-- Bình Dương
(N'TP Dĩ An', 14),
(N'TP Thuận An', 14),
(N'TP Bến Cát', 14),
(N'TP Tân Uyên', 14),
(N'Bàu Bàng', 14),
(N'Bắc Tân Uyên', 14),
(N'Phú Giáo', 14),
(N'Dầu Tiếng', 14),
(N'TP Thủ Dầu Một', 14),

-- Đồng Nai
(N'Long Khánh', 15),
(N'Xuân Lộc', 15),
(N'Thống Nhất', 15),
(N'Trảng Bom', 15),
(N'Cẩm Mỹ', 15),
(N'Long Thành', 15),
(N'Nhơn Trạch', 15),
(N'Vĩnh Cửu', 15),
(N'Định Quán', 15),
(N'Tân Phú', 15),
(N'TP Biên Hòa', 15),

-- Vĩnh Long
(N'Bình Tân', 16),
(N'Long Hồ', 16),
(N'Mang Thít', 16),
(N'Tam Bình', 16),
(N'Trà Ôn', 16),
(N'Vũng Liêm', 16),
(N'TX Bình Minh', 16),

-- Đồng Tháp
(N'TP Sa Đéc', 17),
(N'TX Hồng Ngự', 17),
(N'Lai Vung', 17),
(N'Lấp Vò', 17),
(N'Tam Nông', 17),
(N'Thanh Bình', 17),
(N'Tháp Mười', 17),
(N'Châu Thành', 17),
(N'Tân Hồng', 17),
(N'Cao Lãnh', 17),

-- Long An
(N'Bến Lức', 18),
(N'Cần Đước', 18),
(N'Cần Giuộc', 18),
(N'Châu Thành', 18),
(N'Đức Hòa', 18),
(N'Đức Huệ', 18),
(N'Mộc Hóa', 18),
(N'Tân Hưng', 18),
(N'Tân Thạnh', 18),
(N'Tân Trụ', 18),
(N'Thạnh Hóa', 18),
(N'Thủ Thừa', 18),
(N'Vĩnh Hưng', 18),
(N'Tân An', 18),
(N'Kiến Tường', 18),

-- Cà Mau
(N'Ngọc Hiển', 19),
(N'Năm Căn', 19),
(N'Phú Tân', 19),
(N'Thới Bình', 19),
(N'Trần Văn Thời', 19),
(N'U Minh', 19),
(N'Cái Nước', 19),
(N'Đầm Dơi', 19),

-- Bạc Liêu
(N'Giá Rai', 20),
(N'Hòa Bình', 20),
(N'Hồng Dân', 20),
(N'Phước Long', 20),
(N'Vĩnh Lợi', 20),
(N'Đông Hải', 20),

--Tiền Giang
(N'Cái Bè', 21),
(N'Cai Lậy', 21),
(N'Châu Thành', 21),
(N'Gò Công Đông', 21),
(N'Gò Công Tây', 21),
(N'Tân Phú Đông', 21),
(N'Tân Phước', 21),
(N'TP Mỹ Tho', 21),
(N'TP Gò Công', 21),

-- Bắc Giang
(N'Lạng Giang', 22),
(N'Hiệp Hòa', 22),
(N'Lục Nam', 22),
(N'Lục Ngạn', 22),
(N'Sơn Đông', 22),
(N'Tây Yên', 22),
(N'Bắc Giang', 22),
(N'TP Bắc Giang', 22),
(N'Việt Yên', 22),
(N'Yên Dũng', 22),
(N'Yên Thế', 22),

--Bắc Cạn
(N'Ba Bế', 23),
(N'Bạch Thông', 23),
(N'Chợ Đồn', 23),
(N'Chợ Mới', 23),
(N'Na Rì', 23),
(N'Ngân Sơn', 23),
(N'Pác Nặm', 23),

--Bắc Ninh
(N'Gia Bình', 24),
(N'Lương Tài', 24),
(N'Quế Võ', 24),
(N'Thuận Thành', 24),
(N'Tiên Du', 24),
(N'TX Từ Sơn', 24),
(N'Yên Phong', 24),

--Bến Tre
(N'Ba Tri', 25),
(N'Bình Đại', 25),
(N'Châu Thành', 25),
(N'Chợ Lách', 25),
(N'Giồng Trôm', 25),
(N'Mỏ Cày Bắc', 25),
(N'Mỏ Cày Nam', 25),
(N'Thạch Phú', 25),

-- Bình Định
(N'An Lão', 26),
(N'Hoài Ân', 26),
(N'Hoài Nhơn', 26),
(N'Phù Cát', 26),
(N'Phù Mỹ', 26),
(N'Tây Sơn', 26),
(N'TP Quy Nhơn', 26),
(N'Tuy Phước', 26),
(N'TX An Nhơn', 26),
(N'Vân Canh', 26),
(N'Vĩnh Thạnh', 26),

--Bình Phước
(N'Bù Đăng', 27),
(N'Bù Đớp', 27),
(N'Bù Gia Mập', 27),
(N'Chơn Thành', 27),
(N'Đồng Phú', 27),
(N'Hớn Quản', 27),
(N'Lộc Ninh', 27),
(N'TX Bình Long', 27),
(N'TX Đồng Xoài', 27),
(N'TX Phước Long', 27),

--Bình Thuận
(N'Bắc Bình', 28),
(N'Đức Linh', 28),
(N'Hàm Tân', 28),
(N'Hàm Thuận Bắc', 28),
(N'Hàm Thuận Nam', 28),
(N'Phú Quý', 28),
(N'Tánh Linh', 28),
(N'TP Phan Thiết', 28),
(N'Tuy Phong', 28),
(N'TX La Gi', 28),

--Cao Bằng
(N'Bảo Lạc', 29),
(N'Bảo Lâm', 29),
(N'Hạ Lang', 29),
(N'Hà Quảng', 29),
(N'Hòa An', 29),
(N'Nguyên Bình', 29),
(N'Phục Hòa', 29),
(N'Quảng Uyên', 29),
(N'Thạch An', 29),
(N'Thông Nông', 29),
(N'TP Cao Bằng', 29),
(N'Trà Lĩnh', 29),
(N'Trùng Khánh', 29),

--Đắk Nông
(N'Cư Jut', 30),
(N'Đắk Mil', 30),
(N'Đắk Glong', 30),
(N'Đắk R Lấp', 30),
(N'Đắk Song', 30),
(N'Krong Nô', 30),
(N'Tuy Đức', 30),
(N'TX Gia Nghĩa', 30),

--Điện Biên
(N'Điện Biên', 31),
(N'Điện Biên Đông', 31),
(N'Mường Ảng', 31),
(N'Mường Trà', 31),
(N'Mường Láy', 31),
(N'Mường Nhé', 31),
(N'Nậm Pồ', 31),
(N'TP Điện Biên Phủ', 31),
(N'Tủa Chùa', 31),
(N'Tuần Giáo', 31),

--Hà Giang
(N'Bắc Mê', 32),
(N'Bắc Quang', 32),
(N'Đồng Văn', 32),
(N'Hoàng Su Phì', 32),
(N'Mèo Vạc', 32),
(N'Quản Bạ', 32),
(N'Quang Bình', 32),
(N'TP Hà Giang', 32),
(N'Vị Xuyên', 32),
(N'Xín Mần', 32),
(N'Yên Minh', 32),

--Hà Tĩnh
(N'Cẩm Xuyên', 33),
(N'Can Lộc', 33),
(N'Đức Thọ', 33),
(N'Hồng Lĩnh', 33),
(N'Khương Khê', 33),
(N'Khương Sơn', 33),
(N'Kỳ Anh', 33),
(N'Lộc Hà', 33),
(N'Nghi Xuân', 33),
(N'Thạch Hà', 33),
(N'TP Hà Tĩnh', 33),
(N'Vũ Quang', 33),

--Hải Dương
(N'Bình Giang', 34),
(N'Cẩm Giàng', 34),
(N'Gia Lộc', 34),
(N'Kim Môn', 34),
(N'Kim Thành', 34),
(N'Nam Sách', 34),
(N'Ninh Giang', 34),
(N'Thanh Hà', 34),
(N'Thanh Miện', 34),
(N'TP Hải Dương', 34),
(N'Tứ Kỳ', 34),
(N'TX Chí Linh', 34),

--Hòa Bình
(N'Cao Phong', 35),
(N'Đà Bắc', 35),
(N'Kỳ Sơn', 35),
(N'Kim Bôi', 35),
(N'Lạc Sơn', 35),
(N'Lạc Thủy', 35),
(N'Lương Sơn', 35),
(N'Mai Châu', 35),
(N'Tân Lạc', 35),
(N'TP Hòa Bình', 35),
(N'Yên Thủy', 35),

--Hậu Giang
(N'Châu Thành', 36),
(N'Châu Thành A', 36),
(N'Long Mỹ', 36),
(N'Phụng Hiệp', 36),
(N'TP Vị Thanh', 36),
(N'TX Ngã Bảy', 36),
(N'Vị Thủy', 36),

--Hưng Yên
(N'Ân Thi', 37),
(N'Khoái Châu', 37),
(N'Kim Động', 37),
(N'Mỹ Hào', 37),
(N'Phù Cừ', 37),
(N'Tiên Lữ', 37),
(N'TP Hưng Yên', 37),
(N'Văn Giang', 37),
(N'Văn Lâm', 37),
(N'Yên Mỹ', 37),

--Kon Tum
(N'Đắk Glei', 38),
(N'Đak Hà', 38),
(N'Đak Tô', 38),
(N'Kon Plong', 38),
(N'Kon Rẫy', 38),
(N'Ngọc Hồi', 38),
(N'Sa Thầy', 38),
(N'TP Kon Tum', 38),
(N'Tu Mơ Rông', 38),

--Lai Châu
(N'Mường Tè', 39),
(N'Nậm Nhùn', 39),
(N'Phong Thổ', 39),
(N'Sìn Hồ', 39),
(N'Tam Đường', 39),
(N'Tân Uyên', 39),
(N'Than Uyên', 39),
(N'TP Lai Châu', 39),

--Lào Cai
(N'Bắc Hà', 40),
(N'Bảo Thắng', 40),
(N'Bảo Yên', 40),
(N'Bát Xát', 40),
(N'Mường Khương', 40),
(N'Sa Pa', 40),
(N'Si Ma Cai', 40),
(N'TP Lào Cai', 40),
(N'Văn Bàn', 40),

--Nam Định
(N'Giao Thủy', 41),
(N'Hải Hậu', 41),
(N'Mỹ Lộc', 41),
(N'Nam Trực', 41),
(N'Nghĩa Hưng', 41),
(N'TP Nam Định', 41),
(N'Vụ Bản', 41),
(N'Xuân Trường', 41),
(N'Ý Yên', 41),

--Nghệ An
(N'Anh Sơn', 42),
(N'Diễn Châu', 42),
(N'Đô Lương', 42),
(N'Hưng Nguyên', 42),
(N'Kỳ Sơn', 42),
(N'Nam Đàn', 42),
(N'Nghi Lộc', 42),
(N'Nghĩa Đàn', 42),
(N'Quế Phong', 42),
(N'Quỳ Châu', 42),
(N'Quỳ Hợp', 42),
(N'Quỳnh Lưu', 42),
(N'Tân Kỳ', 42),
(N'Thanh Chương', 42),
(N'TP Vinh', 42),
(N'Tương Dương', 42),
(N'TX Cửa Lò', 42),
(N'TX Hoàng Mai', 42),
(N'Yên Thành', 42),

--Phú Thọ
(N'Cẩm Khê', 43),
(N'Đoan Hùng', 43),
(N'Hạ Hòa', 43),
(N'Lâm Thao', 43),
(N'Phù Ninh', 43),
(N'Tam Nông', 43),
(N'Tân Sơn', 43),
(N'Thanh Ba', 43),
(N'Thanh Thủy', 43),
(N'TP Việt Trì', 43),
(N'TX Phú Thọ', 43),
(N'Yên Lập', 43),

--Phú Yên
(N'Đông Hòa', 44),
(N'Đông Xuân', 44),
(N'Phú Hòa', 44),
(N'Sơn Hà', 44),
(N'Sông Hinh', 44),
(N'Tây Hòa', 44),
(N'TP Tuy Hòa', 44),
(N'TX Sông Cầu', 44),

--Quảng Bình
(N'Bố Trạch', 45),
(N'Lệ Thủy', 45),
(N'Minh Hóa', 45),
(N'Quảng Ninh', 45),
(N'Quảng Trạch', 45),
(N'TP Đồng Hới', 45),
(N'Tuyên Hóa', 45),
(N'TX Ba Đồn', 45),

--Quảng Nam
(N'Bắc Trà My', 46),
(N'Đại Lộc', 46),
(N'Điện Bàn', 46),
(N'Đông Giang', 46),
(N'Duy Xuyên', 46),
(N'Hiệp Đức', 46),
(N'Nam Giang', 46),
(N'Nam Trà My', 46),
(N'Nông Sơn', 46),
(N'Núi Thanh', 46),
(N'Phú Ninh', 46),
(N'Phước Sơn', 46),
(N'Quế Sơn', 46),
(N'Tây Giang', 46),
(N'Thăng Bình', 46),
(N'Tiên Phước', 46),
(N'TP Hội An', 46),
(N'TP Tam Kỳ', 46),

--Quảng Ngãi
(N'Ba Tơ', 47),
(N'Bình Sơn', 47),
(N'Đức Phổ', 47),
(N'Minh Long', 47),
(N'Mộ Đức', 47),
(N'Nghĩa Hành', 47),
(N'Sơn Hà', 47),
(N'Sơn Tây', 47),
(N'Sơn Tịnh', 47),
(N'Tây Trà', 47),
(N'TP Quảng Ngãi', 47),
(N'Trà Bồng', 47),
(N'Tư Nghĩa', 47),

--Quảng Ninh
(N'Ba Chẽ', 48),
(N'Bình Liêu', 48),
(N'Cô Tô', 48),
(N'Đầm Hà', 48),
(N'Đông Triều', 48),
(N'Hải Hà', 48),
(N'Hoành Bồ', 48),
(N'Tiên Yên', 48),
(N'TP Cẩm Phả', 48),
(N'Hạ Long', 48),
(N'Móng Cái', 48),
(N'Uông Bí', 48),
(N'Quảng Yên', 48),
(N'Vân Đồn', 48),
(N'Yên Hưng', 48),

--Quảng Trị
(N'Cam Lộ', 49),
(N'Cồn Cỏ', 49),
(N'Da KRong', 49),
(N'Gio Linh', 49),
(N'Hải Lăng', 49),
(N'Hướng Hóa', 49),
(N'TP Đông Hà', 49),
(N'Triệu Phong', 49),
(N'TX Quảng Trị', 49),
(N'Vĩnh Linh', 49),

--Sóc Trăng
(N'Châu Thành', 50),
(N'Cù Lao Dung', 50),
(N'Kế Sách', 50),
(N'Long Phú', 50),
(N'Mỹ Tú', 50),
(N'Mỹ Xuyên', 50),
(N'Thạnh Trị', 50),
(N'TP Sóc Trăng', 50),
(N'Trấn Đề', 50),
(N'TX Ngã Năm', 50),
(N'TX Vĩnh Châu', 50),

--Sơn La
(N'Bắc Yên', 51),
(N'Mai Sơn', 51),
(N'Mộc Châu', 51),
(N'Mường La', 51),
(N'Phù Yên', 51),
(N'Quỳnh Nhai', 51),
(N'Sông Mã', 51),
(N'Sốp Cộp', 51),
(N'Thuận Châu', 51),
(N'TP Sơn La', 51),
(N'Vân Hồ', 51),
(N'Yên Châu', 51),

--Tây Ninh
(N'Bến Cấu', 52),
(N'Châu Thành', 52),
(N'Dương Minh Châu', 52),
(N'Gò Dầu', 52),
(N'Hòa Thành', 52),
(N'Tân Biên', 52),
(N'Tân Châu', 52),
(N'TP Tây Ninh', 52),
(N'Trảng Bàng', 52),

--Thái Bình
(N'Đông Hưng', 53),
(N'Hưng Hà', 53),
(N'Kiến Xương', 53),
(N'Quỳnh Phụ', 53),
(N'Thái Thụy', 53),
(N'Tiền Hải', 53),
(N'TP Thái Bình', 53),
(N'Vũ Thư', 53),

--Thái Nguyên
(N'Đại Từ', 54),
(N'Định Hóa', 54),
(N'Đồng Hỷ', 54),
(N'Phổ Yên', 54),
(N'Phú Bình', 54),
(N'Phú Lương', 54),
(N'TP Thái Nguyên', 54),
(N'TX Sông Công', 54),
(N'Võ Nhai', 54),

--Thanh Hóa
(N'Bá Thước', 55),
(N'Cẩm Thủy', 55),
(N'Đông Sơn', 55),
(N'Hà Trung', 55),
(N'Hậu Lộc', 55),
(N'Hoằng Hóa', 55),
(N'Lang Chánh', 55),
(N'Mường Lát', 55),
(N'Nga Sơn', 55),
(N'Ngọc Lặc', 55),
(N'Như Thanh', 55),
(N'Như Xuân', 55),
(N'Nông Cống', 55),
(N'Quan Hóa', 55),
(N'Quan Sơn', 55),
(N'Quảng Xương', 55),
(N'Thạch Thành', 55),
(N'Thiệu Hóa', 55),
(N'Thọ Xuân', 55),
(N'Thường Xuân', 55),
(N'Tĩnh Gia', 55),
(N'TP Thanh Hóa', 55),
(N'Triệu Sơn', 55),
(N'TX Bỉm Sơn', 55),
(N'TX Sầm Sơn', 55),
(N'Vĩnh Lộc', 55),
(N'Yên Định', 55),

--Trà Vinh
(N'Càng Long', 56),
(N'Cầu Kè', 56),
(N'Cầu Ngang', 56),
(N'Châu Thành', 56),
(N'Duyên Hải', 56),
(N'Tiểu Cần', 56),
(N'TP Trà Vinh', 56),
(N'Trà Cú', 56),

--Tuyên Quang
(N'Chiêm Hóa', 57),
(N'Hàm Yên', 57),
(N'Lâm Bình', 57),
(N'Na Hang', 57),
(N'Sơn Dương', 57),
(N'TP Tuyên Quang', 57),
(N'Yên Sơn', 57),

--Vĩnh Phúc
(N'Bình Xuyên', 58),
(N'Lập Thạch', 58),
(N'Sông Lô', 58),
(N'Tam Đảo', 58),
(N'Tam Dương', 58),
(N'TP Vĩnh Yên', 58),
(N'TX Phúc Yên', 58),
(N'Vĩnh Tường', 58),
(N'Yên Lạc', 58),

--Yên Bái
(N'Lục Yên', 59),
(N'Mù Cang Chải', 59),
(N'TP Yên Bái', 59),
(N'Trấn Yên', 59),
(N'TX Nghĩa Lộ', 59),
(N'Văn Chấn', 59),
(N'Văn Yên', 59),
(N'Yên Bình', 59),

--Lạng Sơn
(N'Bắc Sơn', 60),
(N'Bình Gia', 60),
(N'Cao Lộc', 60),
(N'Chi Lăng', 60),
(N'Đình Lập', 60),
(N'Hữu Lũng', 60),
(N'Lộc Bình', 60),
(N'TP Lạng Sơn', 60),
(N'Tràng Đình', 60),
(N'Văn Lãng', 60),
(N'Văn Quan', 60),

--Hà Nam
(N'Bình Lục', 61),
(N'Duy Tiên', 61),
(N'Kim Bảng', 61),
(N'Lý Nhân', 61),
(N'Thanh Liêm', 61),
(N'TP Phủ Lý', 61),

--Ninh Bình
(N'Gia Viễn', 62),
(N'Hoa Lư', 62),
(N'Kim Sơn', 62),
(N'Nho Quan', 62),
(N'TP Ninh Bình', 62),
(N'TX Tam Điệp', 62),
(N'Yên Khánh', 62),
(N'Yên Mô', 62),

--Ninh Thuận
(N'Bắc Ái', 63),
(N'Ninh Hải', 63),
(N'Ninh Phước', 63),
(N'Ninh Sơn', 63),
(N'Thuận Bắc', 63),
(N'Thuận Nam', 63),
(N'TP Phan Rang - Tháp Chàm', 63);

go
INSERT INTO StatusOrder(StatusOrderName) 
Values (N'Chờ xác nhận'),
(N'Đang giao'),
(N'Đã hủy'),
(N'Hoàn thành');
go	
