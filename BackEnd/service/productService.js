const productRepository = require("../repository/productRepository");

const productService = {

  getTop6ProductByBrand: async (id) => {
    return await productRepository.getTop6ProductByBrand(id);
  },

  getProductInforID: async (id) => {
    return await productRepository.getProductInforID(id);
  },

  getAllBrandByCategory: async (pc) => {
    return await productRepository.getAllBrandByCategory(pc);
  },

  getProductByCategory: async (pc) => {
    return await productRepository.getProductByCategory(pc);
  },

  getAllProducts: async (req, res) => {
    return await productRepository.getAllProducts();
  },
  getAllBrands: async (req, res) => {
    return await productRepository.getAllBrands();
  },
  searchWithBrand: async (name, brand) => {
    return await productRepository.searchWithBrand(name, brand);
  },
  getAllProductCategory: async (req, res) => {
    return await productRepository.getAllProductCategory();
  },
  searchWithProductCategory: async (name, pc) => {
    return await productRepository.searchWithProductCategory(name, pc);
  },
  searchWithPrice: async (name, min, max) => {
    return await productRepository.searchWithPrice(name, min, max);
  },
  searchWithName: async (name) => {
    return await productRepository.searchWithName(name);
  },
  getInfoProductsDetail: async (req, res) => {
    return await productRepository.getInfoProductsDetail();
  },
  updateProduct: async (product_id, product) => {
    return await productRepository.updateProduct(product_id, product);
  },
  createProduct: async (product) => {
    return await productRepository.createProduct(product);
  },
  deleteProduct: async (product_id) => {
    return await productRepository.deleteProduct(product_id);
  },
  getProductDetailByID: async (product_id) => {
    return await productRepository.getProductDetailByID(product_id);
  },
  getProductInfoByID : async (product_id) => {
    return await productRepository.getProductInfoByID(product_id);
  },
  get5ProductsLowestFinalPrice : async () => {
    return await productRepository.get5ProductsLowestFinalPrice();
  },
  getTop6MilksForPregnantMother : async () => {
    return await productRepository.getTop6MilksForPregnantMother();
  },
  getTop6MilkForBaby : async () => {
    return await productRepository.getTop6MilkForBaby();
  },
};

module.exports = productService;
