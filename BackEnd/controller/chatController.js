const userService = require("../service/userService");

const createChat = async (req, res) => {
    try {
      const { memberId, staffId } = req.body;
      const newChat = await chatService.createChat(memberId, staffId);
      res.status(201).json(newChat);
    } catch (error) {
      console.error('Error while creating chat:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  const getChatsByMemberId = async (req, res) => {
    try {
      const memberId = req.params.memberId;
      const chats = await chatService.getChatsByMemberId(memberId);
      res.status(200).json(chats);
    } catch (error) {
      console.error('Error while getting chats by member ID:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  const getChatsByStaffId = async (req, res) => {
    try {
      const staffId = req.params.staffId;
      const chats = await chatService.getChatsByStaffId(staffId);
      res.status(200).json(chats);
    } catch (error) {
      console.error('Error while getting chats by staff ID:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  module.exports = {
    createChat,
    getChatsByMemberId,
    getChatsByStaffId,
  };