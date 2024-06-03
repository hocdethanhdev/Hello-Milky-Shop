const router = require('express').Router(); 

const chatController = require("../controller/chatController");

router.post('/create', chatController.createChat);
router.get('/member/:memberId', chatController.getChatsByMemberId);
router.get('/staff/:staffId', chatController.getChatsByStaffId);

module.exports = router;