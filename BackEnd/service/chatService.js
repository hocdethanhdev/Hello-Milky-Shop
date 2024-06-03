const chatRepository = require('../repository/chatRepository');
const Chat = require('../models/Chat');

const createChat = async (memberId, staffId) => {
  const newChat = new Chat(null, memberId, staffId);
  return chatRepository.createChat(newChat);
};

const getChatsByMemberId = async (memberId) => {
  return chatRepository.getChatsByMemberId(memberId);
};

const getChatsByStaffId = async (staffId) => {
  return chatRepository.getChatsByStaffId(staffId);
};

module.exports = chatService;