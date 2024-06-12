import React, { useState } from "react";
import "./orderprofile.css";

const ordersData = [
  {
    status: "Hoàn thành",
    items: [
      {
        name: "Áo Sơ Mi Oxford Dài Tay Kẻ Sọc Dino x Yumi Form Over Size Bản Cao Cấp Trẻ Trung Năng Động SM01",
        category: "Sọc Xanh, L",
        quantity: 10,
        originalPrice: "350.000₫",
        discountedPrice: "169.000₫",
        imgSrc: "https://via.placeholder.com/100",
      },
      {
        name: "Quần Jean Nam Rách Gối Phong Cách Thời Trang Trẻ Trung QJ02",
        category: "Đen, M",
        quantity: 2,
        originalPrice: "500.000₫",
        discountedPrice: "299.000₫",
        imgSrc: "https://via.placeholder.com/100",
      },
    ],
    totalPrice: "716.150₫",
  },
  {
    status: "Chờ xác nhận",
    items: [
      {
        name: "Áo Sơ Mi Oxford Dài Tay Kẻ Sọc Dino x Yumi Form Over Size Bản Cao Cấp Trẻ Trung Năng Động SM01",
        category: "Sọc Xanh, L",
        quantity: 10,
        originalPrice: "350.000₫",
        discountedPrice: "169.000₫",
        imgSrc: "https://via.placeholder.com/100",
      },
      {
        name: "Quần Jean Nam Rách Gối Phong Cách Thời Trang Trẻ Trung QJ02",
        category: "Đen, M",
        quantity: 2,
        originalPrice: "500.000₫",
        discountedPrice: "299.000₫",
        imgSrc: "https://via.placeholder.com/100",
      },
    ],
    totalPrice: "716.150₫",
  },
  {
    status: "Đang giao",
    items: [
      {
        name: "Áo Sơ Mi Oxford Dài Tay Kẻ Sọc Dino x Yumi Form Over Size Bản Cao Cấp Trẻ Trung Năng Động SM01",
        category: "Sọc Xanh, L",
        quantity: 10,
        originalPrice: "350.000₫",
        discountedPrice: "169.000₫",
        imgSrc: "https://via.placeholder.com/100",
      },
      {
        name: "Quần Jean Nam Rách Gối Phong Cách Thời Trang Trẻ Trung QJ02",
        category: "Đen, M",
        quantity: 2,
        originalPrice: "500.000₫",
        discountedPrice: "299.000₫",
        imgSrc: "https://via.placeholder.com/100",
      },
    ],
    totalPrice: "716.150₫",
  },
  {
    status: "Đã hủy",
    items: [
      {
        name: "Áo Sơ Mi Oxford Dài Tay Kẻ Sọc Dino x Yumi Form Over Size Bản Cao Cấp Trẻ Trung Năng Động SM01",
        category: "Sọc Xanh, L",
        quantity: 10,
        originalPrice: "350.000₫",
        discountedPrice: "169.000₫",
        imgSrc: "https://via.placeholder.com/100",
      },
      {
        name: "Quần Jean Nam Rách Gối Phong Cách Thời Trang Trẻ Trung QJ02",
        category: "Đen, M",
        quantity: 2,
        originalPrice: "500.000₫",
        discountedPrice: "299.000₫",
        imgSrc: "https://via.placeholder.com/100",
      },
    ],
    totalPrice: "716.150₫",
  },
];

function OrderProfile() {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const renderOrders = (status) => {
    return ordersData
      .filter((order) => status === "Tất cả" || order.status === status)
      .map((order, index) => {
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
                <p>Đã xóa bởi bạn</p>
              )}
              {order.status === "Hoàn thành" && (
                <button className="rate-button">Đánh giá</button>
              )}
            </div>
            {order.items.map((item, idx) => (
              <div key={idx} className="order-item">
                <img src={item.imgSrc} alt="Product" />
                <div className="item-details">
                  <p>{item.name}</p>
                  <p>Phân loại hàng: {item.category}</p>
                  <p>Số lượng: {item.quantity}</p>
                </div>
                <div className="item-price">
                  <p>
                    <s>{item.originalPrice}</s> {item.discountedPrice}
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

      <div className="order-container">{renderOrders(activeTab)}</div>

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
