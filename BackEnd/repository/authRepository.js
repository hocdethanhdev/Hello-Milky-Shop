const userDAO = require("../dao/userDAO");

const authRepository = {
  login: async (login) => {
    return await userDAO.login(login);
  },
  register: async (name, phone, password, role) => {
    return await userDAO.register(name, phone, password, role);
  },
  /*
  logout: async (token) => {
    return await userDAO.logout(token);
  },
  */
};

module.exports = authRepository;
