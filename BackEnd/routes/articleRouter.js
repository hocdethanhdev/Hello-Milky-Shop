const router = require('express').Router();

const articleController = require("../controller/articleController");
     
router.get('/getArticlesByID/:ID', articleController.getArticlesByID);

router.get('/getArticlesByContent/:Content', articleController.getArticlesByContent);

router.get('/getAllArticles', articleController.getAllArticles);

router.get('/getAllArticleCategory', articleController.getAllArticleCategory);

router.post('/createArticle',articleController.createArticle);

router.put('/deleteArticle/:article_id', articleController.deleteArticle);

router.put('/editArticle/:article_id', articleController.updateArticle);




module.exports = router