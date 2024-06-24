
const shippingAddressRepository = require("../repository/shippingAddressRepository");

const shippingAddressService = {

  getInfoShippingByUserID: async (ID) => {
    return await shippingAddressRepository.getInfoShippingByUserID(ID);
  },

  getInfoShippingByOrderID: async (orderID) => {
    return await shippingAddressRepository.getInfoShippingByOrderID(orderID);
  },

  getShippingAddressIsDeleted: async () => {
    return await shippingAddressRepository.getShippingAddressIsDeleted();
  },

  updateDeleted: async (shippingAddress_id) => {
    return await shippingAddressRepository.updateDeleted(shippingAddress_id);
  },
}
module.exports = shippingAddressService;