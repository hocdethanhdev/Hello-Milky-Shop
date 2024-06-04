const router = require("express").Router();

const productController = require("../controller/productController");

router.get("/getAllProducts", productController.getAllProducts);

router.get("/getInfoProductsDetail", productController.getInfoProductsDetail);

router.put("/editProduct/:product_id", productController.updateProduct);

router.post("/createProduct", productController.createProduct);

router.put("/deleteProduct/:product_id", productController.deleteProduct);

router.get("/getAllBrands", productController.getAllBrands);

router.get("/getAllProductCategory", productController.getAllProductCategory);

router.get("/searchWithBrand/:name/:brand", productController.searchWithBrand);

router.get(
  "/searchWithProductCategory/:name/:pc",
  productController.searchWithProductCategory
);

router.get(
  "/searchWithPrice/:name/:min_price/:max_price",
  productController.searchWithPrice
);

router.get("/searchWithName/:name", productController.searchWithName);

router.get("/getProductDetailByID/:id", productController.getProductDetailByID);

router.get("/getProductByCategory/:pc", productController.getProductByCategory);

module.exports = router;
