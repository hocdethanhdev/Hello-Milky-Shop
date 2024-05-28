const userDAO = require("../dao/userDAO");

const authRepository = {
  login: async (login) => {
    return await userDAO.login(login);
  },
  register: async (register) => {
    return await userDAO.register(register);
  },
  /*
  logout: async (token) => {
    return await userDAO.logout(token);
  },
  */
};

module.exports = authRepository;
