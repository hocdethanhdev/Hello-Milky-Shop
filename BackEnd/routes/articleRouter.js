const router = require('express').Router();

const articleController = require("../controller/articleController");
     
router.get('/getArticlesByID/:ID', articleController.getArticlesByID);

router.get('/getArticlesByArticleID/:ID', articleController.getArticlesByArticleID);

router.get('/getArticlesByContent/:Content', articleController.getArticlesByContent);

router.get('/getAllArticles', articleController.getAllArticles);

router.get('/getAllArticleCategory', articleController.getAllArticleCategory);

router.post('/createArticle',articleController.createArticle);

router.put('/deleteArticle/:article_id', articleController.deleteArticle);

router.put('/editArticle/:article_id', articleController.updateArticle);

router.get('/getAllArticles', articleController.getAllArticles);

router.get('/getAuthorName', articleController.getAuthorName);

router.get('/getTop5ArticleSameType/:id', articleController.getTop5ArticleSameType);

module.exports = router