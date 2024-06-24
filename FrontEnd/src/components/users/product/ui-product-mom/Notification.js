import React from "react";
import "./Notification.css";

const Notification = ({ message }) => {
    return (
        <div className="notification-thinh-tb">
            {message}
        </div>
    );
};

export default Notification;
