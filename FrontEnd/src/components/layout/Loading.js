import React from 'react';
import './Loading.css'; // Đảm bảo bạn đã tạo file CSS này

const Loading = () => {
  return (
    <div className="loading-container">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2FHMS_loading.gif?alt=media&token=f07fbecd-763b-4d6f-8ee1-b0fe142d8eb4"
        alt="Loading..."
        className="loading-gif"
      />
    </div>
  );
};

export default Loading;
