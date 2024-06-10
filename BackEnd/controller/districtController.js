const districtService = require("../service/districtService");

const getDistrictByID = async (req, res) => {
    try {
        const obj = await districtService.getDistrictByID (req.params.ID);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};  
module.exports = {
    getDistrictByID
}