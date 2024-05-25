const userRepository = require("../repository/userRepository");

const userService = {

    getAllUsers : async (req, res) => {
      return await userRepository.getAllUsers();
    }
  }

module.exports = userService;
