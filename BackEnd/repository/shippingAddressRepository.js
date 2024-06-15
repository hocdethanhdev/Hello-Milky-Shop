const shippingAddressDAO = require("../dao/shippingAddressDAO");

const shippingAddressRepository = {
    getInfoShippingByUserID: async (ID) => {
    return await shippingAddressDAO.findInfoShippingByUserID(ID);
  },
}

module.exports = shippingAddressRepository;