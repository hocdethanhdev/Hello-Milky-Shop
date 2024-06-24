const articleService = require("../service/articleService");

const getArticlesByID = async (req, res) => {
    try {
        const obj = await articleService.getArticlesByID (req.params.ID);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};


const getArticlesByArticleID = async (req, res) => {
    try {
        const obj = await articleService.getArticlesByArticleID (req.params.ID);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getArticlesByContent = async (req, res) => {
    try {
        const obj = await articleService.getArticlesByContent (req.params.Content);
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
        console.error("Error while getting all server",error);
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
        const article = req.body;
        const obj = await articleService.updateArticle(req.params.article_id, req.body);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getAuthorName = async (req, res) => {
    try {
        const obj = await articleService.getAuthorName ();
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    getArticlesByID,
    getArticlesByContent,
    getAllArticles,
    getAllArticleCategory,
    createArticle,
    deleteArticle,
    updateArticle,
    getArticlesByArticleID,
    getAuthorName
}