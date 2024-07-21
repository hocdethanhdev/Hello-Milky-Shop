const brandService = require("../service/brandService");

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
    addBrand
}