
const shippingAddressRepository = require("../repository/shippingAddressRepository");

const shippingAddressService = {

    getInfoShippingByUserID : async (ID) => {
  return await shippingAddressRepository.getInfoShippingByUserID(ID);
},

getInfoShippingByOrderID: async (orderID) => {
  return await shippingAddressRepository.getInfoShippingByOrderID(orderID);
},
}
module.exports = shippingAddressService;