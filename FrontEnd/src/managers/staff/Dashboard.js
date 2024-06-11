import React, { useEffect, useState } from 'react';
import './Card.css'; // Ensure you have appropriate styles
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Import the auto module from chart.js

function Dashboard() {
    const [orderCount, setOrderCount] = useState(0);
    const [newOrdersCount, setNewOrdersCount] = useState(0);
    const [waitingOrdersCount, setWaitingOrdersCount] = useState(0);
    const [finishedOrdersCount, setFinishedOrdersCount] = useState(0);
    const [canceledOrdersCount, setCanceledOrdersCount] = useState(0);
    const [ordersIn7Days, setOrdersIn7Days] = useState([]);

    useEffect(() => {
        // Fetch data from APIs
        fetch('http://localhost:5000/api/v1/order/countOrdersPayed')
            .then(response => response.json())
            .then(data => setOrderCount(data.count));

        fetch('http://localhost:5000/api/v1/order/countNewOrders')
            .then(response => response.json())
            .then(data => setNewOrdersCount(data.count));

        fetch('http://localhost:5000/api/v1/order/countOrdersWaitToConfirm')
            .then(response => response.json())
            .then(data => setWaitingOrdersCount(data.count));

        fetch('http://localhost:5000/api/v1/order/countOrdersFinish')
            .then(response => response.json())
            .then(data => setFinishedOrdersCount(data.count));

        fetch('http://localhost:5000/api/v1/order/countOrdersCancel')
            .then(response => response.json())
            .then(data => setCanceledOrdersCount(data.count));

        fetch('http://localhost:5000/api/v1/order/countOrdersIn7Days')
            .then(response => response.json())
            .then(data => setOrdersIn7Days(data));
    }, []);

    // Data for the pie chart
    const pieData = {
        labels: ['Đơn hàng đã hoàn thành', 'Đơn hàng đã hủy'],
        datasets: [
            {
                data: [finishedOrdersCount, canceledOrdersCount],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
        ],
    };

    // Data for the line chart
    const lineData = {
        labels: ordersIn7Days.map(order => new Date(order.OrderDate).toLocaleDateString('vi-VN')),
        datasets: [
            {
                label: 'Đơn hàng trong 7 ngày qua',
                data: ordersIn7Days.map(order => order.count),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return (
        <div className="dashboard-st-thinh">
            <h1>Dashboard</h1>
            <div className="stats-st-thinh">
                <div className="stat-card-st-thinh">
                    <h2>Tổng đơn hàng: {orderCount}</h2>
                </div>
                <div className="stat-card-st-thinh">
                    <h2>Đơn hàng mới: {newOrdersCount}</h2>
                    <p style={{ color: 'gray' }}>theo ngày</p>
                </div>
                <div className="stat-card-st-thinh">
                    <h2>Đơn hàng chờ xác nhận: {waitingOrdersCount}</h2>
                </div>
            </div>
            <div className="charts-st-thinh">
                <div className="chart-container-st-thinh pie-chart-st-thinh">
                    <h2>Order Distribution</h2>
                    <Pie data={pieData} />
                </div>
                <div className="chart-container-st-thinh line-chart-st-thinh">
                    <h2>New Orders Over Time</h2>
                    <Line data={lineData} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
