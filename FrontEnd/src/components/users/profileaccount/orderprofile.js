import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./orderprofile.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserIdFromToken } from "../../store/actions/authAction";

const OrderProfile = () => {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [ordersData, setOrdersData] = useState([]);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [orderToConfirm, setOrderToConfirm] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const userIdd = getUserIdFromToken(token);
  const [canRateMap, setCanRateMap] = useState({});

  const fetchOrders = useCallback(
    async (status) => {
      try {
        const response = await axios.get(
          `https://hellomilkyshop123.azurewebsites.net/api/v1/order/getOrdersByUserID/${userIdd}`
        );
        const orders = response.data;
        const filteredOrders = status
          ? orders.filter(
            (order) =>
              getStatusFromStatusOrderName(order.StatusOrderName) === status
          )
          : orders;
        const groupedOrders = filteredOrders.reduce((acc, order) => {
          const existingOrder = acc.find((o) => o.OrderID === order.OrderID);
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

        groupedOrders.sort((a, b) => b.OrderID - a.OrderID);

        setOrdersData(groupedOrders);

        groupedOrders.forEach((order) => {
          order.items.forEach(async (item) => {
            const canRate = await checkUserOrder(userIdd, item.ProductID);
            setCanRateMap((prev) => ({ ...prev, [item.ProductID]: canRate }));
          });
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    [userIdd]
  );

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
    return items
      .reduce((total, item) => {
        const discountedPrice = item.NewPrice || item.OldPrice;
        return total + item.Quantity * discountedPrice;
      }, 0)
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  };

  useEffect(() => {
    const statusCode = activeTab === "Tất cả" ? "" : activeTab;
    fetchOrders(statusCode);
  }, [activeTab, fetchOrders]);

  const handleCancelOrder = async () => {
    if (!orderToCancel) return;
    try {
      await axios.post("https://hellomilkyshop123.azurewebsites.net/api/v1/order/cancelOrder", {
        orderID: orderToCancel,
        reasonCancelContent: "Đã hủy bởi bạn",
        userID: userIdd,
      });
      const statusCode = activeTab === "Tất cả" ? "" : activeTab;
      fetchOrders(statusCode);
      setShowCancelPopup(false);
      setOrderToCancel(null);
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  const handleConfirmReceipt = async () => {
    if (!orderToConfirm) return;

    try {
      await axios.post(
        `https://hellomilkyshop123.azurewebsites.net/api/v1/order/updateStatusOrderID/${orderToConfirm}`,
        {
          statusOrderID: 4,
        }
      );

      const statusCode = activeTab === "Tất cả" ? "" : activeTab;
      fetchOrders(statusCode);

      setShowConfirmPopup(false);
      setOrderToConfirm(null);
    } catch (error) {
      console.error("Error confirming receipt:", error);
    }
  };

  const checkUserOrder = async (userId, productId) => {
    try {
      if (!userId || !productId) return false;
      const response = await axios.post(
        "https://hellomilkyshop123.azurewebsites.net/api/v1/comment/checkUserOrdered",
        {
          UserID: userId,
          ProductID: productId,
        }
      );
      const check = response.data.count > 0;
      return check;
    } catch (err) {
      console.error("Error checking user order:", err);
      return false;
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
              <button
                className="cancel-button"
                onClick={() => {
                  setShowCancelPopup(true);
                  setOrderToCancel(order.OrderID);
                }}
              >
                Hủy đơn hàng
              </button>
            )}
            {order.status === "Đã hủy" && (
              <p>
                {order.items[0].ReasonCancelContent
                  ? `Lí do hủy: ${order.items[0].ReasonCancelContent}`
                  : "Đã hủy"}
              </p>
            )}
          </div>
          {order.items.map((item, idx) => (
            <div key={idx} className="order-item">
              <Link to={`/product/${item.ProductID}`} title={item.ProductName}>
                <img src={item.Image} alt="Product" />
              </Link>
              <div className="item-details">
                <p>{item.ProductName}</p>
                <p>Phân loại hàng: {item.ProductCategoryName}</p>
                <p>Số lượng: {item.Quantity}</p>
                <div className="date-oderProfile">
                  <p>
                    <strong>Ngày tạo đơn: </strong>
                    {new Date(item.OrderDate).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="item-price">
                {order.status === "Hoàn thành" &&
                  canRateMap[item.ProductID] && (
                    <Link
                      to={`/product/${item.ProductID}`}
                      className="rate-button btn btn-warning"
                    >
                      Đánh giá
                    </Link>
                  )}

                <p>
                  {item.OldPrice &&
                    item.NewPrice &&
                    item.OldPrice !== item.NewPrice && (
                      <s>
                        {item.OldPrice.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </s>
                    )}
                  {item.NewPrice
                    ? item.NewPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                    : item.OldPrice &&
                    item.OldPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
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
            <span
              className="close-popup"
              onClick={() => setShowCancelPopup(false)}
            >
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

      {showConfirmPopup && (
        <div className="popup">
          <div className="popup-content">
            <span
              className="close-popup"
              onClick={() => setShowConfirmPopup(false)}
            >
              &times;
            </span>
            <p>Bạn chắc chắn đã nhận được hàng?</p>
            <div className="popup-buttons">
              <button onClick={() => setShowConfirmPopup(false)}>Không</button>
              <button onClick={handleConfirmReceipt}>Có</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderProfile;
