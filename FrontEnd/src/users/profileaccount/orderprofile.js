import React, { useState, useEffect } from "react";
import axios from "axios";
import "./orderprofile.css";
import { useSelector } from 'react-redux';
import { getUserIdFromToken } from "../store/actions/authAction";

const OrderProfile = () => {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [ordersData, setOrdersData] = useState([]);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const userIdd = getUserIdFromToken(token);

  const fetchOrders = async (status) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/order/getOrdersForUserByStatusOrderID/${userIdd}/${status}`);
      const orders = response.data.orders;

      const groupedOrders = orders.reduce((acc, order) => {
        const existingOrder = acc.find(o => o.OrderID === order.OrderID);
        if (existingOrder) {
          existingOrder.items.push(order);
        } else {
          acc.push({
            OrderID: order.OrderID,
            status: getStatusFromStatusCode(status),
            items: [order],
            totalPrice: calculateTotalPrice([order]),
          });
        }
        return acc;
      }, []);

      setOrdersData(groupedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const getStatusFromStatusCode = (statusCode) => {
    switch (statusCode) {
      case 1:
        return "Chờ xác nhận";
      case 2:
        return "Đang giao";
      case 3:
        return "Đã hủy";
      case 4:
        return "Hoàn thành";
      default:
        return "Tất cả";
    }
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => {
      const discountedPrice = item.Price[1] || item.Price[0];
      return total + (item.Quantity * discountedPrice);
    }, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  useEffect(() => {
    const statusCode = activeTab === "Tất cả" ? "" : activeTab === "Chờ xác nhận" ? 1 : activeTab === "Đang giao" ? 2 : activeTab === "Đã hủy" ? 3 : 4;
    fetchOrders(statusCode);
  }, [activeTab]);

  const renderOrders = () => {
    return ordersData.map((order, index) => {
      let statusClass = "";
      switch (order.status) {
        case "Hoàn thành":
          statusClass = "completed";
          break;
        case "Đã hủy":
          statusClass = "cancel";
          break;
        case "Đang giao":
          statusClass = "shipping";
          break;
        case "Chờ xác nhận":
          statusClass = "pending";
          break;
        default:
          statusClass = "";
      }

      return (
        <div key={index} className={`order-summary ${statusClass}`}>
          <div className="order-header">
            <p>{order.status}</p>
            {order.status === "Chờ xác nhận" && (
              <button className="cancel-button" onClick={() => setShowCancelPopup(true)}>Hủy đơn hàng</button>
            )}
            {order.status === "Đã hủy" && (
              <p>{order.cancelledBy === "user" ? "Đã hủy bởi bạn" : "Đã hủy bởi nhân viên"}</p>
            )}
            {order.status === "Hoàn thành"}
          </div>
          {order.items.map((item, idx) => (
            <div key={idx} className="order-item">
              <img src={item.Image} alt="Product" />
              <div className="item-details">
                <p>{item.ProductName}</p>
                <p>Phân loại hàng: {item.ProductCategoryName}</p>
                <p>Số lượng: {item.Quantity}</p>
              </div>
              <div className="item-price">

                {order.status === "Hoàn thành" ? <button className="rate-button">Đánh giá</button> : <></>}

                <p>
                  {item.Price[0] !== item.Price[1] && <s>{item.Price[0]}</s>} {item.Price[1]}
                </p>
              </div>
            </div>
          ))}
          <div className="total-price">
            <p>Thành tiền: {order.totalPrice}</p>
          </div>
          {order.status === "Đã hủy" && order.cancelReason && (
            <div className="cancel-reason">
              <p>Lý do hủy: {order.cancelReason}</p>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="order-details">
      <header>
        <ul>
          <li
            className={activeTab === "Tất cả" ? "active" : ""}
            onClick={() => setActiveTab("Tất cả")}
          >
            Tất cả
          </li>
          <li
            className={activeTab === "Chờ xác nhận" ? "active" : ""}
            onClick={() => setActiveTab("Chờ xác nhận")}
          >
            Chờ xác nhận
          </li>
          <li
            className={activeTab === "Đang giao" ? "active" : ""}
            onClick={() => setActiveTab("Đang giao")}
          >
            Đang giao
          </li>
          <li
            className={activeTab === "Hoàn thành" ? "active" : ""}
            onClick={() => setActiveTab("Hoàn thành")}
          >
            Hoàn thành
          </li>
          <li
            className={activeTab === "Đã hủy" ? "active" : ""}
            onClick={() => setActiveTab("Đã hủy")}
          >
            Đã hủy
          </li>
        </ul>
      </header>

      <div className="order-container">{renderOrders()}</div>

      {showCancelPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-popup" onClick={() => setShowCancelPopup(false)}>
              &times;
            </span>
            <p>Bạn chắc chắn muốn hủy đơn hàng?</p>
            <div className="popup-buttons">
              <button onClick={() => setShowCancelPopup(false)}>Không</button>
              <button onClick={() => console.log("Đã hủy đơn hàng")}>Có</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderProfile;
