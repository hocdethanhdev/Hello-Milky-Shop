import React from 'react';
import './Sidebar.css';
import Card from './Card';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
function Slidebar() {
    return (
        <div className=' bang row'>
            <div >
                <nav className="sidebar ">
                    <Link className="active" to="/dashboard">
                        <img src="/ImageMilkShop/dashboard.png" alt="Dashboard Icon" style={{ width: '24px' }} /> Dashboard
                    </Link>
                    <Link to="/voucher">
                        <img src="/ImageMilkShop/CreateVoucher.jpg" alt="Voucher Icon" style={{ width: '24px' }} /> Tạo voucher
                    </Link>
                    <Link to="/report">
                        <img src="/ImageMilkShop/XuLyReport.jpg" alt="Report Icon" style={{ width: '24px' }} /> Xử lý report
                    </Link>
                    <Link to="/posts">
                        <img src="/ImageMilkShop/QuanLyBaiViet.jpg" alt="Post Icon" style={{ width: '24px' }} /> Quản lý bài viết
                    </Link>
                    <Link to="/confirm">
                        <img src="/ImageMilkShop/XacNhanDonHang.jpg" alt="Confirm Icon" style={{ width: '24px' }} /> Xác nhận đơn hàng
                    </Link>
                    <Link to="/products">
                        <img src="/ImageMilkShop/QuanLyKho.jpg" alt="Product Icon" style={{ width: '24px' }} /> Quản lý sản phẩm
                    </Link>
                </nav>
            </div>


        </div>
    );
}

export default Slidebar;

