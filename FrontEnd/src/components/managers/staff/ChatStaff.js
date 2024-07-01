import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatWindow from "../../chat/ChatPage";
import "./StaffChat.css";

function StaffChat() {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/chat/getAllChatRoom");
        const rooms = response.data.data;

        const roomsWithUsers = await Promise.all(
          rooms.map(async (room) => {
            const userResponse = await axios.get(`http://localhost:5000/api/v1/user/getUserByID?UserID=${room.ChatRoom}`);
            return {
              roomId: room.ChatRoom,
              userName: userResponse.data.data.UserName,
            };
          })
        );

        setChatRooms(roomsWithUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chat rooms", error);
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, []);

  const handleRoomClick = (roomId) => {
    setSelectedRoom(roomId);
  };

  const handleCloseChatWindow = () => {
    setSelectedRoom(null);
  };

  return (
    <div className="staff-chat-container row">
      <div className="chat-room-list col-md-3">
        <h2>Chat Rooms</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {chatRooms.map((room) => (
              <li key={room.roomId} onClick={() => handleRoomClick(room.roomId)}>
                {room.userName}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="chat-window-and-rooms col-md-9">
        <div className="chat-window-container">
          {selectedRoom ? (
            <ChatWindow roomId={selectedRoom} onClose={handleCloseChatWindow} />
          ) : (
            <div style={{ padding: "20px" }}>Chọn một chat room để bắt đầu trò chuyện</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StaffChat;

