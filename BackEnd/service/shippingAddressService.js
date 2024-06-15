
const shippingAddressRepository = require("../repository/shippingAddressRepository");

const shippingAddressService = {

    getInfoShippingByUserID : async (ID) => {
  return await shippingAddressRepository.getInfoShippingByUserID(ID);
},
}
module.exports = shippingAddressService;