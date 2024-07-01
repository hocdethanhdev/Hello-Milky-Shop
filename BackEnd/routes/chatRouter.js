const router = require("express").Router();

const chatController = require("../controller/chatController");

router.get('/getAllChatRoom', chatController.getAllChatRoom);

router.post('/getAllMessageByChatRoom', chatController.getAllMessageByChatRoom);

module.exports = router;