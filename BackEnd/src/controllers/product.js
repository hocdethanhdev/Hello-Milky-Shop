const { where } = require('sequelize');
const { Product } = require('../models');


const getAll = async (req, res) => {
    try {
        const product = await Product.findAll();
        res.json(product);
      } catch (error) {
        console.error('Error while fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const getProductsByCategory = async (req, res) => {
    try {
        const cate = parseInt(req.params.id);

        const products = await Product.findAll({where: {ProductCategoryID: cate}});
        res.json(products);
      } catch (error) {
        console.error('Error while fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = {
    getAll,
    getProductsByCategory
}