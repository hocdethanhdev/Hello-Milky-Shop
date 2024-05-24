const { Op } = require("sequelize");
const {
  Product,
  Promotion,
  ProductPromotionList,
  Brand,
} = require("../models");

const getTop6ProductsByCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);

    const products = await Product.findAll({
      where: { ProductCategoryID: categoryId },
      include: [
        {
          model: Brand,
          attributes: ['BrandName'], // Chỉ lấy thuộc tính BrandName
        },
        {
          model: Promotion,
          through: {
            model: ProductPromotionList,
          },
          attributes: ['DiscountPercentage'], // Chỉ lấy thuộc tính DiscountPercentage
          required: false, // Chỉ lấy sản phẩm có promotion
          where: {
            StartDate: { [Op.lte]: new Date() },
            EndDate: { [Op.gte]: new Date() },
          },
        },
      ],
    });

    res.json(products);
  } catch (error) {
    console.error('Error while fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPromotionalProducts = async (req, res) => {
  try {
    const currentDate = new Date();
    const products = await Product.findAll({
      include: [
        {
          model: Promotion,
          through: {
            model: ProductPromotionList,
          },
          where: {
            StartDate: { [Op.lte]: currentDate },
            EndDate: { [Op.gte]: currentDate },
            DiscountPercentage: { [Op.gte]: 0.15 },
          },
        },
      ],
    });

    res.json(products);
  } catch (error) {
    console.error("Error while fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const cate = parseInt(req.params.id);

    const products = await Product.findAll({
      where: { ProductCategoryID: cate },
      include: [
        { model: Brand }, 
        { 
          model: Promotion, 
          attributes: ['DiscountPercentage'], 
          through: { attributes: [] } 
        }
      ],
    });

    res.json(products);
  } catch (error) {
    console.error("Error while fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  getProductsByCategory,
  getPromotionalProducts,
  getTop6ProductsByCategory
};
