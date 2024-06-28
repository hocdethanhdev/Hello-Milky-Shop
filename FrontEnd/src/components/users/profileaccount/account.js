import React, { useState, useEffect } from "react";
import SidebarProfile from "./sidebarprofile";
import "./account.css";
import { useSelector } from "react-redux";
import { getUserIdFromToken } from "../../store/actions/authAction";
import axios from "axios";

function Account() {
  const [userData, setUserData] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const userId = getUserIdFromToken(token);
  const [updateAccount, setUpdateAccount] = useState(false);

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

  const formatPrice = (price) => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  return (
    <div className="account-container">
      <div className="sidebar-wrapper">
        <SidebarProfile />
      </div>
      {!updateAccount ? (
        <div className="account-content">
          <h2>Thông tin tài khoản</h2>
          {userData ? (
            <div>
              <div>
                <strong>Tên tài khoản:</strong> {userData.UserName}
              </div>

              <div>
                <strong>Email:</strong> {userData.Email || "Chưa cập nhật"}
              </div>
              <div>
                <strong>Số điện thoại:</strong>{" "}
                {userData.PhoneNumber || "Chưa cập nhật"}
              </div>

              <div>
                <strong>Xu hiện có:</strong>{" "}
                <span>
                  {userData.Point} = {formatPrice(userData.Point * 10)} VND
                </span>
              </div>
              <div onClick={setUpdateAccount(true)}>
                <button>Cập nhật hồ sơ</button>
              </div>
            </div>
          ) : (
            <p>Đang tải thông tin...</p>
          )}
        </div>
      ) : (
        <form>
          <label>Tên tài khoản</label>
          <input type="text" value={userData.UserName} id="UserName"/>
          <label>Email</label>
          <input type="text" value={userData.Email} id="Email"/>
          <label>Số điện thoại</label>
          <input type="text" value={userData.PhoneNumber} id="PhoneNumber"/>
        </form>
      )}
    </div>
  );
}

export default Account;
