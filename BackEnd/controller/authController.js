const authService = require("../service/authService");
const passport = require('passport');
const User = require('../bo/user');


const login = async (req, res) => {
    try {
      const obj = await authService.login(req.body);
      res.send(obj);
    } catch (error) {
      console.error("Error while logging in:", error);
      res.status(500).send("Internal Server Error");
    }
  };

let checkLoggedOut = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    next();
};

const register = async (req, res) => {
  try {
    const { UserName, PhoneNumber, Password, RoleID } = req.body;
    const hashedPassword = await authService.hashPassword(Password);
    const obj = await authService.register(UserName, PhoneNumber, hashedPassword, RoleID);
    res.send(obj);
  } catch (error) {
    console.error("Error while registering:", error);
    res.status(500).send("Internal Server Error");
  }
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error while logging out:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect("/");
    }
  });
};

const loginEmail = async (req, res) => {
  try {
    const obj = await authService.loginEmail(req.params.email);
    console.log(JSON.parse(obj))
    res.send(obj);
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
    checkLoggedOut,
    login,
    register,
    logout,
    loginEmail,
}
