import React, { useEffect, useState } from "react";
import "./Card.css"; // Ensure you have appropriate styles
import { Line, Doughnut } from "react-chartjs-2";
import "chart.js/auto"; // Import the auto module from chart.js
import { config } from "../../../config";

function Dashboard() {
  const [orderCount, setOrderCount] = useState(0);
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const [waitingOrdersCount, setWaitingOrdersCount] = useState(0);
  const [finishedOrdersCount, setFinishedOrdersCount] = useState(0);
  const [canceledOrdersCount, setCanceledOrdersCount] = useState(0);
  const [shippingOrderCount, setShippingOrdersCount] = useState(0);
  const [ordersIn7Days, setOrdersIn7Days] = useState([]);

  useEffect(() => {
    // Fetch data from APIs
    fetch(`${config.API_ROOT}/api/v1/order/countOrdersPayed`)
      .then((response) => response.json())
      .then((data) => setOrderCount(data.count));

    fetch(`${config.API_ROOT}/api/v1/order/countNewOrders`)
      .then((response) => response.json())
      .then((data) => setNewOrdersCount(data.count));

    fetch(`${config.API_ROOT}/api/v1/order/countOrdersByStatusOrderID/1`)
      .then((response) => response.json())
      .then((data) => setWaitingOrdersCount(data.count));

    fetch(`${config.API_ROOT}/api/v1/order/countOrdersByStatusOrderID/4`)
      .then((response) => response.json())
      .then((data) => setFinishedOrdersCount(data.count));

    fetch(`${config.API_ROOT}/api/v1/order/countOrdersByStatusOrderID/3`)
      .then((response) => response.json())
      .then((data) => setCanceledOrdersCount(data.count));

    fetch(`${config.API_ROOT}/api/v1/order/countOrdersByStatusOrderID/2`)
      .then((response) => response.json())
      .then((data) => setShippingOrdersCount(data.count));

    fetch(`${config.API_ROOT}/api/v1/order/countOrdersIn7Days`)
      .then((response) => response.json())
      .then((data) => setOrdersIn7Days(data.data));
  }, []);

  // Data for the pie chart
  const doughnutData = {
    labels: [
      "Đơn hàng đã hoàn thành",
      "Đơn hàng đã hủy",
      "Đơn hàng đang giao",
      "Đơn hàng đang chờ xác nhận",
    ],
    datasets: [
      {
        data: [
          finishedOrdersCount,
          canceledOrdersCount,
          shippingOrderCount,
          waitingOrdersCount,
        ],
        backgroundColor: ["#4BC0C0", "#FF6384", "#FFCE56", "#36A2EB"],
        hoverBackgroundColor: ["#4BC0C0", "#FF6384", "#FFCE56", "#36A2EB"],
      },
    ],
  };

  // Data for the line chart
  const lineData = {
    labels: ordersIn7Days.map((order) =>
      new Date(order.OrderDate).toLocaleDateString("vi-VN")
    ),
    datasets: [
      {
        label: "Số đơn hàng",
        data: ordersIn7Days.map((order) => order.count),
        fill: false,
        backgroundColor: "#FF9F40",
        borderColor: "#FF9F40",
      },
    ],
  };

  return (
    <div className="dashboard-st-thinh">
      <div className="stats-st-thinh">
        <div className="stat-card-st-thinh">
          <h2>Tổng đơn hàng: {orderCount}</h2>
        </div>
        <div className="stat-card-st-thinh">
          <h2>Đơn hàng mới: {newOrdersCount}</h2>
          <p style={{ color: "gray" }}>theo ngày</p>
        </div>
        <div className="stat-card-st-thinh">
          <h2>Đơn hàng chờ xác nhận: {waitingOrdersCount}</h2>
        </div>
      </div>
      <div className="charts-st-thinh">
        <div className="chart-container-st-thinh pie-chart-st-thinh">
          <h2>Đơn hàng</h2>
          <Doughnut data={doughnutData} />
        </div>
        <div className="chart-container-st-thinh line-chart-st-thinh">
          <h2>Đơn hàng trong 7 ngày qua</h2>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
