const router = require("express").Router();
const authController = require("../controller/authController");
const passport = require("passport");
require('dotenv').config();

router.post("/login", authController.login);

router.post("/register", authController.register);

router.post("/logout", authController.logout);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, profile) => {
    req.user = profile;
    next();
  })(req, res, next);
}, (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/login-email/${req.user?.emails[0].value}`)
});

router.post('/loginEmail', authController.loginEmail);

module.exports = router;
