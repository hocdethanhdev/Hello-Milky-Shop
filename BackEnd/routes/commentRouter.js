const router = require('express').Router();

const commentController = require("../controller/commentController");
     
router.get('/getAllComments', commentController.getAllComments);

router.get('/getUnansweredComments', commentController.getUnansweredComments);

router.post('/repComment/:id', commentController.repComment)

module.exports = router