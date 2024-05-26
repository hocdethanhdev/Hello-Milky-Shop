const productDAO = require("../dao/productDAO");

const productRepository = {
  getAllProducts: async () => {
    return await productDAO.findAllProducts();
  },

  getAllBrands: async () => {
    return await productDAO.getAllBrands();
  },

  searchWithBrand: async (name, brand) => {
    return await productDAO.searchWithBrand(name, brand);
  },

  getAllProductCategory: async () => {
    return await productDAO.getAllProductCategory();
  },

  searchWithProductCategory: async (name, pc) => {
    return await productDAO.searchWithProductCategory(name, pc);
  },

  searchWithPrice: async (name, min, max) => {
    return await productDAO.searchWithPrice(name, min, max);
  },

  searchWithName: async (name) => {
    return await productDAO.searchWithName(name);
  },

  getInfoProductsDetail: async () => {
    return await productDAO.findInfoProductsDetail();
  },
  updateProduct: async (product_id, product) => {
    return await productDAO.updateProduct(product_id, product);
  },
  createProduct: async (product) => {
    return await productDAO.createProduct(product);
  },
  deleteProduct: async (product_id) => {
    return await productDAO.deleteProduct(product_id);
  },
};

module.exports = productRepository;
