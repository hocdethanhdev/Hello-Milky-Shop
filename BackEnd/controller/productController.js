const productService = require("../service/productService");

const getAllProducts = async (req, res) => {
    try {
        const obj = await productService.getAllProducts();
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getAllBrands = async (req, res) => {
    try {
        const obj = await productService.getAllBrands();
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const searchWithBrand = async (req, res) => {
    try {
        const obj = await productService.searchWithBrand(req.params.name ,req.params.brand);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const searchWithProductCategory = async (req, res) => {
    try {
        const obj = await productService.searchWithProductCategory(req.params.name ,req.params.pc);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const searchWithPrice = async (req, res) => {
    try {
        const obj = await productService.searchWithPrice(req.params.name, req.params.min_price, req.params.max_price);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getAllProductCategory = async (req, res) => {
    try {
        const obj = await productService.getAllProductCategory();
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getInfoProductsDetail = async (req, res) => {
    try {
        const obj = await productService.getInfoProductsDetail();
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const updateProduct = async (req, res) => {
    try {
        const obj = await productService.updateProduct(req.params.product_id, req.body);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const createProduct = async (req, res) => {
    try {
        const obj = await productService.createProduct(req.body);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const deleteProduct = async (req, res) => {
    try {
        const obj = await productService.deleteProduct(req.params.product_id);
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
}
