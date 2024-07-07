const userDAO = require("../dao/userDAO");

const authRepository = {

  findOrCreate : async (email, name) => {
    return await userDAO.findOrCreate(email, name);
  },

  changePassword : async (Password, UserID) => {
    return await userDAO.changePassword(Password, UserID);
  },

  checkOldPassword : async (OldPass, UserID) => {
    return await userDAO.checkOldPassword(OldPass, UserID);
  },

  checkPhoneNumber : async (PhoneNumber) => {
    return await userDAO.checkPhoneNumber(PhoneNumber);
  },
  
  forgetPassword : async (Password, UserID) => {
    return await userDAO.forgetPassword(Password, UserID);
  },
  login: async (login) => {
    return await userDAO.login(login);
  },
  register: async (name, phone, password, role) => {
    return await userDAO.register(name, phone, password, role);
  },
  loginEmail: async (email) => {
    return await userDAO.loginEmail(email);
  },
  
};

module.exports = authRepository;
