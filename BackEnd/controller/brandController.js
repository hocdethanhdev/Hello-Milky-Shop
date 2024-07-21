const brandService = require("../service/brandService");


const getAll = async (req, res) => {
    try {
        const brands = await brandService.getAll();
        if (!brands || brands.length === 0) {
            res.status(404).send('No brands found');
        } else {
            res.send(brands);
        }
    } catch (error) {
        console.error("Error while getting all brands:", error);
        res.status(500).send("Internal Server Error");
    }
};
const addBrand = async (req, res) => {
    try {
        const { BrandName } = req.body;
        const obj = await brandService.addBrand(BrandName);
        if (!obj)
            res.status(404).send('Not found')
        res.send(obj);
    } catch (error) {
        console.error("Error while add brand:", error);
        res.status(500).send("Internal Server Error");
    }
};
module.exports = {
    getAll,
    addBrand
}