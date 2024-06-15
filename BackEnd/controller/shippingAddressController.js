const shippingAddressService = require("../service/shippingAddressService");

const getInfoShippingByUserID = async (req, res) => {
    try {
        const obj = await shippingAddressService.getInfoShippingByUserID (req.params.ID);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};
module.exports = {
    getInfoShippingByUserID

}