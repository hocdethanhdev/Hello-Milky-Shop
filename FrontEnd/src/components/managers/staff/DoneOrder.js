import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import ThrowPage from "../../users/product/ui-list-product-mom/ThrowPage";

function DoneOrder() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const ordersPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/order/getOrdersByStatusOrderID/4"
        );
        const data = await response.json();
        setOrders(data.address);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
      return data;
    } catch (error) {
      console.error("Error fetching shipping address:", error);
      return null;
    }
  };

  const viewOrderDetails = async (order) => {
    const orderDetails = await fetchOrderDetails(order.OrderID);
    const shippingAddress = await fetchShippingAddress(order.OrderID);

    setSelectedOrder({
      ...order,
      details: orderDetails,
      shippingAddress: shippingAddress,
    });
    setIsDetailModalVisible(true);
  };

  const handleModalClose = () => {
    setIsDetailModalVisible(false);
    setSelectedOrder(null);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    setSortConfig((prevSortConfig) => {
      if (prevSortConfig.key === key && prevSortConfig.direction === "ascending") {
        direction = "descending";
      }

      // Customize sorting logic for numeric values (OrderID) and date (OrderDate)
      const sortedOrders = [...orders].sort((a, b) => {
        if (key === "OrderID" || key === "TotalAmount") {
          return direction === "ascending" ? a[key] - b[key] : b[key] - a[key];
        } else if (key === "OrderDate") {
          return direction === "ascending" ? new Date(a[key]) - new Date(b[key]) : new Date(b[key]) - new Date(a[key]);
        } else {
          // Default string sorting logic
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

  const sortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? (
        <FontAwesomeIcon icon={faSortUp} />
      ) : (
        <FontAwesomeIcon icon={faSortDown} />
      );
    }
    return <FontAwesomeIcon icon={faSort} />;
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const formatPrice = (price) => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  return (
    <div className="confirm-container">
      <table>
        <thead>
          <tr className="row">
            <th className="col-md-2">
              Mã đơn hàng
              <button className="sort-icon-order" onClick={() => handleSort("OrderID")}>
                {sortIcon("OrderID")}
              </button>
            </th>
            <th className="col-md-2">
              Ngày đặt hàng
              <button className="sort-icon-order" onClick={() => handleSort("OrderDate")}>
                {sortIcon("OrderDate")}
              </button>
            </th>
            <th className="col-md-2">
              Tổng
              <button className="sort-icon-order" onClick={() => handleSort("TotalAmount")}>
                {sortIcon("TotalAmount")}
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
              <td className="col-md-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => viewOrderDetails(order)}>
                  Thông tin
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
      {selectedOrder && (
        <Modal
          visible={isDetailModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Đóng
            </Button>,
          ]}>
          <div className="modal-content-scrollable-thinhh">
            <div className="ttdh-thinh">
              <h2>Thông tin đơn hàng</h2>
              <table className="table-info-order">
                <tbody>
                  <tr>
                    <td className="mdh">
                      <strong>Mã đơn hàng:</strong>
                    </td>
                    <td>{selectedOrder.OrderID}</td>
                  </tr>
                  <tr>
                    <td className="mdh">
                      <strong>Ngày đặt hàng:</strong>
                    </td>
                    <td>
                      {new Date(selectedOrder.OrderDate).toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="mdh">
                      <strong>Tổng:</strong>
                    </td>
                    <td>{formatPrice(selectedOrder.TotalAmount)}</td>
                  </tr>
                  {selectedOrder.shippingAddress && (
                    <>
                      <tr>
                        <td className="mdh">
                          <strong>Người nhận:</strong>
                        </td>
                        <td>{selectedOrder.shippingAddress[0].Receiver}</td>
                      </tr>
                      <tr>
                        <td className="mdh">
                          <strong>Số điện thoại:</strong>
                        </td>
                        <td>{selectedOrder.shippingAddress[0].PhoneNumber}</td>
                      </tr>
                      <tr>
                        <td className="mdh">
                          <strong>Địa chỉ:</strong>
                        </td>
                        <td>{selectedOrder.shippingAddress[0].Address}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
              <table className="table-products-order">
                <thead>
                  <tr>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Hình ảnh</th>
                    <th>Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.details.map((detail) => (
                    <tr key={detail.ProductID}>
                      <td>{detail.ProductID}</td>
                      <td>{detail.ProductName}</td>
                      <td>
                        <img
                          src={detail.Image}
                          alt={detail.ProductName}
                          width="50"
                        />
                      </td>
                      <td>{detail.Quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default DoneOrder;
