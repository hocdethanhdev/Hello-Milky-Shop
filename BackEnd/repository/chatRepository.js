const chatDAO = require("../dao/chatDAO");

const chatRepository = {
  getChatUnseen: async (ChatRoom) => {
    return chatDAO.getChatUnseen(ChatRoom);
  },
  getAllChatUnseen: async () => {
    return chatDAO.getAllChatUnseen();
  },
  getAllMessageByChatRoom: async (ChatRoom) => {
    return chatDAO.getAllMessageByChatRoom(ChatRoom);
  },
  saveMessage: async (Message, UserID, ChatRoom) => {
    return chatDAO.saveMessage(Message, UserID, ChatRoom);
  },
  getAllChatRoom: async () => {
    return chatDAO.getAllChatRoom();
  },
  createChat: async (memberId) => {
    return chatDAO.createChat(memberId);
  },
  findRoom: async (memberId) => {
    return chatDAO.findRoom(memberId);
  },
};

module.exports = chatRepository;
