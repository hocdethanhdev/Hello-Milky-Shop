import React, { useEffect } from "react";
import "./Notification.css";

const Notification = ({ message, clearNotification, time }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearNotification();
    }, time);

    return () => clearTimeout(timer);
  }, [message, clearNotification, time]);
  return <div className="notification-thinh-tb">{message}</div>;
};

export default Notification;
