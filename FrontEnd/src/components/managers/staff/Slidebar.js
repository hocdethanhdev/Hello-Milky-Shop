import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { IoChatboxEllipsesOutline } from "react-icons/io5";


function Sidebar() {
  const [dropDown, setDropDown] = useState(false);
  const [feedbackDropDown, setFeedbackDropDown] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setDropDown(!dropDown);
  };

  const toggleFeedbackDropdown = () => {
    setFeedbackDropDown(!feedbackDropDown);
  };

  return (
    <div className="sidebar-container-st-thinh">
      <nav className="sidebar-st-thinh">
        <NavLink
          className={({ isActive }) => (isActive ? "active-st-thinh" : "")}
          to="/"
          end
        >
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
          Quản lí đơn hàng
          <FontAwesomeIcon
            icon={dropDown ? faCaretUp : faCaretDown}
            style={{ marginLeft: "5px" }}
          />
        </a>
        <div className={`dropdown-content-st-thinh ${dropDown ? "active" : ""}`}>
          <NavLink
            className={({ isActive }) => (isActive ? "active-st-thinh" : "")}
            to="/confirm"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/4056/4056748.png"
              alt="Confirm Icon"
              style={{ width: "24px" }}
              className="icon-staff-slidebar"
            />{" "}
            Xác nhận đơn hàng
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-st-thinh" : "")}
            to="/cancel-order"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/3037/3037017.png"
              alt="Confirm Icon"
              style={{ width: "24px" }}
              className="icon-staff-slidebar"
            />{" "}
            Đơn hàng đã hủy
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-st-thinh" : "")}
            to="/order-in-transit"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/5046/5046856.png"
              alt="Confirm Icon"
              style={{ width: "24px" }}
              className="icon-staff-slidebar"
            />{" "}
            Đơn hàng đang giao
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-st-thinh" : "")}
            to="/completed-order"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/9422/9422482.png"
              alt="Confirm Icon"
              style={{ width: "24px" }}
              className="icon-staff-slidebar"
            />{" "}
            Đơn hàng đã hoàn thành
          </NavLink>
        </div>
        <NavLink
          className={({ isActive }) =>
            isActive ||
              location.pathname.includes("/products") ||
              location.pathname.includes("/addingproduct")
              ? "active-st-thinh"
              : ""
          }
          to="/products"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/9321/9321486.png"
            alt="Product Icon"
            style={{ width: "24px" }}
            className="icon-staff-slidebar"
          />{" "}
          Quản lý sản phẩm
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ||
              location.pathname.includes("/voucher-staff") ||
              location.pathname.includes("/addingvoucher")
              ? "active-st-thinh"
              : ""
          }
          to="/voucher-staff"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/8464/8464650.png"
            alt="Manage Orders Icon"
            style={{ width: "20px", marginRight: "5px" }}
            className="icon-staff-slidebar"
          />
          Quản lý voucher
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ||
              location.pathname.includes("/posts") ||
              location.pathname.includes("/addingpost")
              ? "active-st-thinh"
              : ""
          }
          to="/posts"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/9458/9458635.png"
            alt="Manage Orders Icon"
            style={{ width: "23px" }}
            className="icon-staff-slidebar"
          />
          Quản lý bài viết
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ||
              location.pathname.includes("/promotionmanage") ||
              location.pathname.includes("/addpromotion")
              ? "active-st-thinh"
              : ""
          }
          to="/promotionmanage"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/7650/7650832.png"
            alt="Confirm Icon"
            style={{ width: "24px" }}
            className="icon-staff-slidebar"
          />{" "}
          Quản lí khuyến mãi
        </NavLink>

        <a className="manage-st-thinh" onClick={toggleFeedbackDropdown} href="#">
          <img
            src="https://cdn-icons-png.flaticon.com/128/8013/8013078.png"
            alt="Feedback Icon"
            style={{ width: "24px" }}
            className="icon-staff-slidebar"
          />{" "}
          Quản lí đánh giá
          <FontAwesomeIcon
            icon={feedbackDropDown ? faCaretUp : faCaretDown}
            style={{ marginLeft: "5px" }}
          />
        </a>
        <div
          className={`dropdown-content-st-thinh ${feedbackDropDown ? "active" : ""}`}
        >
          <NavLink
            className={({ isActive }) => (isActive ? "active-st-thinh" : "")}
            to="/feedbackManage"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/13339/13339327.png"
              alt="Unresponded Feedback Icon"
              style={{ width: "24px" }}
              className="icon-staff-slidebar"
            />{" "}
            Chưa phản hồi
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-st-thinh" : "")}
            to="/respondedFeedback"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/3594/3594802.png"
              alt="Responded Feedback Icon"
              style={{ width: "24px" }}
              className="icon-staff-slidebar"
            />{" "}
            Đã phản hồi
          </NavLink>
        </div>
        <NavLink
          className={({ isActive }) => (isActive ? "active-st-thinh" : "")}
          to="/chat-page"
        >
         <img
              src="https://cdn-icons-png.flaticon.com/128/1370/1370907.png"
              alt="Chat Icon"
              style={{ width: "24px" }}
              className="icon-staff-slidebar"
            />
          Tư vấn mua hàng
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
