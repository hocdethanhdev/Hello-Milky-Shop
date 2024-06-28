import React, { useState, useEffect } from "react";
import SidebarProfile from "./sidebarprofile";
import "./account.css";
import { useSelector } from "react-redux";
import { getUserIdFromToken } from "../../store/actions/authAction";
import axios from "axios";
import { CiEdit } from "react-icons/ci";

function Account() {
  const [userData, setUserData] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const userId = getUserIdFromToken(token);
  const [popupEmailUpdate, setPopupEmailUpdate] = useState(false);
  const [emailUpdate, setEmailUpdate] = useState(null);
  const [userNameUpdate, setUserNameUpdate] = useState(null);
  const [phoneUpdate, setPhoneUpdate] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`
          http://localhost:5000/api/v1/user/getUserByID?UserID=${userId}`);

        if (response.data && response.data.data) {
          setUserData(response.data.data);
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

  const handleUpdate = () => {
    const response = axios.put("");

    setEmailUpdate(null);
    setPhoneUpdate(null);
    setUserNameUpdate(null);
  };
  const handleChangeEmail = (e) => {
    setEmailUpdate(e.target.value);
  };

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
              <strong>Tên tài khoản:</strong> {userData.UserName}
            </div>

            <div>
              <strong>Email:</strong>
              {!popupEmailUpdate ? (
                <>
                  {userData.Email || "Chưa cập nhật"}
                  <CiEdit
                    className="update-email-account"
                    onClick={() => setPopupEmailUpdate(true)}
                  />
                </>
              ) : (
                <div>
                  <input
                    type="text"
                    value={userData.Email}
                    onChange={handleChangeEmail}
                  />
                  <button onClick={handleUpdate}>Cập nhật</button>
                  <button onClick={() => setPopupEmailUpdate(false)}>Hủy</button>
                </div>
              )}
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
          </div>
        ) : (
          <p>Đang tải thông tin...</p>
        )}
      </div>
    </div>
  );
}

export default Account;
