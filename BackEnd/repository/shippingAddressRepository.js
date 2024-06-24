const shippingAddressDAO = require("../dao/shippingAddressDAO");

const shippingAddressRepository = {
  getInfoShippingByUserID: async (ID) => {
    return await shippingAddressDAO.findInfoShippingByUserID(ID);
  },

  getInfoShippingByOrderID: (orderID) => {
    return shippingAddressDAO.findInfoShippingByOrderID(orderID);
  },

  getShippingAddressIsDeleted: () => {
    return shippingAddressDAO.findShippingAddressIsDeleted();
  },

  updateDeleted: async (shippingAddress_id) => {
    return await shippingAddressDAO.updateIsDeleted(shippingAddress_id);
  },
}

module.exports = shippingAddressRepository;