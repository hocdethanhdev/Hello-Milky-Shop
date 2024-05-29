const authRepository = require("../repository/authRepository");
const bcrypt = require("bcryptjs");

const userService = {
  login: async (login) => {
    return await authRepository.login(login);
  },
  register: async (name, phone, password, role) => {
    return await authRepository.register(name, phone, password, role);
  },
  hasPassword: (password) => {
    const passwordHash = bcrypt.hashSync(password, 10);
    return passwordHash;
  },
  /*
  logout: async (token) => {
    return await authRepository.logout(token);
  },
  */
};

module.exports = userService;
