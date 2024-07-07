const router = require("express").Router();
const authController = require("../controller/authController");
const passport = require("passport");
require('dotenv').config();

router.post("/login", authController.login);

router.post("/register", authController.register);

router.post("/logout", authController.logout);

router.post("/google-login", authController.loginGoogle);

router.post('/loginEmail', authController.loginEmail);

router.post("/checkPhoneNumber", authController.checkPhoneNumber);

router.put("/forgetPassword", authController.forgetPassword);

router.put('/changePassword', authController.changePassword);

module.exports = router;
