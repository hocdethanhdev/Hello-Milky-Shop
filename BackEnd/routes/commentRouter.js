const router = require('express').Router();

const commentController = require("../controller/commentController");
     
router.get('/getAllComments', commentController.getAllComments);

router.get('/getUnansweredComments', commentController.getUnansweredComments);

router.post('/repComment/:id', commentController.repComment);

router.post('/checkUserOrdered', commentController.checkUserOrdered);

router.post('/userComment', commentController.userComment);

router.get('/getCommentByProductID/:id', commentController.getCommentByProductID);

router.get('/countRatingAndAvgRating/:id', commentController.countRatingAndAvgRating);

module.exports = router