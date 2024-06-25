import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const [dropDown, setDropDown] = useState(false);
  const location = useLocation();

  return (
    <div className="sidebar-container-st-thinh">
      <nav className="sidebar-st-thinh">
        <NavLink
          className={({ isActive }) => isActive ? 'active-st-thinh' : ''}
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
        <a
          className="manage-st-thinh"
          onClick={(e) => {
            e.preventDefault();
            setDropDown(!dropDown);
          }}
          href="#"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/839/839860.png"
            alt="Manage Orders Icon"
            style={{ width: "24px", marginRight: "2px" }}
            className="icon-staff-slidebar"
          />
          Quản lí đơn hàng
        </a>
        {dropDown && (
          <div className="dropdown-content-st-thinh">
            <NavLink
              className={({ isActive }) => isActive ? 'active-st-thinh' : ''}
              to="/confirm"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/9422/9422482.png"
                alt="Confirm Icon"
                style={{ width: "24px" }}
                className="icon-staff-slidebar"
              />{" "}
              Xác nhận đơn hàng
            </NavLink>
          </div>
        )}
        <NavLink
          className={({ isActive }) =>
            isActive || location.pathname.includes(("/products")) || location.pathname.includes(("/addingproduct")) ? "active-st-thinh" : ""
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
            isActive || location.pathname.includes(("/voucher-staff")) || location.pathname.includes(("/addingvoucher")) ? "active-st-thinh" : ""
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
            isActive || location.pathname.includes(("/posts")) || location.pathname.includes(("/addingpost")) ? "active-st-thinh" : ""
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
            isActive || location.pathname.includes(("/promotionmanage")) || location.pathname.includes(("/addpromotion")) ? "active-st-thinh" : ""
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
        <NavLink
          className={({ isActive }) => isActive ? 'active-st-thinh' : ''}
          to="/feedbackManage"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/8013/8013078.png"
            alt="Confirm Icon"
            style={{ width: "24px" }}
            className="icon-staff-slidebar"
          />{" "}
          Quản lí đánh giá
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
