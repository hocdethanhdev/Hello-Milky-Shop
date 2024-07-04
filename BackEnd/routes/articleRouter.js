const router = require('express').Router();

const articleController = require("../controller/articleController");

router.get('/getArticlesByID/:ID', articleController.getArticlesByID);

router.get('/getArticlesByArticleID/:ID', articleController.getArticlesByArticleID);

router.get('/getArticlesByContent/:Content', articleController.getArticlesByContent);

router.get('/getAllArticles', articleController.getAllArticles);

router.get('/getAllArticleCategory', articleController.getAllArticleCategory);

router.post('/createArticle', articleController.createArticle);

router.put('/deleteArticle/:article_id', articleController.deleteArticle);

router.put('/editArticle/:article_id', articleController.updateArticle);

router.get('/getAllArticlesforViewer', articleController.getAllArticlesforViewer);

router.get('/getAuthorName', articleController.getAuthorName);

router.post('/getTop5ArticleSameType', articleController.getTop5ArticleSameType);

router.get('/getCurrentCategoriesInArticles', articleController.getCurrentCategoriesInArticles);

router.get('/getTop4ArticlesforViewer', articleController.getTop4ArticlesforViewer);

module.exports = router