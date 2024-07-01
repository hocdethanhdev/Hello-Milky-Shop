const chatRepository = require("../repository/chatRepository")

const chatService = {
  getAllMessageByChatRoom: async (ChatRoom) => {
    return chatRepository.getAllMessageByChatRoom(ChatRoom);
  },
  saveMessage: async (Message, UserID, ChatRoom) => {
    return chatRepository.saveMessage(Message, UserID, ChatRoom);
  },
  createChat: async (memberId) => {
    return chatRepository.createChat(memberId);
  },
  findRoom: async (memberId) => {
    return chatRepository.findRoom(memberId);
  },
  getAllChatRoom: async () => {
    return chatRepository.getAllChatRoom();
  },
};

module.exports = chatService;
