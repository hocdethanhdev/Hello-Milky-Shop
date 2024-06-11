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
  "/searchWithProductCategory/:pc",
  productController.searchWithProductCategory
);

router.get(
  "/searchWithPrice/:name/:min_price/:max_price",
  productController.searchWithPrice
);

router.get("/searchWithName", productController.searchWithName);

router.get("/getProductDetailByID/:id", productController.getProductDetailByID);

router.get("/getProductByCategory/:pc", productController.getProductByCategory);

router.get("/getAllBrandByCategory/:pc", productController.getAllBrandByCategory);

router.get("/getProductInforID/:id", productController.getProductInforID);

router.get('/getProductInfoByID/:product_id', productController.getProductInfoByID);

router.get('/get5ProductsLowestFinalPrice', productController.get5ProductsLowestFinalPrice);

router.get('/getTop6MilksForPregnantMother', productController.getTop6MilksForPregnantMother);

router.get('/getTop6MilkForBaby', productController.getTop6MilkForBaby);

router.get('/getTop6ProductByBrand/:id', productController.getTop6ProductByBrand)

module.exports = router;
