const commentRepository = require("../repository/commentRepository");

const userService = {

  getCommentByID: async (CommentID) => {
    return await commentRepository.getCommentByID(CommentID);
  },

  countRatingAndAvgRating: async (ProductID) => {
    return await commentRepository.countRatingAndAvgRating(ProductID);
  },

  getCommentByProductID: async (ProductID) => {
    return await commentRepository.getCommentByProductID(ProductID);
  },

  userComment: async (UserID, ProductID, Rating, Description) => {
    return await commentRepository.userComment(UserID, ProductID, Rating, Description);
  },

  checkUserOrdered: async (UserID, ProductID) => {
    return await commentRepository.checkUserOrdered(UserID, ProductID);
  },

  getAllComments: async () => {
    return await commentRepository.getAllComments();
  },
  getUnansweredComments: async () => {
    return await commentRepository.getUnansweredComments();
  },
  getAnsweredComments: async () => {
    return await commentRepository.getAnsweredComments();
  },
  repComment: async (id, rep, UserID) => {
    return await commentRepository.repComment(id, rep, UserID);
  },
};

module.exports = userService;
