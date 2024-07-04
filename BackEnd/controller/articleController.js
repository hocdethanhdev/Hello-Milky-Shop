const articleService = require("../service/articleService");

const getTop5ArticleSameType = async (req, res) => {
    try {
        const { ArticleCategoryID, ArticleID } = req.body;
        if (!ArticleCategoryID || !ArticleID) {
            res.status(400).send({
                err: 1,
                mes: "Missing input"
            });
        }
        const obj = await articleService.getTop5ArticleSameType(ArticleCategoryID, ArticleID);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getArticlesByID = async (req, res) => {
    try {
        const obj = await articleService.getArticlesByID(req.params.ID);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};


const getArticlesByArticleID = async (req, res) => {
    try {
        const obj = await articleService.getArticlesByArticleID(req.params.ID);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getArticlesByContent = async (req, res) => {
    try {
        const obj = await articleService.getArticlesByContent(req.params.Content);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getAllArticles = async (rep, res) => {
    try {
        const obj = await articleService.getAllArticles();
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all server", error);
        res.status(500).send("Internal Server Error");
    }
};

const getAllArticlesforViewer = async (rep, res) => {
    try {
        const obj = await articleService.getAllArticlesforViewer();
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all server", error);
        res.status(500).send("Internal Server Error");
    }
};

const getAllArticleCategory = async (req, res) => {
    try {
        const obj = await articleService.getAllArticleCategory();
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all server:", error);
        res.status(500).send("Internal Server Error");
    }
};

const createArticle = async (req, res) => {
    try {
        const obj = await articleService.createArticle(req.body);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all server:", error);
        res.status(500).send("Internal Server Error");
    }
};

const deleteArticle = async (req, res) => {
    try {
        const obj = await articleService.deleteArticle(req.params.article_id);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const updateArticle = async (req, res) => {
    try {
        const obj = await articleService.updateArticle(req.params.article_id, req.body);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getAuthorName = async (req, res) => {
    try {
        const obj = await articleService.getAuthorName();
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getCurrentCategoriesInArticles = async (req, res) => {
    try {
        const obj = await articleService.getCurrentCategoriesInArticles();
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all current category articles:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    getArticlesByID,
    getArticlesByContent,
    getAllArticles,
    getAllArticlesforViewer,
    getAllArticleCategory,
    createArticle,
    deleteArticle,
    updateArticle,
    getArticlesByArticleID,
    getAuthorName,
    getTop5ArticleSameType,
    getCurrentCategoriesInArticles
}