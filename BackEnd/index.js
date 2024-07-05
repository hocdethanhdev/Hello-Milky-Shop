const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const initRouters = require("./routes");
require("./config/passport");
const http = require("http");
const socketIo = require("socket.io");
require("./scheduler/voucherScheduler");
const chatController = require("./controller/chatController");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(express.static("public"));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(
  session({
    secret: "HelloMilkyShop",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initRouters(app);

const unreadMessages = {};

io.on("connection", (socket) => {
  socket.on("joinRoom", async (roomId) => {
    socket.join(roomId);

    unreadMessages[roomId] = 0;
    io.emit("updateUnreadMessageCount", unreadMessages);
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
  });

  socket.on("chat message", async (msg) => {
    if (!unreadMessages[msg.roomId] || msg.userId.startsWith("S")) {
      unreadMessages[msg.roomId] = 0;
    }
    if (msg.userId.startsWith("M")) {
      unreadMessages[msg.roomId]++;
    }

    io.to(msg.roomId).emit("chat message", {
      content: msg.content,
      userId: msg.userId,
    });
    io.emit("updateUnreadMessageCount", unreadMessages);

    await chatController.saveMessage(msg.content, msg.userId, msg.roomId);
  });

  socket.on("disconnect", () => { });
});

const PORT = process.env.PORT || 8888;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
