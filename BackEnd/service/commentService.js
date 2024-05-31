const commentRepository = require("../repository/commentRepository");

const userService = {
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
