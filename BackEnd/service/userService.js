const User = require("../bo/user");
const userRepository = require("../repository/userRepository");

const userService = {

    getAllUsers : async (req, res) => {
      return await userRepository.getAllUsers();
    },
    deleteUser : async (user_id) => {
      return await userRepository.deleteUser(user_id);
    },
    updateUser : async (user_id, user) => {
      return await userRepository.updateUser(user_id, user);
    },
    getUserByRoleID : async (ID) => {
      return await userRepository.getUserByRoleID(ID);
    },
  }

module.exports = userService;