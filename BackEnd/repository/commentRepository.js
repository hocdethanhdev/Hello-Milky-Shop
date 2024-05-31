const commentDAO = require("../dao/commentDAO");

const productRepository = {
    getAllComments: async () => {
    return await commentDAO.getAllComments();
  },
  getUnansweredComments: async () => {
    return await commentDAO.getUnansweredComments();
  },
  repComment: async (id, rep) => {
    return await commentDAO.repComment(id, rep);
  },
};

module.exports = productRepository;
