import "./Chat.css";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
const { getUserIdFromToken } = require("../store/actions/authAction");

function ChatBubble({ onClick }) {
  return (
    <div className="chat-bubble" onClick={onClick}>
      Tư vấn
    </div>
  );
}

function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const { token } = useSelector((state) => state.auth);
  const userId = getUserIdFromToken(token);
  const roomId = userId; // Replace this with your room ID logic

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/chat/getAllMessageByChatRoom', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ChatRoom: roomId }),
        });
        const result = await response.json();
        if (result.err === 0) {
          const messages = result.data.map(msg => ({
            content: msg.Message,
            userId: msg.UserID,
            userName: msg.UserName,
          }));
          setMessages(messages);
        } else {
          console.error('Error fetching chat history:', result.err);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
    socket.emit("joinRoom", roomId);

    // Register event listeners when component mounts
    socket.on("connect", () => console.log("Connected to server"));

    socket.on("chat message", handleNewMessage);

    // Unregister event listeners when component unmounts
    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("connect");
      socket.off("chat message", handleNewMessage);
    };
  }, [roomId]);

  const handleNewMessage = (msg) => {
    if (msg.userId !== userId) {
      setMessages((prevMessages) => [...prevMessages, msg]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      const message = { content: inputMessage, userId, roomId };
      socket.emit("chat message", message);
      setMessages([...messages, message]);
      setInputMessage("");
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span>Tư vấn</span>
        <button onClick={onClose}>×</button>
      </div>
      <ul className="message-list">
        {messages.map((msg, index) => (
          <li key={index} className={msg.userId === userId ? "own-message" : "other-message"}>
            <div className="message-content">{msg.content}</div>
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
      <form className="input-area" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit">Gửi</button>
      </form>
    </div>
  );
}

function ChatBubbleWithWindow() {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="chat-container">
      <ChatBubble onClick={toggleChat} />
      {showChat && <ChatWindow onClose={toggleChat} />}
    </div>
  );
}

export default ChatBubbleWithWindow;
