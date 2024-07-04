import React, { useEffect, useState } from "react";
import "./ChangePassword.css";
import { getUserIdFromToken } from "../../store/actions/authAction";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import SidebarProfile from "./sidebarprofile";
import { message } from "antd";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [userId, setUserId] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    setUserId(getUserIdFromToken(token));
  }, [token]);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      message.error("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/changePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserID: userId,
          OldPass: oldPassword,
          NewPass: newPassword,
        }),
      });
      const data = await response.json();



      if (data.err === 0) {
        message.success("Đổi mật khẩu thành công!");
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        message.error(data.msg || "Mật khẩu cũ không đúng. Vui lòng nhập lại");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  const toggleShowPassword = (setShowPassword) => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="account-container-account-changepass">
      <div className="sidebar-wrapper">
        <SidebarProfile />
      </div>
      <div className="change-password-form">
        <h2>Đổi mật khẩu</h2>
        <form onSubmit={handleChangePassword}>
          <div className="password-input">
            <label htmlFor="oldPassword">Mật khẩu cũ:</label>
            <div className="input-container">
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                icon={faEye}
                className="password-toggle"
                onClick={() => toggleShowPassword(setShowOldPassword)}
              />
            </div>
          </div>
          <div className="password-input">
            <label htmlFor="newPassword">Mật khẩu mới:</label>
            <div className="input-container">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                icon={faEye}
                className="password-toggle"
                onClick={() => toggleShowPassword(setShowNewPassword)}
              />
            </div>
          </div>
          <div className="password-input">
            <label htmlFor="confirmNewPassword">Nhập lại mật khẩu mới:</label>
            <div className="input-container">
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                icon={faEye}
                className="password-toggle"
                onClick={() => toggleShowPassword(setShowConfirmNewPassword)}
              />
            </div>
          </div>
          <div>
            <button type="submit">Đổi mật khẩu</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
