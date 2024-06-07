const productService = require("../service/productService");

const getTop6ProductByBrand = async (req, res) => {
  try {
    const obj = await productService.getTop6ProductByBrand(req.params.brand);
    res.status(200).json(obj)
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

const getProductInforID = async (req, res) => {
  try {
    const obj = await productService.getProductInforID(req.params.id);
    res.status(200).json(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

const getProductByCategory = async (req, res) => {
  try {
    const obj = await productService.getProductByCategory(req.params.pc);
    res.status(200).json(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getAllProducts = async (req, res) => {
  try {
    const obj = await productService.getAllProducts();
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getAllBrands = async (req, res) => {
  try {
    const obj = await productService.getAllBrands();
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const searchWithBrand = async (req, res) => {
  try {
    const obj = await productService.searchWithBrand(
      req.params.name,
      req.params.brand
    );
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const searchWithProductCategory = async (req, res) => {
  try {
    const obj = await productService.searchWithProductCategory(
      req.params.name,
      req.params.pc
    );
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const searchWithPrice = async (req, res) => {
  try {
    const obj = await productService.searchWithPrice(
      req.params.name,
      req.params.min_price,
      req.params.max_price
    );
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const searchWithName = async (req, res) => {
  try {
    const name = req.query.search; // Lấy giá trị từ query parameter 'timkiem'

  if (!name) {
    return res.status(400).json({ error: 'Query không hợp lệ' });
  }
    const obj = await productService.searchWithName(name);
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getAllProductCategory = async (req, res) => {
  try {
    const obj = await productService.getAllProductCategory();
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getInfoProductsDetail = async (req, res) => {
  try {
    const obj = await productService.getInfoProductsDetail();
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const checkDateValid = (ExpirationDate, ManufacturingDate) => {
  if (Date.parse(ExpirationDate) < Date.parse(ManufacturingDate)) {
    return false;
  }
  return true;
};

const checkStockQuantity = (StockQuantity) => {
  if (Number.parseInt(StockQuantity) < 0) return false;
  return true;
};

const updateProduct = async (req, res) => {
  try {
    const product = req.body;
    if (!checkDateValid(product.ExpirationDate, product.ManufacturingDate))
      return res.status(400).send({
        err: 1,
        message: "ExpirationDate must be after ManufacturingDate!",
      });

    if (!checkStockQuantity(product.StockQuantity))
      return res.status(400).send({
        err: 1,
        message: "StockQuantity must be more than 0",
      });

    const obj = await productService.updateProduct(
      req.params.product_id,
      product
    );
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const createProduct = async (req, res) => {
  try {
    const product = req.body;
    if (!checkDateValid(product.ExpirationDate, product.ManufacturingDate))
      return res.status(400).send({
        err: 1,
        message: "ExpirationDate must be after ManufacturingDate!",
      });

    if (!checkStockQuantity(product.StockQuantity))
      return res.status(400).send({
        err: 1,
        message: "StockQuantity must be more than 0",
      });
    const obj = await productService.createProduct(req.body);
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const obj = await productService.deleteProduct(req.params.product_id);
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getProductDetailByID = async (req, res) => {
  try {
    const obj = await productService.getProductDetailByID(
      req.params.product_id
    );
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getAllBrandByCategory = async (req, res) => {
  try {
    const obj = await productService.getAllBrandByCategory(req.params.pc);
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getProductInfoByID = async (req, res) => {
  try {
    const obj = await productService.getProductInfoByID(req.params.product_id);
    res.send(obj);
  } catch (error) {
    console.error("Error while getting all users:", error);
    res.status(500).send("Internal Server Error");
  }
};
const get5ProductsLowestFinalPrice = async (req, res) => {
  try {
    const obj = await productService.get5ProductsLowestFinalPrice();
    res.send(obj);
  } catch (error) {
    console.error("Error while getting all users:", error);
    res.status(500).send("Internal Server Error");
  }
};
  const getTop6MilksForPregnantMother = async (req, res) => {
    try {
      const obj = await productService.getTop6MilksForPregnantMother();
      res.send(obj);
    } catch (error) {
      console.error("Error while getting all users:", error);
      res.status(500).send("Internal Server Error");
    }
};
const getTop6MilkForBaby = async (req, res) => {
  try {
    const obj = await productService.getTop6MilkForBaby();
    res.send(obj);
  } catch (error) {
    console.error("Error while getting all users:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllProducts,
  getInfoProductsDetail,
  updateProduct,
  createProduct,
  deleteProduct,
  getAllBrands,
  getAllProductCategory,
  searchWithBrand,
  searchWithProductCategory,
  searchWithPrice,
  searchWithName,
  getProductDetailByID,
  getProductByCategory,
  getAllBrandByCategory,
  getProductInfoByID,
  get5ProductsLowestFinalPrice,
  getTop6MilksForPregnantMother,
  getTop6MilkForBaby,
  getProductInforID,
  getTop6ProductByBrand,
};
