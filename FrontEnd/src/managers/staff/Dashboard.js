// src/Dashboard.js
import React from 'react';
import './Sidebar.css';
import Card from './Card';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
function Dashboard() {
    const cardData = [
        { title: 'Tổng đơn hàng', value: 0 },
        { title: 'Đơn hàng mới', value: 0 },
        { title: 'Đơn hàng đang xử lý', value: 0 },
        { title: 'Đơn hàng đã hoàn thành', value: 0 },
        { title: 'Tổng doanh thu', value: '0' },
        { title: 'Khách hàng mới', value: 0 },
    ];
    const Card = ({ title, value }) => (
        <div className="card">
            <h2>{title}</h2>
            <p>{value}</p>
        </div>
    );
    return (
        <div className="dashboard ">
            <h1>Dashboard</h1>
            <div className="stats">

                {cardData.map((data, index) => (
                    <Card key={index} title={data.title} value={data.value} />
                ))}
            </div>


        </div>
    );
}

export default Dashboard;
