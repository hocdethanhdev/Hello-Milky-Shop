import React, { useState, useEffect } from "react";
import axios from "axios";
import "./orderprofile.css";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserIdFromToken } from "../store/actions/authAction";

const OrderProfile = () => {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [ordersData, setOrdersData] = useState([]);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const userIdd = getUserIdFromToken(token);

  const fetchOrders = async (status) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/order/getOrdersByUserID/${userIdd}`);
      const orders = response.data;

      const filteredOrders = status ? orders.filter(order => getStatusFromStatusOrderName(order.StatusOrderName) === status) : orders;

      const groupedOrders = filteredOrders.reduce((acc, order) => {
        const existingOrder = acc.find(o => o.OrderID === order.OrderID);
        if (existingOrder) {
          existingOrder.items.push(order);
        } else {
          acc.push({
            OrderID: order.OrderID,
            status: order.StatusOrderName,
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

  const getStatusFromStatusOrderName = (statusOrderName) => {
    switch (statusOrderName) {
      case "Chờ xác nhận":
        return "Chờ xác nhận";
      case "Đang giao":
        return "Đang giao";
      case "Đã hủy":
        return "Đã hủy";
      case "Hoàn thành":
        return "Hoàn thành";
      default:
        return "Tất cả";
    }
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => {
      const discountedPrice = item.NewPrice || item.OldPrice;
      return total + (item.Quantity * discountedPrice);
    }, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  useEffect(() => {
    const statusCode = activeTab === "Tất cả" ? "" : activeTab;
    fetchOrders(statusCode);
  }, [activeTab]);

  const handleCancelOrder = async () => {
    if (!orderToCancel) return;

    try {
      await axios.post("http://localhost:5000/api/v1/order/cancelOrder", {
        orderID: orderToCancel,
        reasonCancelContent: "Đã hủy bởi bạn",
        userID: userIdd,
      });

      // Refetch orders after cancellation
      const statusCode = activeTab === "Tất cả" ? "" : activeTab;
      fetchOrders(statusCode);

      setShowCancelPopup(false);
      setOrderToCancel(null);
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

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
              <button className="cancel-button" onClick={() => {
                setShowCancelPopup(true);
                setOrderToCancel(order.OrderID);
              }}>Hủy đơn hàng</button>
            )}
            {order.status === "Đã hủy" && (
              <p>{order.items[0].ReasonCancelContent ? `Lý do hủy: ${order.items[0].ReasonCancelContent}` : "Đã hủy"}</p>
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
                {order.status === "Hoàn thành" && (
                  <Link to={`/product/${item.ProductID}`} className="rate-button btn btn-warning">
                    Đánh giá
                  </Link>
                )}
                <p>
                  {item.OldPrice && item.NewPrice && item.OldPrice !== item.NewPrice && <s>{item.OldPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</s>}
                  {item.NewPrice ? item.NewPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : item.OldPrice && item.OldPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </p>
              </div>
            </div>
          ))}
          <div className="total-price">
            <p>Thành tiền: {order.totalPrice}</p>
          </div>
        </div>
      );
    });
  };

    return (
      <div className="order-details">
        <header>
          <select
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="1">Chờ xác nhận</option>
            <option value="2">Đang giao</option>
            <option value="3">Đã hủy</option>
            <option value="4">Hoàn thành</option>
          </select>
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
              <button onClick={handleCancelOrder}>Có</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

  export default OrderProfile;
