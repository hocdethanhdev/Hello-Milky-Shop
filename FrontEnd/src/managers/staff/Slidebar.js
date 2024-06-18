import React from "react";
import "./Sidebar.css";
import { useState } from 'react';
import { GiBoxUnpacking } from "react-icons/gi";
function Sidebar() {
  const [dropDown, setDropDown] = useState(false)
  return (
    <div className="sidebar-container-st-thinh">
      <nav className="sidebar-st-thinh">
        <a className="active-st-thinh" href="/dashboard">
          <img
            src="/ImageMilkShop/dashboard.png"
            alt="Dashboard Icon"
            style={{ width: "24px" }}
          />{" "}
          Dashboard
        </a>
        <a href="/voucher-staff">
          <img
            src="/ImageMilkShop/CreateVoucher.jpg"
            alt="Voucher Icon"
            style={{ width: "24px" }}
          />{" "}
          Tạo voucher
        </a>
        <a href="/report">
          <img
            src="/ImageMilkShop/XuLyReport.jpg"
            alt="Report Icon"
            style={{ width: "24px" }}
          />{" "}
          Xử lý report
        </a>
        <a href="/posts">
          <img
            src="/ImageMilkShop/QuanLyBaiViet.jpg"
            alt="Post Icon"
            style={{ width: "24px" }}
          />{" "}
          Quản lý bài viết
        </a>
        <div className='manage-st-thinh' onClick={() => { setDropDown(!dropDown) }} ><GiBoxUnpacking /> Quản lí đơn hàng</div>
        {dropDown &&
          <div>
            <a href="/confirm">
              <img
                src="/ImageMilkShop/XacNhanDonHang.jpg"
                alt="Confirm Icon"
                style={{ width: "24px" }}
              />{" "}
              Xác nhận đơn hàng
            </a>
            <div>a</div>
          </div>
        }


        <a href="/products">
          <img
            src="/ImageMilkShop/QuanLyKho.jpg"
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
