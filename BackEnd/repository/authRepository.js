const userDAO = require("../dao/userDAO");

const authRepository = {
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
