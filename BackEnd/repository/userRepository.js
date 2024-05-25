const userDAO = require("../dao/userDAO");

const userRepository = {
    getAllUsers : async () => {
    return await userDAO.findAllUsers();
  }
}

module.exports = userRepository;