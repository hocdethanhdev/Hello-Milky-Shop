import React from 'react';
import './Loading.css'; // Đảm bảo bạn đã tạo file CSS này

const Loading = () => {
  return (
    <div className="loading-container">
      <img
        src="https://sandbox.vnpayment.vn/merchantv2/Styles/images/loading-1.gif"
        alt="Loading..."
        className="loading-gif"
      />
    </div>
  );
};

export default Loading;
