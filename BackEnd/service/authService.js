const userDAO = require("../dao/userDAO");
const bcrypt = require("bcryptjs");

const login = async (login) => {
  const user = await userDAO.login(login);
  if (user.err) {
    return { err: user.err };
  }
  return user;
};

const loginEmail = async (email) => {
  const user = await userDAO.loginEmail(email);
  if (user.err) {
    return { err: user.err };
  }
  return user;
};

const register = async (userName, phone, password, role) => {
  const user = await userDAO.register(userName, phone, password, role);
  if (user.err) {
    return { err: user.err };
  }
  return user;
};

const hashPassword = async (password) => {
  return bcrypt.hash(password, 8);
};

module.exports = {
  login,
  register,
  hashPassword,
  loginEmail,
};
