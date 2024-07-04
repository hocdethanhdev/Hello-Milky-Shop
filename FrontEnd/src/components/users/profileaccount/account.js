import React, { useState, useEffect, useCallback } from "react";
import SidebarProfile from "./sidebarprofile";
import "./account.css";
import { useSelector } from "react-redux";
import { getUserIdFromToken } from "../../store/actions/authAction";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { message } from "antd";
import Loading from "../../layout/Loading";

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

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/user/getUserByID?UserID=${userId}`
      );

      if (response.data && response.data.data) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    setEmailUpdate(userData?.Email);
    setPhoneUpdate(userData?.PhoneNumber);
    setUserNameUpdate(userData?.UserName);
  }, [userData]);

  const formatPrice = (price) => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phone) && phone.length <= 15;
  };

  const handleUpdateEmail = async () => {
    if (!validateEmail(emailUpdate)) {
      message.error("Bạn đã nhập sai định dạng email");
      return;
    }
    try {
      const updateEmail = await axios.put(
        "http://localhost:5000/api/v1/user/updateUserEmail",
        {
          UserID: userId,
          Email: emailUpdate,
        }
      );
      fetchUserData();
      if (updateEmail.data.err === 0) {
        message.success("Cập nhật thành công");
      } else message.error("Cập nhật thất bại");
    } catch (error) {
      console.error("Error updating email:", error);
    }
    setPopupEmailUpdate(false);
    setEmailUpdate(null);
  };

  const handleUpdateUserName = async () => {
    if (userNameUpdate.length > 50) {
      message.error("Tên tài khoản không được vượt quá 50 ký tự");
      return;
    }
    try {
      const updateUserName = await axios.put(
        "http://localhost:5000/api/v1/user/updateUserName",
        {
          UserID: userId,
          UserName: userNameUpdate,
        }
      );
      fetchUserData();
      if (updateUserName.data.err === 0) {
        message.success("Cập nhật thành công");
      } else message.error("Cập nhật thất bại");
    } catch (error) {
      console.error("Error updating username:", error);
    }
    setPopupUserNameUpdate(false);
    setUserNameUpdate(null);
  };

  const handleUpdatePhoneNumber = async () => {
    if (!validatePhoneNumber(phoneUpdate)) {
      message.error("Số điện thoại không hợp lệ");
      return;
    }
    try {
      const updatePhoneNumber = await axios.put(
        "http://localhost:5000/api/v1/user/updateUserPhoneNumber",
        {
          UserID: userId,
          PhoneNumber: phoneUpdate,
        }
      );
      fetchUserData();
      if (updatePhoneNumber.data.err === 0) {
        message.success("Cập nhật thành công");
      } else message.error("Cập nhật thất bại");
    } catch (error) {
      console.error("Error updating phone number:", error);
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
            <div className="obj-account">
              <strong>Tên tài khoản:</strong>
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
                  <br />
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

            <div className="obj-account">
              <strong>Email: </strong>
              {userData.Email || "Chưa cập nhật"}
            </div>
            <div className="obj-account">
              <strong>Số điện thoại:</strong>{" "}
              {!popupPhoneUpdate ? (
                <>
                  {userData.PhoneNumber || "Chưa cập nhật"}
                  {userData.PhoneNumber && (
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
                  )}
                </>
              ) : (
                <div>
                  <input
                    type="text"
                    value={phoneUpdate}
                    onChange={handleChangePhoneNumber}
                  />
                  <br />
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

            <div className="obj-account">
              <strong>Xu hiện có:</strong>{" "}
              <span>
                {userData.Point} = {formatPrice(userData.Point * 10)} VND
              </span>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default Account;
