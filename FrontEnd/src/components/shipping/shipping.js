import React, { useEffect, useState } from "react";
import './shipping.css';  // Import the CSS file
import axios from "axios";


function Shipping() {
  const [orders, setOrders] = useState([
    { id: 1, orderCode: "ORD123", customerName: "John Doe",phoneNumber: "0348216719", address: "123 Main St", status: "Pending" },
    { id: 2, orderCode: "ORD124", customerName: "Jane Smith", phoneNumber: "0348216719",address: "456 Elm St", status: "Shipped" },
    // Add more orders as needed
  ]);

//   useEffect(() => {
//     axios
//       .get("")
//       .then((response) => {
//         setArticles(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the shipping order!", error);
//       });
//   }, []);

  const handleSave = (order) => {
    // Implement save functionality
    alert(`Save clicked for order ${order.orderCode}`);
  };

  return (
    <div className="shipping-content">
     
      <table className="shipping-table">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Tên khách hàng</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Trạng thái đơn hàng</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderCode}</td>
              <td>{order.customerName}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.address}</td>
              <td>{order.status}</td>
              <td>
                <button className="shipping-button save" onClick={() => handleSave(order)}>Save</button>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Shipping;
