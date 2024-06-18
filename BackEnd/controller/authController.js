const authService = require("../service/authService");
const passport = require("passport");
const User = require("../bo/user");
const jwt = require("jsonwebtoken");

const changePassword = async (req, res) => {
  try {
    let obj;
    const { NewPass, OldPass, UserID } = req.body;
    const hashedOldPass = await authService.hashPassword(OldPass);
    const checkOldPass = await authService.checkOldPassword(hashedOldPass, UserID);
    if (checkOldPass.status){
      const hashedNewPass = await authService.hashPassword(NewPass);
      obj = await authService.changePassword(hashedNewPass, UserID);
    }else {
      return res.status(400).send({ message: "Old password is incorrect" });
    }
    
    res.send(obj);
  } catch (error) {
    console.error("Error in forgetPassword controller:", error);
    res.status(500).send("Internal Server Error");
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { Password, UserID } = req.body;
    const hashedPassword = await authService.hashPassword(Password);
    const obj = await authService.forgetPassword(hashedPassword, UserID);
    res.send(obj);
  } catch (error) {
    console.error("Error in forgetPassword controller:", error);
    res.status(500).send("Internal Server Error");
  }
};

const checkPhoneNumber = async (req, res) => {
  try {
    const { PhoneNumber } = req.body;
    const obj = await authService.checkPhoneNumber(PhoneNumber);
    res.send(obj);
  } catch (error) {
    console.error("Error in checkPhoneNumber controller:", error);
    res.status(500).send("Internal Server Error");
  }
};

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
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

const register = async (req, res) => {
  try {
    const { UserName, PhoneNumber, Password, RoleID } = req.body;
    const hashedPassword = await authService.hashPassword(Password);
    const obj = await authService.register(
      UserName,
      PhoneNumber,
      hashedPassword,
      RoleID
    );
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
  const { email } = req?.body;
  try {
    if (!email)
      res.status(404).json({
        err: 1,
        message: "Missing input",
      });
    const obj = await authService.loginEmail(email);
    res.status(200).json(obj);
  } catch (error) {
    res.status(500).json({
      err: -1,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  checkLoggedOut,
  login,
  register,
  logout,
  loginEmail,
  checkPhoneNumber,
  forgetPassword,
  changePassword,
};
