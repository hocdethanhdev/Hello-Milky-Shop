import React, { useEffect, useState } from "react";
import { Modal, Button, message, Input } from "antd";
import "./Confirm.css";
import ThrowPage from "../../users/product/ui-list-product-mom/ThrowPage";
import { useSelector } from 'react-redux';
import { getUserIdFromToken } from "../../store/actions/authAction";

function Confirm() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const ordersPerPage = 10;
  const { token } = useSelector((state) => state.auth);
  const userIdd = getUserIdFromToken(token);

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
      onCancel() {
        console.log("Hủy thay đổi");
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

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailModalVisible(true);
  };

  const handleModalClose = () => {
    setIsDetailModalVisible(false);
    setSelectedOrder(null);
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
            <th className="col-md-2">Mã đơn hàng</th>
            <th className="col-md-2">Ngày đặt hàng</th>
            <th className="col-md-2">Tổng</th>
            <th className="col-md-3">Địa chỉ</th>
            <th className="col-md-3">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr className="row" key={order.OrderID}>
              <td className="col-md-2">{order.OrderID}</td>
              <td className="col-md-2">
                {new Date(order.OrderDate).toLocaleDateString()}
              </td>
              <td className="col-md-2">
                {formatPrice(parseInt(order.TotalAmount))}
              </td>
              <td className="col-md-3">{order.address}</td>
              <td className="col-md-3 nut-xndh">
                <button
                  type="button"
                  className="btn btn-warning xndh"
                  onClick={() => editOrder(order.OrderID)}
                >
                  Xác Nhận
                </button>
                <button
                  type="button"
                  className="btn btn-primary xndh"
                  onClick={() => viewOrderDetails(order)}
                >
                  Thông tin
                </button>
                <button
                  type="button"
                  className="btn btn-danger xndh"
                  onClick={() => cancelOrder(order.OrderID)}
                >
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
          title="Thông tin đơn hàng"
          visible={isDetailModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Đóng
            </Button>,
          ]}
        >
          <p>
            <strong>Mã đơn hàng:</strong> {selectedOrder.OrderID}
          </p>
          <p>
            <strong>Ngày đặt hàng:</strong>{" "}
            {new Date(selectedOrder.OrderDate).toLocaleString()}
          </p>
          <p>
            <strong>Tổng:</strong> {formatPrice(selectedOrder.TotalAmount)}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {selectedOrder.ShippingAddressID}
          </p>
          <p>
            <strong>Mã người dùng:</strong> {selectedOrder.UserID}
          </p>
          <p>
            <strong>Trạng thái của đơn hàng:</strong>{" "}
            {selectedOrder.StatusOrderName}
          </p>
        </Modal>
      )}
      <Modal
        title="Lý do hủy đơn hàng"
        visible={isCancelModalVisible}
        onOk={handleCancelModalOk}
        onCancel={handleCancelModalCancel}
      >
        <Input.TextArea
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          placeholder="Nhập lý do hủy đơn hàng"
          rows={4}
        />
      </Modal>
    </div>
  );
}

export default Confirm;
