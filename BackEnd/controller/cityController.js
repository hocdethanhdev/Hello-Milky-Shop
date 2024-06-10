const cityService = require("../service/cityService");

const getAllCities= async (rep, res) => {
    try {
        const obj = await cityService.getAllCities();
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all server",error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
     getAllCities
}