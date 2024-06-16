const commentRepository = require("../repository/commentRepository");

const userService = {

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
  repComment: async (id, rep) => {
    return await commentRepository.repComment(id, rep);
  },
};

module.exports = userService;
