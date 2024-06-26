
const articleDAO = require("../dao/articleDAO");

const articleRepository = {
  getTop5ArticleSameType: async (id, aid) => {
    return await articleDAO.getTop5ArticleSameType(id, aid);
  },
  getArticlesByID: async (ID) => {
    return await articleDAO.findArticlesByID(ID);
  },
  getArticlesByArticleID: async (ID) => {
    return await articleDAO.findArticlesByArticleID(ID);
  },
  getArticlesByContent: async (Content) => {
    return await articleDAO.findArticlesByContent(Content);
  },
  getAllArticles: async () => {
    return await articleDAO.findAllArticles();
  },
  getAllArticleCategory: async () => {
    return await articleDAO.findAllArticleCategory();
  },
  createArticle: async (article) => {
    return await articleDAO.createArticle(article);
  },
  deleteArticle: async (article_id) => {
    return await articleDAO.deleteArticle(article_id);
  },
  updateArticle: async (article_id, article) => {
    return await articleDAO.updateArticle(article_id, article);
  },
  getAuthorName: async () => {
    return await articleDAO.findAuthorName();
  },
}

module.exports = articleRepository;