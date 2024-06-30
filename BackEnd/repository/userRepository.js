const userDAO = require("../dao/userDAO");

const userRepository = {
  updateInforUser: async (UserID, UserName, Email, PhoneNumber) => {
    return await userDAO.updateInforUser(UserID, UserName, Email, PhoneNumber);
  },
  updateUserEmail: async (UserID, Email) => {
    return await userDAO.updateUserEmail(UserID, Email);
  },
  updateUserName: async (UserID, UserName) => {
    return await userDAO.updateUserName(UserID, UserName);
  },
  updateUserPhoneNumber: async (UserID, PhoneNumber) => {
    return await userDAO.updateUserPhoneNumber(UserID, PhoneNumber);
  },

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

  deleteUser: async (user_id, status) => {
    return await userDAO.deleteUser(user_id, status);
  },
  updateUser: async (user_id, user) => {
    return await userDAO.updateUser(user_id, user);
  },
  getUserByRole: async (ID) => {
    return await userDAO.findUserByRole(ID);
  },
  changePointOfUser: async (userID, minusPoint) => {
    return await userDAO.changePointOfUser(userID, minusPoint);
  },
};

module.exports = userRepository;
