const shippingAddressDAO = require("../dao/shippingAddressDAO");

const shippingAddressRepository = {
    getInfoShippingByUserID: async (ID) => {
    return await shippingAddressDAO.findInfoShippingByUserID(ID);
  },

  getInfoShippingByOrderID: (orderID) => {
    return shippingAddressDAO.findInfoShippingByOrderID(orderID);
},
}

module.exports = shippingAddressRepository;