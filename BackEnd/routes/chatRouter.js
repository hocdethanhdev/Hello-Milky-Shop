const router = require("express").Router();

const chatController = require("../controller/chatController");

router.get('/getAllChatRoom', chatController.getAllChatRoom);

router.post('/getAllMessageByChatRoom', chatController.getAllMessageByChatRoom);

router.post('/getChatUnseen', chatController.getChatUnseen);

module.exports = router;