const articleRepository = require("../repository/articleRepository");

const articleService = {
  getTop5ArticleSameType: async (id, aid) => {
    return await articleRepository.getTop5ArticleSameType(id, aid);
  },

  getArticlesByID: async (ID) => {
    return await articleRepository.getArticlesByID(ID);
  },
  getArticlesByArticleID: async (ID) => {
    return await articleRepository.getArticlesByArticleID(ID);
  },
  getArticlesByContent: async (Content) => {
    return await articleRepository.getArticlesByContent(Content);
  },
  getAllArticles: async () => {
    return await articleRepository.getAllArticles();
  },
  getAllArticleCategory: async () => {
    return await articleRepository.getAllArticleCategory();
  },

  createArticle: async (article) => {
    return await articleRepository.createArticle(article);
  },

  deleteArticle: async (article_id) => {
    return await articleRepository.deleteArticle(article_id);
  },

  updateArticle: async (article_id, article) => {
    return await articleRepository.updateArticle(article_id, article);
  },
  getAuthorName: async () => {
    return await articleRepository.getAuthorName();
  },
  getCurrentCategoriesInArticles: async () => {
    return await articleRepository.getCurrentCategoriesInArticles();
  },
};

module.exports = articleService;
