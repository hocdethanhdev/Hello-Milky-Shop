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
  const [popupUserNameUpdate, setPopupUserNameUpdate] = useState(false);
  const [popupPhoneUpdate, setPopupPhoneUpdate] = useState(false);

  const [emailUpdate, setEmailUpdate] = useState(null);
  const [userNameUpdate, setUserNameUpdate] = useState(null);
  const [phoneUpdate, setPhoneUpdate] = useState(null);

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

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    setEmailUpdate(userData?.Email);
    setPhoneUpdate(userData?.PhoneNumber);
    setUserNameUpdate(userData?.UserName);
  }, [userData]);

  const formatPrice = (price) => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const handleUpdateEmail = async () => {
    try {
      const updateEmail = await axios.put(
        "http://localhost:5000/api/v1/user/updateUserEmail",
        {
          UserID: userId,
          Email: emailUpdate,
        }
      );
      fetchUserData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setPopupEmailUpdate(false);
    setEmailUpdate(null);
  };
  const handleUpdateUserName = async () => {
    try {
      const updateUserName = await axios.put(
        "http://localhost:5000/api/v1/user/updateUserName",
        {
          UserID: userId,
          UserName: userNameUpdate
        }
      );
      fetchUserData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setPopupUserNameUpdate(false);
    setUserNameUpdate(null);
  };
  const handleUpdatePhoneNumber = async () => {
    try {
      const updatePhoneNumber = await axios.put(
        "http://localhost:5000/api/v1/user/updateUserPhoneNumber",
        {
          UserID: userId,
          PhoneNumber: phoneUpdate,
        }
      );
      fetchUserData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setPopupPhoneUpdate(false);
    setPhoneUpdate(null);
  };
  const handleChangeEmail = (e) => {
    setEmailUpdate(e.target.value);
  };
  const handleChangeUserName = (e) => {
    setUserNameUpdate(e.target.value);
  };
  const handleChangePhoneNumber = (e) => {
    setPhoneUpdate(e.target.value);
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
              <strong >Tên tài khoản:</strong>
              {!popupUserNameUpdate ? (
                <>
                  {userData.UserName}
                  <CiEdit
                    className="update-account"
                    onClick={() => {
                      setPopupUserNameUpdate(true);
                      setPopupEmailUpdate(false);
                      setEmailUpdate(userData.Email);
                      setPopupPhoneUpdate(false);
                      setPhoneUpdate(userData.PhoneNumber);
                    }}
                  />
                </>
              ) : (
                <div>
                  <input
                    type="text"
                    value={userNameUpdate}
                    onChange={handleChangeUserName}
                  />
                  <button
                    onClick={handleUpdateUserName}
                    className="btn btn-warning"
                  >
                    Cập nhật
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setPopupUserNameUpdate(false);
                      setUserNameUpdate(userData.UserName);
                    }}
                  >
                    Hủy
                  </button>
                </div>
              )}
            </div>

            <div>
              <strong>Email:</strong>
              {!popupEmailUpdate ? (
                <>
                  {userData.Email || "Chưa cập nhật"}
                  <CiEdit
                    className="update-account"
                    onClick={() => {
                      setPopupUserNameUpdate(false);
                      setUserNameUpdate(userData.UserName);
                      setPopupEmailUpdate(true);
                      setPopupPhoneUpdate(false);
                      setPhoneUpdate(userData.PhoneNumber);
                    }}
                  />
                </>
              ) : (
                <div>
                  <input
                    type="text"
                    value={emailUpdate}
                    onChange={handleChangeEmail}
                  />
                  <button
                    onClick={handleUpdateEmail}
                    className="btn btn-warning"
                  >
                    Cập nhật
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setPopupEmailUpdate(false);
                      setEmailUpdate(userData.Email);
                    }
                    }
                  >
                    Hủy
                  </button>
                </div>
              )}
            </div>
            <div>
              <strong>Số điện thoại:</strong>{" "}
              {!popupPhoneUpdate ? (
                <>
                  {userData.PhoneNumber || "Chưa cập nhật"}
                  <CiEdit
                    className="update-account"
                    onClick={() => {
                      setPopupUserNameUpdate(false);
                      setUserNameUpdate(userData.UserName);
                      setPopupEmailUpdate(false);
                      setEmailUpdate(userData.Email);
                      setPopupPhoneUpdate(true);
                    }}
                  />
                </>
              ) : (
                <div>
                  <input
                    type="text"
                    value={phoneUpdate}
                    onChange={handleChangePhoneNumber}
                  />
                  <button
                    onClick={handleUpdatePhoneNumber}
                    className="btn btn-warning"
                  >
                    Cập nhật
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setPopupPhoneUpdate(false);
                      setPhoneUpdate(userData.PhoneNumber);
                    }}
                  >
                    Hủy
                  </button>
                </div>
              )}
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
