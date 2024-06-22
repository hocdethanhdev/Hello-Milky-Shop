import React, { useState } from "react";
import "./Sidebar.css";
function Sidebar() {
  const [dropDown, setDropDown] = useState(false);

  return (
    <div className="sidebar-container-st-thinh">
      <nav className="sidebar-st-thinh">
        <a className="active-st-thinh" href="/">
          <img
            src="/ImageMilkShop/dashboard.png"
            alt="Dashboard Icon"
            style={{ width: "24px" }}
          />{" "}
          Dashboard
        </a>
        <a href="/voucher-staff">
          <img
            src="https://cdn-icons-png.flaticon.com/128/8464/8464650.png"
            alt="Manage Orders Icon"
            style={{ width: "20px", marginRight: "5px" }}
          />
          Tạo voucher
        </a>

        <a href="/report">
          <img
            src="https://cdn-icons-png.flaticon.com/128/11383/11383877.png"
            alt="Manage Orders Icon"
            style={{ width: "28px" }}
          />
          Xử lí report
        </a>
        <a href="/posts">
        <img
            src="https://cdn-icons-png.flaticon.com/128/9458/9458635.png"
            alt="Manage Orders Icon"
            style={{ width: "23px" }}
          />
          Quản lý bài viết
        </a>
        <a
          className="manage-st-thinh"
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            setDropDown(!dropDown);
          }}
          href="#">
          <img
            src="https://cdn-icons-png.flaticon.com/512/839/839860.png"
            alt="Manage Orders Icon"
            style={{ width: "24px", marginRight: "2px" }}
          />
          Quản lí đơn hàng
        </a>
        {dropDown && (
          <div className="dropdown-content-st-thinh">
            <a href="/confirm">
              <img
                src="https://cdn-icons-png.flaticon.com/128/9422/9422482.png"
                alt="Confirm Icon"
                style={{ width: "24px" }}
              />{" "}
              Xác nhận đơn hàng
            </a>
          </div>
        )}
        <a href="/products">
          <img
            src="https://cdn-icons-png.flaticon.com/128/9321/9321486.png"
            alt="Product Icon"
            style={{ width: "24px" }}
          />{" "}
          Quản lý sản phẩm
        </a>
      </nav>
    </div>
  );
}

export default Sidebar;
