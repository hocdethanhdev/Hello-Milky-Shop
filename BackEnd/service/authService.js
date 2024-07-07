const authRepository = require("../repository/authRepository");
const bcrypt = require("bcryptjs");

const changePassword = async (Password, UserID) => {
  const user = await authRepository.changePassword(Password, UserID);
  return user;
};

const findOrCreate = async (email, name) => {
  const user = await authRepository.findOrCreate(email, name);
  return user;
};

const checkOldPassword = async (OldPass, UserID) => {
  const user = await authRepository.checkOldPassword(OldPass, UserID);
  return user;
};

const checkPhoneNumber = async (PhoneNumber) => {
  const user = await authRepository.checkPhoneNumber(PhoneNumber);
  return user;
};

const forgetPassword = async (Password, UserID) => {
  try {
    const user = await authRepository.forgetPassword(Password, UserID);
    return user;
  } catch (error) {
    console.error("Error in forgetPassword service:", error);
    throw error;
  }
};


const login = async (login) => {
  const user = await authRepository.login(login);
  if (user.err) {
    return { err: user.err };
  }
  return user;
};

const loginEmail = async (email) => {
  const user = await authRepository.loginEmail(email);
  if (user.err) {
    return { err: user.err };
  }
  return user;
};

const register = async (userName, phone, password, role) => {
  const user = await authRepository.register(userName, phone, password, role);
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
  checkPhoneNumber,
  forgetPassword,
  checkOldPassword,
  changePassword,
  findOrCreate,
};
