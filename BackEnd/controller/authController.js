const { OAuth2Client } = require("google-auth-library");
const authService = require("../service/authService");
const chatService = require("../service/chatService");
const userService = require("../service/userService");

const changePassword = async (req, res) => {
  try {
    let obj;
    const { NewPass, OldPass, UserID } = req.body;
    const checkOldPass = await authService.checkOldPassword(OldPass, UserID);
    if (checkOldPass.err === 0) {
      const hashedNewPass = await authService.hashPassword(NewPass);
      obj = await authService.changePassword(hashedNewPass, UserID);
    } else {
      return res.status(400).send({ message: "Old password is incorrect" });
    }
    res.send(obj);
  } catch (error) {
    console.error("Error in changePassword controller:", error);
    res.status(500).send("Internal Server Error");
  }
};

const loginGoogle = async (req, res) => {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    await authService.findOrCreate(payload.email, payload.name);

    res.json({ email: payload.email });
  } catch (error) {
    console.error("Login Failed:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi đăng nhập với Google.",
    });
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
    if (obj.err === 0) {
      const user = await userService.getUserByPhoneNumber(req.body.PhoneNumber);
      const userId = user.data.UserID;
      if (userId.startsWith("M")) {
        const chat = await chatService.findRoom(userId);
        if (chat.err === 1) {
          await chatService.createChat(userId);
        }
      }
    }
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
  const { email } = req.body;
  try {
    if (!email)
      res.status(404).json({
        err: 1,
        message: "Missing input",
      });
    const obj = await authService.loginEmail(email);
    if (obj.err === 0) {
      const user = await userService.getUserByEmail(email);
      const userId = user.data.UserID;
      if (userId.startsWith("M")) {
        const chat = await chatService.findRoom(userId);
        if (chat.err === 1) {
          await chatService.createChat(userId);
        }
      }
    }
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
  loginGoogle,
};
