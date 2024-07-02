import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "antd";
import 'antd/dist/reset.css';
import Loading from "../layout/Loading";

import "./shipping.css";

function Shipping() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmingOrderId, setConfirmingOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/order/getInfoToShip",
        {
          StatusOrderID: 2,
        }
      );

      if (response.data.err === 0) {
        setOrders(response.data.data);
      } else {
        console.error("Unexpected response data:", response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const handleConfirm = (orderId) => {
    setConfirmingOrderId(orderId);
    setModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/order/updateStatusOrderID/${confirmingOrderId}`,
        {
          statusOrderID: 4,
        }
      );
      setOrders(orders.filter((order) => order.OrderID !== confirmingOrderId));
      setModalVisible(false);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  if (loading) {
    return <Loading/>;
  }

  return (
    <div className="table-container shipping-table">
      <table>
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Tên người đặt</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.OrderID}>
              <td>{order.OrderID}</td>
              <td>{order.UserName}</td>
              <td>{order.PhoneNumber}</td>
              <td>{order.Address}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => handleConfirm(order.OrderID)}
                >
                  Xác nhận
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        title="Xác nhận"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>Bạn chắc chắn muốn xác nhận đơn hàng này?</p>
      </Modal>
    </div>
  );
}

export default Shipping;