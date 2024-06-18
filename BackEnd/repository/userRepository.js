const userDAO = require("../dao/userDAO");

const userRepository = {

  usePoint: async (UserID) => {
    return await userDAO.usePoint(UserID);
  },

  countUserByRole: async (RoleID) => {
    return await userDAO.countUserByRole(RoleID);
  },

  getUserByID: async (id) => {
    return await userDAO.getUserByID(id);
  },

  getOne: async (id) => {
    return await userDAO.getOne(id);
  },

  getAllUsers: async () => {
    return await userDAO.findAllUsers();
  },

  deleteUser: async (user_id) => {
    return await userDAO.deleteUser(user_id);
  },
  updateUser: async (user_id, user) => {
    return await userDAO.updateUser(user_id, user);
  },
  getUserByRole: async (ID) => {
    return await userDAO.findUserByRole(ID);
  },
  changePointOfUser: async (userID, minusPoint) => {
    return await userDAO.changePointOfUser(userID, minusPoint);
  }
}

module.exports = userRepository;