const User = require("../bo/user");
const userRepository = require("../repository/userRepository");

const userService = {
  getOne: async (id) => {
    return await userRepository.getOne(id);
  },

  getAllUsers: async (req, res) => {
    return await userRepository.getAllUsers();
  },
  deleteUser: async (user_id) => {
    return await userRepository.deleteUser(user_id);
  },
  updateUser: async (user_id, user) => {
    return await userRepository.updateUser(user_id, user);
  },
  getUserByRole: async (ID) => {
    return await userRepository.getUserByRole(ID);
  },
};

module.exports = userService;
