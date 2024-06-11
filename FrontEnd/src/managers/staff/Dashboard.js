import React from 'react';
import './Card.css'; // Ensure you have appropriate styles
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Import the auto module from chart.js

function Dashboard() {
    // Data for the pie chart
    const pieData = {
        labels: ['Tổng đơn hàng', 'Đơn hàng mới', 'Đơn hàng đang xử lý', 'Đơn hàng đã hoàn thành'],
        datasets: [
            {
                data: [100, 20, 30, 50], // Replace with actual data
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                ],
            },
        ],
    };

    // Data for the line chart (new orders)
    const lineData = {
        labels: ['1 Jun', '2 Jun', '3 Jun', '4 Jun', '5 Jun', '6 Jun', '7 Jun'],
        datasets: [
            {
                label: 'Đơn hàng mới',
                data: [12, 19, 3, 5, 2, 3, 7], // Replace with actual data
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    // Data for the line chart (vouchers used)
    const voucherData = {
        labels: ['1 Jun', '2 Jun', '3 Jun', '4 Jun', '5 Jun', '6 Jun', '7 Jun'],
        datasets: [
            {
                label: 'Voucher được sử dụng',
                data: [5, 9, 7, 8, 5, 10, 6], // Replace with actual data
                fill: false,
                backgroundColor: 'rgb(153, 102, 255)',
                borderColor: 'rgba(153, 102, 255, 0.2)',
            },
        ],
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="charts">
                <div className="chart-container pie-chart">
                    <h2>Order Distribution</h2>
                    <Pie data={pieData} />
                </div>
                <div className="chart-group">
                    <div className="chart-container line-chart">
                        <h2>New Orders Over Time</h2>
                        <Line data={lineData} />
                    </div>
                    <div className="chart-container voucher-chart">
                        <h2>Voucher Usage Over Time</h2>
                        <Line data={voucherData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
