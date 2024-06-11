import React, { useState, useEffect } from "react";
import SidebarProfile from "./sidebarprofile";
import './account.css'; // Thêm tệp CSS riêng cho bố cục Account

function Account() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Gọi API để lấy thông tin người dùng khi component được tạo
    fetch("http://localhost:5000/api/v1/user/getAllUsers")
      .then(response => response.json())
      .then(data => {
        // Giả sử API trả về một mảng người dùng, chúng ta lấy người dùng đầu tiên
        if (data && data.length > 0) {
          setUserData(data[0]);
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="account-container">
      <div className="sidebar-wrapper">
        <SidebarProfile />
      </div>
      <div className="account-content">
        <h2>Thông tin tài khoản</h2>
        {userData ? (
          <div>
            <div>
              <strong>Tên đăng nhập:</strong> {userData.UserName}
            </div>
            <div>
              <strong>Tên:</strong> {userData.UserName}
            </div>
            <div>
              <strong>Email:</strong> {userData.Email}
            </div>
            <div>
              <strong>Số điện thoại:</strong> {userData.PhoneNumber || "Chưa cập nhật"}
            </div>
            {/* Bạn có thể thêm các trường thông tin khác tùy theo API */}
          </div>
        ) : (
          <p>Đang tải thông tin...</p>
        )}
      </div>
    </div>
  );
}

export default Account;
