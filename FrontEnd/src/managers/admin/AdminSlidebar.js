import React from 'react';
import './AdminSlidebar.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
function AdminSlidebar() {
    return (
        <div className='admin-slidebar'>

            <div >
                <nav className="sidebara ">
                    <Link className="activea" to="/admin-dashboard">
                        <img src="/ImageMilkShop/dashboard.png" alt="Dashboard Icon" style={{ width: '24px' }} /> Dashboard
                    </Link>
                    <Link to="/manage-admin">
                        <img src="/ImageMilkShop/QuanLyBaiViet.jpg" alt="Post Icon" style={{ width: '24px' }} /> Admin
                    </Link>
                    <Link to="/manage-staff">
                        <img src="/ImageMilkShop/QuanLyBaiViet.jpg" alt="Post Icon" style={{ width: '24px' }} /> Staff
                    </Link>
                    <Link to="/manage-member">
                        <img src="/ImageMilkShop/QuanLyBaiViet.jpg" alt="Post Icon" style={{ width: '24px' }} /> Member
                    </Link>

                </nav>
            </div>



        </div>
    );
}

export default AdminSlidebar;

