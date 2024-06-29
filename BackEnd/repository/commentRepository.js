const commentDAO = require("../dao/commentDAO");

const productRepository = {

  getCommentByID: async (CommentID) => {
    return await commentDAO.getCommentByID(CommentID);
  },

  countRatingAndAvgRating: async (ProductID) => {
    return await commentDAO.countRatingAndAvgRating(ProductID);
  },

  getCommentByProductID: async (ProductID) => {
    return await commentDAO.getCommentByProductID(ProductID);
  },

  userComment: async (UserID, ProductID, Rating, Description) => {
    return await commentDAO.userComment(UserID, ProductID, Rating, Description);
  },
  checkUserOrdered: async (UserID, ProductID) => {
    return await commentDAO.checkUserOrdered(UserID, ProductID);
  },
  getAllComments: async () => {
    return await commentDAO.getAllComments();
  },
  getUnansweredComments: async () => {
    return await commentDAO.getUnansweredComments();
  },
  getAnsweredComments: async () => {
    return await commentDAO.getAnsweredComments();
  },
  repComment: async (id, rep, UserID) => {
    return await commentDAO.repComment(id, rep, UserID);
  },
};

module.exports = productRepository;
