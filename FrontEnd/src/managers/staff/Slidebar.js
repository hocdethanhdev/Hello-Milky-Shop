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
          />{" "}
          Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive || location.pathname.includes(("/voucher-staff")) || location.pathname.includes(("/addingvoucher"))? "active-st-thinh" : ""
          }
          to="/voucher-staff"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/8464/8464650.png"
            alt="Manage Orders Icon"
            style={{ width: "20px", marginRight: "5px" }}
          />
          Quản lý voucher
        </NavLink>
        <NavLink
          className={({ isActive }) => isActive ? 'active-st-thinh' : ''}
          to="/report"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/11383/11383877.png"
            alt="Manage Orders Icon"
            style={{ width: "28px" }}
          />
          Xử lí report
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive || location.pathname.includes(("/posts")) || location.pathname.includes(("/addingpost"))? "active-st-thinh" : ""
          }
          to="/posts"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/9458/9458635.png"
            alt="Manage Orders Icon"
            style={{ width: "23px" }}
          />
          Quản lý bài viết
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
              />{" "}
              Xác nhận đơn hàng
            </NavLink>
          </div>
        )}
        <NavLink
          className={({ isActive }) =>
            isActive || location.pathname.includes(("/products")) || location.pathname.includes(("/addingproduct"))? "active-st-thinh" : ""
          }
          to="/products"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/9321/9321486.png"
            alt="Product Icon"
            style={{ width: "24px" }}
          />{" "}
          Quản lý sản phẩm
        </NavLink>
        <NavLink
              className={({ isActive }) =>
                isActive || location.pathname.includes(("/promotionmanage")) || location.pathname.includes(("/addpromotion"))? "active-st-thinh" : ""
              }
              to="/promotionmanage"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/7650/7650832.png"
                alt="Confirm Icon"
                style={{ width: "24px" }}
              />{" "}
              Quản lí khuyến mãi
            </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
