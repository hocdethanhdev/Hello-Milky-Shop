import React, { useEffect } from "react";
import PropTypes from "prop-types";
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

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  clearNotification: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};

export default Notification;
