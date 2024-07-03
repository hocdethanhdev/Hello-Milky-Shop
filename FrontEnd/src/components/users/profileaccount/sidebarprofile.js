import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./sidebarprofile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

function SidebarProfile() {
  const [dropDown, setDropDown] = useState(false);

  const toggleDropdown = () => {
    setDropDown(!dropDown);
  };

  return (
    <div className="sidebar-container-st-tri">
      <nav className="sidebar-st-thinh">
        
        <a className="manage-st-thinh" onClick={toggleDropdown} href="#">
          <img
            src="https://cdn-icons-png.flaticon.com/128/8188/8188338.png"
            alt="Manage Orders Icon"
            style={{ width: "24px", marginRight: "2px" }}
            className="icon-staff-slidebar"
          />
          Tài khoản của tôi
          <FontAwesomeIcon
            icon={dropDown ? faCaretUp : faCaretDown}
            style={{ marginLeft: "5px" }}
          />
        </a>
        <div
          className={`dropdown-content-st-thinh ${dropDown ? "active" : ""}`}>
          <NavLink
            className={({ isActive }) => (isActive ? "active-st-thinh" : "")}
            to="/account">
            <img
              src="https://cdn-icons-png.flaticon.com/128/942/942799.png"
              alt="Confirm Icon"
              style={{ width: "24px" }}
              className="icon-staff-slidebar"
            />{" "}
            Hồ sơ
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-st-thinh" : "")}
            to="/ChangePassword">
            <img
              src="https://cdn-icons-png.flaticon.com/128/159/159478.png"
              alt="Confirm Icon"
              style={{ width: "24px" }}
              className="icon-staff-slidebar"
            />{" "}
            Đổi mật khẩu
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-st-thinh" : "")}
            to="/Address">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3607/3607275.png"
              alt="Confirm Icon"
              style={{ width: "24px" }}
              className="icon-staff-slidebar"
            />{" "}
            Địa chỉ
          </NavLink>
        </div>
        <NavLink
            className={({ isActive }) => (isActive ? "active-st-thinh" : "")}
            to="/profile">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2728/2728577.png"
              alt="Order Icon"
              style={{ width: "24px" }}
              className="icon-staff-slidebar"
            />{" "}
            Đơn hàng của bạn
          </NavLink>
        
      </nav>
    </div>
  );
}

export default SidebarProfile;
