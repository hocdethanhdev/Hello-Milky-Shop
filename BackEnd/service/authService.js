const authRepository = require("../repository/authRepository");

const userService = {
  login: async (login) => {
    return await authRepository.login(login);
  },
  register: async (register) => {
    return await authRepository.register(register);
  },
  /*
  logout: async (token) => {
    return await authRepository.logout(token);
  },
  */
};

module.exports = userService;
