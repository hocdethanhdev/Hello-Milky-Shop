const shippingAddressService = require("../service/shippingAddressService");

const getInfoShippingByUserID = async (req, res) => {
    try {
        const obj = await shippingAddressService.getInfoShippingByUserID(req.params.ID);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getInfoShippingByOrderID = async (req, res) => {
    try {
        const obj = await shippingAddressService.getInfoShippingByOrderID(req.params.orderID);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
}

const getShippingAddressIsDeleted = async (req, res) => {
    try {
        const obj = await shippingAddressService.getShippingAddressIsDeleted();
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const updateDeleted = async (req, res) => {
    try {
      const obj = await shippingAddressService.updateDeleted(req.params.shippingAddress_id);
      res.send(obj);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  };

  const getInfoAddressWithOrderNearest = async (req, res) => {
    try {
        const {UserID} = req.body;
        const obj = await shippingAddressService.getInfoAddressWithOrderNearest(UserID);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};
module.exports = {
    getInfoShippingByUserID,
    getInfoShippingByOrderID,
    getShippingAddressIsDeleted,
    updateDeleted,
    getInfoAddressWithOrderNearest
}