const productRepository = require("../repository/productRepository");

const productService = {

    getAllProducts : async (req, res) => {
      return await productRepository.getAllProducts();
    },
    getAllBrands : async (req, res) => {
      return await productRepository.getAllBrands();
    },
    searchWithBrand : async (name, brand) => {
      return await productRepository.searchWithBrand(name, brand);
    },
    getAllProductCategory : async (req, res) => {
      return await productRepository.getAllProductCategory();
    },
    searchWithProductCategory : async (name,pc) => {
      return await productRepository.searchWithProductCategory(name, pc);
    },
    searchWithPrice : async (name, min, max) => {
      return await productRepository.searchWithPrice(name, min, max);
    },
    searchWithName : async (name) => {
      return await productRepository.searchWithName(name);
    },
    getInfoProductsDetail : async (req, res) => {
      return await productRepository.getInfoProductsDetail();
    },
    updateProduct : async (product_id, product) => {
      return await productRepository.updateProduct(product_id, product);
    },
    createProduct : async (product) => {
      return await productRepository.createProduct(product);
    },
    deleteProduct : async (product_id) => {
      return await productRepository.deleteProduct(product_id);
    },
    getProductDetailByID : async (product_id) => {
      return await productRepository.getProductDetailByID(product_id);
    },
  }

module.exports = productService;
