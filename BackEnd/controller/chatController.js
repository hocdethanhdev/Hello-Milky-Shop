const chatService = require("../service/chatService");

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
    const obj = await chatService.saveMessage(Message, UserID, ChatRoom);
  } catch (error) {
    console.log("Save message fail");
  }
};


const findRoom = async (memberId) => {
  try {
    return await chatService.findRoom(memberId);
  } catch (error) {
    console.error("Error while creating chat:", error);
    res.status(500).send("Internal Server Error");
  }
};
const createChat = async (memberId) => {
  try {
    console.log(2);
    await chatService.createChat(memberId);
    console.log(1);
  } catch (error) {
    console.error("Error while creating chat:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createChat,
  findRoom,
  getAllChatRoom,
  saveMessage,
  getAllMessageByChatRoom,
};
