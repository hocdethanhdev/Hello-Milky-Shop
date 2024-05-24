const Sequelize = require('sequelize');

// Khởi tạo kết nối Sequelize
const sequelize = new Sequelize('HelloMilkyShop', 'sa', '12345', {
  host: 'localhost',
  dialect: 'mssql',
});

// Import các model
const Role = require('./role')(sequelize, Sequelize);
const User = require('./user')(sequelize, Sequelize);
const Chat = require('./chat')(sequelize, Sequelize);
const ArticleCategory = require('./articleCategory')(sequelize, Sequelize);
const Article = require('./article')(sequelize, Sequelize);
const Report = require('./report')(sequelize, Sequelize);
const Brand = require('./brand')(sequelize, Sequelize);
const ProductCategory = require('./productCategory')(sequelize, Sequelize);
const Product = require('./product')(sequelize, Sequelize);
const Payment = require('./payment')(sequelize, Sequelize);
const Order = require('./orders')(sequelize, Sequelize);
const Voucher = require('./voucher')(sequelize, Sequelize);
const UserVoucher = require('./userVoucher')(sequelize, Sequelize);
const VoucherOrder = require('./voucherOrder')(sequelize, Sequelize);
const OrderDetail = require('./orderDetail')(sequelize, Sequelize);
const Promotion = require('./promotion')(sequelize, Sequelize);
const ProductPromotionList = require('./productPromotionList')(sequelize, Sequelize);

// Định nghĩa mối quan hệ giữa các bảng
User.belongsTo(Role, { foreignKey: 'RoleID' });
Chat.belongsTo(User, { foreignKey: 'MemberID' });
Chat.belongsTo(User, { foreignKey: 'StaffID' });
Article.belongsTo(User, { foreignKey: 'AuthorID' });
Article.belongsTo(ArticleCategory, { foreignKey: 'ArticleCategoryID' });
Report.belongsTo(User, { foreignKey: 'UserID' });
Product.belongsTo(Brand, { foreignKey: 'BrandID' });
Product.belongsTo(ProductCategory, { foreignKey: 'ProductCategoryID' });
Order.belongsTo(User, { foreignKey: 'UserID' });
Order.belongsTo(Payment, { foreignKey: 'PaymentID' });
VoucherOrder.belongsTo(Voucher, { foreignKey: 'VoucherID' });
VoucherOrder.belongsTo(Order, { foreignKey: 'OrderID' });
OrderDetail.belongsTo(Order, { foreignKey: 'OrderID' });
OrderDetail.belongsTo(Product, { foreignKey: 'ProductID' });
ProductPromotionList.belongsTo(Product, { foreignKey: 'ProductID' });
ProductPromotionList.belongsTo(Promotion, { foreignKey: 'PromotionID' });

// Thêm mối quan hệ giữa Product và Promotion
Product.belongsToMany(Promotion, { through: ProductPromotionList, foreignKey: 'ProductID' });
Promotion.belongsToMany(Product, { through: ProductPromotionList, foreignKey: 'PromotionID' });


// Export các model và đối tượng Sequelize
module.exports = {
  Role,
  User,
  Chat,
  ArticleCategory,
  Article,
  Report,
  Brand,
  ProductCategory,
  Product,
  Payment,
  Order,
  Voucher,
  UserVoucher,
  VoucherOrder,
  OrderDetail,
  Promotion,
  ProductPromotionList,
  // Export các model khác ở đây
  sequelize, // Đối tượng Sequelize để sử dụng các phương thức của nó
  Sequelize, // Đối tượng Sequelize cho việc định nghĩa các kiểu dữ liệu và ràng buộc
};
