const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const initRouters = require("./routes");
require("./config/passport");
const http = require("http");
const socketIo = require("socket.io");
require("./scheduler/voucherScheduler");
const chatController = require("./controller/chatController");
const { error } = require("console");

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
    cookie: { secure: false }, // Dùng true khi sử dụng HTTPS
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initRouters(app);

io.on("connection", (socket) => {
  socket.on("joinRoom", async (roomId) => {
    socket.join(roomId);
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
  });

  socket.on("chat message", async (msg) => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    
    io.to(msg.roomId).emit("chat message", {
      content: msg.content,
      userId: msg.userId,
      date: currentDate,
    });
    await chatController.saveMessage(msg.content, msg.userId, msg.roomId, currentDate);
  });

  socket.on("disconnect", () => {});
});


const PORT = process.env.PORT || 8888;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
