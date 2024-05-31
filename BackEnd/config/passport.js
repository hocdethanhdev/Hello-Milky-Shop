const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const passport = require("passport");
const userDAO = require("../dao/userDAO");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      if (profile?.id) {
        await userDAO.findOrCreate(profile);
      }
      return cb(null, profile);
    }
  )
);
