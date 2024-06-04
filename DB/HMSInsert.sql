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
('VinaMilk');
INSERT INTO Brand (BrandName) VALUES
	('Abbott Grow');
select * from Brand
insert into ProductCategory values (N'Sữa cho mẹ bầu'), (N'Sữa cho em bé')


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
('P001', N'Sữa Celia Expert số 3 - 900g (1-3 tuổi)', N'Thế giới bên ngoài luôn diệu kì và kích thích sự tìm tòi, khám phá nơi trẻ. Hãy cùng Lactalist chăm sóc bé yêu tốt nhất với sữa celia Expert số 3, hộp thiếc 900g, dành cho trẻ từ 1 - 3 tuổi. Với những ưu điểm vượt trội, Celia Expert 3 giúp tăng cường hệ miễn dịch, cho bé cơ thể khỏe mạnh, cao lớn, thông minh, thỏa sức khám phá những điều mới mẻ. Sữa ở dạng bột mịn, óng, không bị vón cục và không có tạp chất lạ. Sữa bột cho bé Celia Expert số 3 (900g) màu kem trắng, có mùi thơm của sữa, có vị tinh bột và vị ngọt tự nhiên của sữa mẹ.', 410000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230411/sua-celia-expert-so-3-900g.png', '2025-12-31', '2024-01-01', 17, 2)

INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa bột Meiji HP cho bé dị ứng đạm sữa bò 850g', N'Sữa bột Meiji HP cho bé dị ứng đạm sữa bò 850g Bé của bạn dị ứng đạm sữa bò, bạn phân vân không biết nên cho bé uống sữa nào? Và mua ở đâu chất lượng mà giá phải chăng.Sữa Meiji HP Mirufi dành cho bé dị ứng đạm bò Khối lượng: 850gr Sữa Meiji HP là một dòng sản phẩm của tập đoàn Meiji Nhật ', 870000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230316/sua-bot-meiji-hp-cho-be-di-ung-dam-sua-bo-850g.png', '2025-12-31', '2024-01-01', 18, 2)

INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Meiji số 9 - 800gr (1-3 tuổi)', N'Sữa Meiji số 9 là sản phẩm sữa của Nhật với hương vị gần giống sữa mẹ, dễ uống, cung cấp đầy đủ chất dinh dưỡng cần thiết cho trẻ trong giai đoạn phát triển này.

Sữa Meiji số 9 là một dòng sản phẩm cao cấp dành cho thị trường nội địa Nhật Bản, được sản xuất dựa trên công nghệ hiện đại theo tiêu chuẩn dinh dưỡng do chính phủ Nhật Bản quy định hoàn toàn được làm từ nguyên liệu sữa sạch, tuân thủ nghiêm ngặt các yêu cầu về chất lượng và vệ sinh an toàn thực phẩm đạt tiêu chuẩn ISO 9001. ', 394000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230422/sua-meiji-so-9-820gr.jpg', '2025-12-31', '2024-01-01', 18, 2)

INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Meiji 0 (0-1 tuổi) Infant Formula EZcube (16 thanh)', N'Sữa Meiji thanh Infant Formula EZcube số 0 gồm 16 thanh được sản xuất trên dây chuyên công nghệ tiên tiến hoàn toàn tự động, đạt tiêu chuẩn ISO9001 nên cha mẹ có thể yên tâm khi bé yêu sử dụng. Sữa có công thức gần giống sữa mẹ, với vị thơm ngon dễ uống, đáp ứng nhu cầu dinh dưỡng của bé từ 0 đến 1 tuổi. Sản phẩm được đóng trong hộp giấy gồm 16 thanh tiện dụng để mẹ mang theo để pha cho bé khi đi du lịch, đi chơi xa hay về quê.', 355000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20240528/san-pham-dinh-duong-cong-thuc-cho-tre-tu-0-12-thang-meiji-0-1-year-old-infant-formula-ezcube-540g.png', '2025-12-31', '2024-01-01', 18, 2)

INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa bột Meiji HP cho bé dị ứng đạm sữa bò (6 thanh)', N'Sữa bột Meiji HP cho bé dị ứng đạm sữa bò (6 thanh) dành cho trẻ bị dị ứng sữa bò, “kén sữa”, giúp bé tăng trưởng tốt nhất. Đây là dòng sữa có chứa các enzym phân giải đạm sữa chất lượng cao và không chứa đường Lactose nên sữa có hương vị thơm ngon như sữa mẹ, rất dễ uống, giúp bé dễ hấp thu dinh dưỡng hiệu quả hơn.', 250000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230614/sua-bot-meiji-hp-cho-be-di-ung-dam-sua-bo-6-thanh-1.jpg', '2025-12-31', '2024-01-01', 19, 2)

INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa bột Milo (1kg)', N'Sữa bột Milo (1kg) với công thức tối ưu vitamin và khoáng chất giúp tăng trưởng chiều cao một cách vượt trội, góp phần giúp bé có một thể lực tốt nhất. Thành phần chính từ lúa mạch, hương sô cô la thơm ngon, giúp bé cảm thấy ngon miệng mỗi ngày. Công thức toàn diện của Milo dành cho bé từ 24 tháng tuổi trở lên.', 280000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230419/sua-bot-milo-1kg.png', '2025-12-31', '2024-01-01', 19, 2)

INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Kid Essentials Nestle 800g (1-10 tuổi)', N'Sữa Kid Essentials Nestle (800g) được sản xuất bởi thương hiệu Nestle hàng đầu của Úc, đảm bảo chất lượng cũng như độ an toàn cho trẻ khi sử dụng. Sản phẩm có bổ sung tinh bột, là thức ăn bổ sung có công thức đặc biệt, giúp bé không bị chán hay ngấy, dành cho các bé đặc biệt lười ăn, chậm tăng cân, sau ốm. Sữa có thể uống thay cơm, thay thực phẩm (nếu bé bị chán ăn) & có thể uống nhiều lần trong ngày tùy thích. ', 580000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230606/sua-kid-essentials-nestle-800g-1-10-tuoi.jpg', '2025-12-31', '2024-01-01', 19, 2)

INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa Nan Nga số 4 800g (từ 18 tháng trở lên)', N'Bạn nên chọn sữa NAN Nga số 4 cho trẻ vì các chất chính như: ARA, DHA, lactose đều được bổ sung trong sữa. giúp bé phát triển cân nặng, chiều cao, cơ xương,… Vừa tăng cường hệ thống miễn dịch. Bé lớn hơn 1 tuổi sẽ cho con uống những loại sữa phù hợp hơn những chất dinh dưỡng được yêu nhất cho trẻ, bổ sung các dưỡng chất cần thiết cho sự phát triển thể chất và trí não, với yếu tố kết hợp để giúp bé tăng cường sức đề kháng và phát triển trí thông minh ở trẻ. ',469000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230322/sua-nan-nga-so-4-800g-tu-18-thang-tro-len.jpg', '2025-12-31', '2024-01-01', 19, 2)

INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa tiệt trùng Nestle NutriStrong hương socola 180ml (lốc 4 hộp)', N'Sữa tiệt trùng Nestle NutriStrong hương socola 180ml với công thức NutriStrong cung cấp đến 25% nhu cầu canxi cần thiết mỗi ngày cho trẻ, kết hợp cùng các dưỡng chất thiết yếu như Vitamin D, A, B3, B6, B8, B9 và chất đạm, cho xương chắc khỏe, giúp bé luôn mạnh mẽ để sẵng sàng trước mọi thử thách hằng ngày.', 33000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230621/sua-tiet-trung-socola-nestle-180ml-2.jpg', '2025-12-31', '2024-01-01', 19, 2)

INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa tiệt trùng Nestle NutriStrong hương dâu 180ml (lốc 4 hộp)', N'Sữa tiệt trùng Nestle NutriStrong hương dâu 180ml với công thức NutriStrong cung cấp đến 25% nhu cầu canxi cần thiết mỗi ngày cho trẻ, kết hợp cùng các dưỡng chất thiết yếu như Vitamin D, A, B3, B6, B8, B9 và chất đạm, cho xương chắc khỏe, giúp bé luôn mạnh mẽ để sẵng sàng trước mọi thử thách hằng ngày.', 33000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230621/sua-tiet-trung-huong-dau-trang-nestle-nutristrong-180ml-3.jpghttps://media.shoptretho.com.vn/upload/image/product/20230621/sua-tiet-trung-huong-dau-trang-nestle-nutristrong-180ml-3.jpg', '2025-12-31', '2024-01-01', 19, 2)

INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa tiệt trùng Nestle NutriStrong có đường 180ml (lốc 4 hộp)', N'Sữa tiệt trùng Nestle NutriStrong có đường 180ml với công thức NutriStrong cung cấp đến 25% nhu cầu canxi cần thiết mỗi ngày cho trẻ, kết hợp cùng các dưỡng chất thiết yếu như Vitamin D, A, B3, B6, B8, B9 và chất đạm, cho xương chắc khỏe, giúp bé luôn mạnh mẽ để sẵng sàng trước mọi thử thách hằng ngày.', 33000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230621/sua-tiet-trung-co-duong-nestle-nutristrong-180ml-2.jpg', '2025-12-31', '2024-01-01', 19, 2)

INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Bột cacao pha sữa Nestle Nesquik Chocolate Mỹ 266g', N'Bột cacao pha sữa Nestle Nesquik Chocolate Mỹ 266g với thành phần cacao nguyên chất, được bổ sung thêm một số dưỡng chất như: vitamin C, D, B6 và khoáng chất thiết yếu, ít đường, ít chất béo và không chứa các chất tạo hương, tạo vị, chất bảo quản. Sản phẩm là sự lựa chọn hoàn hảo cho sức khỏe của cả gia đình, bạn có thể dùng làm đồ uống mỗi buổi sáng, thêm vào sữa cho bé yêu, hay làm món bánh sô-cô-la ngon béo,..', 345000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230418/bot-cacao-pha-sua-nestle-nesquik-chocolate-my-266g.png', '2025-12-31', '2024-01-01', 19, 2)

INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa bột Nan Pelargon - 400g', N'Sữa bột Nestle Nan Pelargon - 400g là loại sữa có chất liệu an toàn từ chính những dinh dưỡng từ tự nhiên và chế biến từ sữa bò nguyên kem với 20% và chất béo này được coi như sữa công thức dành cho trẻ sơ sinh. Với những cách chọn và sử dụng sữa bột Nestle Nan Pelargon 400g là một loại sữa có chất dinh dưỡng với những cách chọn và sử dụng các loại dinh dưỡng tốt nhất cho trẻ, chống các bệnh về đường tiêu hóa sẽ nguy hại đến trẻ do lên men từ vi khuẩn lactic chọn lọc. Sữa bột Pelargon được đánh giá là có thành phần giống như sữa mẹ nên bé trong độ tuổi từ 0 - 12 tháng đều sử dụng được.', 214000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20150323/sua-bot-nan-pelargon-400g-new-2.png', '2025-12-31', '2024-01-01', 19, 2)

INSERT INTO Product (ProductID, ProductName, Description, Price, StockQuantity, Image, ExpirationDate, ManufacturingDate, BrandID, ProductCategoryID) VALUES
('P001', N'Sữa nước Nestlé NAN Optipro Kid 115ml (lốc 6 hộp)', N'Sữa nước Nestlé NAN Optipro Kid 115ml (lốc 6 hộp) chứa đầy đủ các dưỡng chất thiết yếu như Omega 3, Canxi, Vitamin D… giúp trẻ phát triển toàn diện về thể chất và trí tuệ, để trẻ có thể phát huy tối đa tiềm năng trong tương lai. Sản phẩm được pha sẵn, đóng trong hộp giấy tiện lợi, để mẹ mang theo cho trẻ khi đến trường, đi du lịch, đi chơi...', 62000, 50, 'https://media.shoptretho.com.vn/upload/image/product/20230323/sua-nuoc-nestle-nan-optipro-kid-115ml-loc-6-hop.png', '2025-12-31', '2024-01-01', 19, 2)

INSERT INTO Voucher ( DiscountPercentage, MaxDiscount, MinDiscount, StartDate, ExpiryDate, VoucherName, Quantity)
VALUES
  ( 10, 100000, 0,'2024-12-30', '2024-12-31', 'Voucher 1',10),
  ( 15, 150000, 0,'2024-12-30', '2024-12-31', 'Voucher 2',10),
  ( 20, 200000, 0,'2024-12-30', '2024-12-31', 'Voucher 3',10),
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
