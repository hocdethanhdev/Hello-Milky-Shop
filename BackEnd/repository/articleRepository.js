
const articleDAO = require("../dao/articleDAO");



const articleRepository = {
  getArticlesByID: async (ID) => {
    return await articleDAO.findArticlesByID(ID);
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
}

module.exports = articleRepository;