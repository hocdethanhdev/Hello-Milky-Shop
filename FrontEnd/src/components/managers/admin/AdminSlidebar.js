import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./AdminSlidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

function AdminSlidebar() {
  const [dropDown, setDropDown] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setDropDown(!dropDown);
  };

  return (
    <div className="sidebar-container-st-thinh">
      <nav className="sidebar-st-thinh">
        <NavLink
          className={({ isActive }) => (isActive ? "active-st-thinh" : "")}
          to="/"
          end>
          <img
            src="/ImageMilkShop/dashboard.png"
            alt="Dashboard Icon"
            style={{ width: "24px" }}
            className="icon-staff-slidebar"
          />{" "}
          Dashboard
        </NavLink>
        <a className="manage-st-thinh" onClick={toggleDropdown} href="#">
          <img
            src="https://cdn-icons-png.flaticon.com/512/839/839860.png"
            alt="Manage Orders Icon"
            style={{ width: "24px", marginRight: "2px" }}
            className="icon-staff-slidebar"
          />
          Quản lí tài khoản
          <FontAwesomeIcon
            icon={dropDown ? faCaretUp : faCaretDown}
            style={{ marginLeft: "5px" }}
          />
        </a>
        <div
          className={`dropdown-content-st-thinh ${dropDown ? "active" : ""}`}>
          <NavLink
            className={({ isActive }) =>
              isActive ||
                location.pathname.includes("/manage-admin") ||
                location.pathname.includes("/adding-account-admin")
                ? "active-st-thinh"
                : ""
            }
            to="/manage-admin">
            <img
              src="https://cdn-icons-png.flaticon.com/128/15699/15699633.png"
              alt="Admin icon"
              style={{ width: "24px" }}
              className="icon-staff-slidebar"
            />{" "}
            Admin
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ||
                location.pathname.includes("/manage-staff") ||
                location.pathname.includes("/adding-account-staff")
                ? "active-st-thinh"
                : ""
            }
            to="/manage-staff">
            <img
              src="https://cdn-icons-png.flaticon.com/128/15552/15552446.png"
              alt="Staff Icon"
              style={{ width: "24px" }}
              className="icon-staff-slidebar"
            />{" "}
            Staff
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-st-thinh" : "")}
            to="/manage-member">
            <img
              src="https://cdn-icons-png.flaticon.com/128/709/709722.png"
              alt="Member Icon"
              style={{ width: "24px" }}
              className="icon-staff-slidebar"
            />{" "}
            Member
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default AdminSlidebar;
