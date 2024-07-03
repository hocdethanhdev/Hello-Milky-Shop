import React, { useState, useEffect } from "react";
import "./Confirm.css";
import { Modal, Button, message, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons"; // Import icon sort
import ThrowPage from "../../users/product/ui-list-product-mom/ThrowPage";
import { useSelector } from "react-redux";
import { getUserIdFromToken } from "../../store/actions/authAction";

function Confirm() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [shippingAddress, setShippingAddress] = useState(null);
  const ordersPerPage = 10;
  const { token } = useSelector((state) => state.auth);
  const userIdd = getUserIdFromToken(token);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/order/getOrdersByStatusOrderID/1"
      );
      const data = await response.json();
      setOrders(data.address);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const editOrder = (orderID) => {
    Modal.confirm({
      title: "Xác nhận thay đổi trạng thái đơn hàng",
      content: "Bạn có chắc muốn thay đổi trạng thái đơn hàng này không?",
      onOk: () => {
        fetch(
          `http://localhost:5000/api/v1/order/updateStatusOrderID/${orderID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ statusOrderID: 2 }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setOrders((prevOrders) =>
              prevOrders.map((order) =>
                order.OrderID === orderID
                  ? {
                      ...order,
                      StatusOrderID: [2, 2],
                      StatusOrderName: "Đã xác nhận",
                    }
                  : order
              )
            );

            message.success("Trạng thái đơn hàng đã được cập nhật.");
            fetchOrders();
          })
          .catch((error) => {
            message.error(
              `Có lỗi xảy ra khi cập nhật trạng thái đơn hàng: ${error.message}`
            );
          });
      },
    });
  };

  const cancelOrder = (orderID) => {
    setSelectedOrder(orderID);
    setIsCancelModalVisible(true);
  };

  const handleCancelModalOk = () => {
    fetch("http://localhost:5000/api/v1/order/cancelOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: selectedOrder,
        reasonCancelContent: cancelReason,
        userID: userIdd,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.OrderID !== selectedOrder)
        );
        message.success("Đơn hàng đã được hủy.");
        setIsCancelModalVisible(false);
        setCancelReason("");
        setSelectedOrder(null);
      })
      .catch((error) => {
        message.error(`Có lỗi xảy ra khi hủy đơn hàng: ${error.message}`);
      });
  };

  const handleCancelModalCancel = () => {
    setIsCancelModalVisible(false);
    setCancelReason("");
    setSelectedOrder(null);
  };

  const fetchOrderDetails = async (orderID) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/order/getOrderDetailByOrderID/${orderID}`
      );
      const data = await response.json();
      return data.address; 
    } catch (error) {
      console.error("Error fetching order details:", error);
      return [];
    }
  };

  const fetchShippingAddress = async (orderID) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/shippingAddress/getInfoShippingByOrderID/${orderID}`
      );
      const data = await response.json();
      setShippingAddress(data);
    } catch (error) {
      console.error("Error fetching shipping address:", error);
      setShippingAddress(null);
    }
  };

  const viewOrderDetails = async (order) => {
    const orderDetails = await fetchOrderDetails(order.OrderID);
    setSelectedOrder({ ...order, details: orderDetails });
    await fetchShippingAddress(order.OrderID);
    setIsDetailModalVisible(true);
  };

  const handleModalClose = () => {
    setIsDetailModalVisible(false);
    setSelectedOrder(null);
    setShippingAddress(null);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const formatPrice = (price) => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const handleSort = (key) => {
    let direction = "ascending";
    setSortConfig((prevSortConfig) => {
      if (prevSortConfig.key === key && prevSortConfig.direction === "ascending") {
        direction = "descending";
      }
  
      const sortedOrders = [...orders].sort((a, b) => {
        if (key === "OrderID") {
          return direction === "ascending" ? a[key] - b[key] : b[key] - a[key];
        } else {
          if (a[key] < b[key]) {
            return direction === "ascending" ? -1 : 1;
          }
          if (a[key] > b[key]) {
            return direction === "ascending" ? 1 : -1;
          }
          return 0;
        }
      });
  
      setOrders(sortedOrders);
      return { key, direction };
    });
  };
  

  return (
    <div className="confirm-container">
      <table>
        <thead>
          <tr className="row">
            <th className="col-md-2">
              Mã đơn hàng
              <button
                className="sort-icon-order"
                onClick={() => handleSort("OrderID")}>
                <FontAwesomeIcon icon={faSort} />
              </button>
            </th>
            <th className="col-md-2">
              Ngày đặt hàng
              <button
                className="sort-icon-order"
                onClick={() => handleSort("OrderDate")}>
                <FontAwesomeIcon icon={faSort} />
              </button>
            </th>
            <th className="col-md-2">
              Tổng
              <button
                className="sort-icon-order"
                onClick={() => handleSort("TotalAmount")}>
                <FontAwesomeIcon icon={faSort} />
              </button>
            </th>
            <th className="col-md-3">Địa chỉ</th>
            <th className="col-md-3">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr className="row" key={order.OrderID}>
              <td className="col-md-2">{order.OrderID}</td>
              <td className="col-md-2">
                {new Date(order.OrderDate).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td className="col-md-2">
                {formatPrice(parseInt(order.TotalAmount))}
              </td>
              <td className="col-md-3">{order.Address}</td>
              <td className="col-md-3 nut-xndh">
                <button
                  type="button"
                  className="btn btn-warning xndh"
                  onClick={() => editOrder(order.OrderID)}>
                  Xác Nhận
                </button>
                <button
                  type="button"
                  className="btn btn-primary xndh"
                  onClick={() => viewOrderDetails(order)}>
                  Thông tin
                </button>
                <button
                  type="button"
                  className="btn btn-danger xndh"
                  onClick={() => cancelOrder(order.OrderID)}>
                  Hủy đơn
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container-cf">
        <ThrowPage
          current={currentPage}
          onChange={handlePageChange}
          total={orders.length}
          productsPerPage={ordersPerPage}
        />
      </div>
      {selectedOrder && isDetailModalVisible && (
        <Modal
          visible={isDetailModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Đóng
            </Button>,
          ]}>
          <div className="order-details">
            <h2>Thông tin đơn hàng #{selectedOrder.OrderID}</h2>
            <div className="order-info">
              <p>
                <strong>Ngày đặt hàng:</strong>{" "}
                {new Date(selectedOrder.OrderDate).toLocaleString()}
              </p>
              <p>
                <strong>Tổng tiền:</strong>{" "}
                {formatPrice(parseInt(selectedOrder.TotalAmount))}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {selectedOrder.Address}
              </p>
              <h3>Chi tiết đơn hàng</h3>
              <ul>
                {selectedOrder.details.map((detail, index) => (
                  <li key={index}>
                    {detail.ProductName} - Số lượng: {detail.Quantity}
                  </li>
                ))}
              </ul>
              {shippingAddress && (
                <div>
                  <h3>Thông tin giao hàng</h3>
                  <p>
                    <strong>Tên người nhận:</strong>{" "}
                    {shippingAddress.ContactName}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong>{" "}
                    {shippingAddress.ContactPhone}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
      <Modal
        title="Hủy đơn hàng"
        visible={isCancelModalVisible}
        onOk={handleCancelModalOk}
        onCancel={handleCancelModalCancel}>
        <Input.TextArea
          placeholder="Nhập lý do hủy đơn hàng"
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default Confirm;
