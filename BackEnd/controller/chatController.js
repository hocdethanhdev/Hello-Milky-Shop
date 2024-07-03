const chatService = require("../service/chatService");

const getChatUnseen = async (req, res) => {
  try {
    const {ChatRoom} = req.body;
    const obj = await chatService.getChatUnseen(ChatRoom);
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getAllMessageByChatRoom = async (req, res) => {
  try {
    const {ChatRoom} = req.body;
    const obj = await chatService.getAllMessageByChatRoom(ChatRoom);
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getAllChatRoom = async (req, res) => {
  try {
    const obj = await chatService.getAllChatRoom();
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const saveMessage = async (Message, UserID, ChatRoom) => {
  try {
    await chatService.saveMessage(Message, UserID, ChatRoom);
  } catch (error) {
    console.log("Save message fail");
  }
};


const findRoom = async (memberId) => {
  try {
    return await chatService.findRoom(memberId);
  } catch (error) {
    console.error("Error while creating chat:", error);
  }
};
const createChat = async (memberId) => {
  try {
    await chatService.createChat(memberId);
  } catch (error) {
    console.error("Error while creating chat:", error);
  }
};

module.exports = {
  createChat,
  findRoom,
  getAllChatRoom,
  saveMessage,
  getAllMessageByChatRoom,
  getChatUnseen,
};
