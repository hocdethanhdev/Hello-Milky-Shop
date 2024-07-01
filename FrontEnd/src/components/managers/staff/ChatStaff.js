import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatWindow from "../../chat/ChatPage";
import "./StaffChat.css";

function StaffChat() {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unseenCounts, setUnseenCounts] = useState({});

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

        // Fetch unseen counts after fetching rooms
        roomsWithUsers.forEach(room => {
          fetchUnseen(room.roomId);
        });
      } catch (error) {
        console.error("Error fetching chat rooms", error);
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, []);

  const handleRoomClick = (roomId, userName) => {
    setSelectedRoom(roomId);
    setSelectedUserName(userName);
  
    setUnseenCounts(prevCounts => ({
      ...prevCounts,
      [roomId]: 0,
    }));
  };
  

  const handleCloseChatWindow = () => {
    setSelectedRoom(null);
    setSelectedUserName(null);
  
    chatRooms.forEach(room => {
      fetchUnseen(room.roomId);
    });
  };
  

  const fetchUnseen = async (roomId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/chat/getChatUnseen",
        { ChatRoom: roomId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      setUnseenCounts(prevCounts => ({
        ...prevCounts,
        [roomId]: data.count,
      }));
    } catch (error) {
      console.error("Error fetching unseen messages", error);
    }
  };

  return (
    <div className="staff-chat-container row">
      <div className="chat-room-list col-md-3">
        <h4>Danh sách khách hàng</h4>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {chatRooms.map((room) => (
              <li key={room.roomId} onClick={() => handleRoomClick(room.roomId, room.userName)}>
                {room.userName}
                {unseenCounts[room.roomId] > 0 ? <span className="notify-chat">{unseenCounts[room.roomId]}</span> : <></>}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="chat-window-and-rooms col-md-9">
        <div className="chat-window-container">
          {selectedRoom ? (
            <ChatWindow roomId={selectedRoom} userName={selectedUserName} onClose={handleCloseChatWindow} />
          ) : (
            <div style={{ padding: "20px" }}>Chọn một chat room để bắt đầu trò chuyện</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StaffChat;
