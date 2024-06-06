const userDAO = require("../dao/userDAO");

const userRepository = {
  getAllUsers: async () => {
    return await userDAO.findAllUsers();
  },

  deleteUser: async (user_id) => {
    return await userDAO.deleteUser(user_id);
  },
  updateUser: async (user_id, user) => {
    return await userDAO.updateUser(user_id, user);
  },
  getUserByRoleID: async (ID) => {
    return await userDAO.findUserByRoleID(ID);
  },
}

module.exports = userRepository;