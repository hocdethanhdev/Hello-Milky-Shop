import React, { useEffect, useState } from "react";
import axios from "axios";
import "./shipping.css";

function Shipping() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleConfirm = async (orderId) => {
    try {
     const response= await axios.post(
      `http://localhost:5000/api/v1/order/updateStatusOrderID/${orderId}`,
      {
        statusOrderID: 5,
      }
    
    );
    console.log(response);
     
     
      

      // Update the local state to reflect the changes
      setOrders(orders.filter((order) => order.OrderID !== orderId));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-container">
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
                  onClick={() => handleConfirm(order.OrderID)}>
                  Xác nhận
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Shipping;
