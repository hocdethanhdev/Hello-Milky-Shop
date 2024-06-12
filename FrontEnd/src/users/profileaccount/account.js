import React, { useState, useEffect } from "react";
import SidebarProfile from "./sidebarprofile";
import "./account.css";
import { useSelector } from "react-redux";
import { getUserIdFromToken } from "../store/actions/authAction";
import axios from "axios";

function Account() {
  const [userData, setUserData] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const userId = getUserIdFromToken(token);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/user/getUserByID?UserID=${userId}`
        );
        
        if (response.data && response.data.data) {
          setUserData(response.data.data);
          console.log(`User ${userData}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

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
              <strong>Email:</strong> {userData.Email || "Chưa cập nhật"}
            </div>
            <div>
              <strong>Số điện thoại:</strong>{" "}
              {userData.PhoneNumber || "Chưa cập nhật"}
            </div>
          </div>
        ) : (
          <p>Đang tải thông tin...</p>
        )}
      </div>
    </div>
  );
}

export default Account;
