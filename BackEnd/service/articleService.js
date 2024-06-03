
const articleRepository = require("../repository/articleRepository");

const articleService = {

  getArticlesByID : async (ID) => {
      return await articleRepository.getArticlesByID(ID);
    },

  getAllArticles : async (req, res) => {
    return await articleRepository.getAllArticles();
  },
  getAllArticleCategory : async (req, res) => {
    return await articleRepository.getAllArticleCategory();
  },

  createArticle: async(article) => {
    return  await articleRepository.createArticle(article);
  },

  deleteArticle : async (article_id) => {
    return await articleRepository. deleteArticle (article_id);
  },

  updateArticle: async (article_id, article) => {
    return await articleRepository.updateArticle(article_id, article);
  },
}

module.exports = articleService;