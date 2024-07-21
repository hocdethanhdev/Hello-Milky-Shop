import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, message, Input } from "antd";
import 'antd/dist/reset.css';
import Loading from "../layout/Loading";
import config from "../../components/config/config";
import "./shipping.css";

function Shipping() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmingOrderId, setConfirmingOrderId] = useState(null);
  const [cancelingOrderId, setCancelingOrderId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${config.API_ROOT}/api/v1/order/getInfoToShip`,
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
      await axios.post(
        `${config.API_ROOT}/api/v1/order/updateStatusOrderID/${confirmingOrderId}`,
        {
          statusOrderID: 4,
        }
      );
      setOrders(orders.filter((order) => order.OrderID !== confirmingOrderId));
      setModalVisible(false);
      message.success('Xác nhận đơn hàng thành công!');
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleCancelOrder = (orderId) => {
    setCancelingOrderId(orderId);
    setCancelModalVisible(true);
  };

  const handleCancelModalOk = async () => {
    if (!cancelReason.trim()) {
      message.warning("Vui lòng nhập lí do.");
      return;
    }

    try {
      await axios.post(`${config.API_ROOT}/api/v1/order/cancelOrder`, {
        orderID: cancelingOrderId,
        reasonCancelContent: cancelReason,
      });
      setOrders(orders.filter((order) => order.OrderID !== cancelingOrderId));
      setCancelModalVisible(false);
      setCancelReason("");
      message.success("Đơn hàng đã được hủy.");
    } catch (error) {
      message.error(`Có lỗi xảy ra khi hủy đơn hàng: ${error.message}`);
    }
  };

  const handleCancelModalCancel = () => {
    setCancelModalVisible(false);
    setCancelReason("");
  };

  if (loading) {
    return <Loading />;
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
                <button
                  className="btn btn-danger"
                  onClick={() => handleCancelOrder(order.OrderID)}
                >
                  Hủy đơn
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

      <Modal
        title="Lý do hủy đơn hàng"
        visible={cancelModalVisible}
        onOk={handleCancelModalOk}
        onCancel={handleCancelModalCancel}
      >
        <Input.TextArea
          placeholder="Nhập lý do hủy đơn hàng"
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default Shipping;
