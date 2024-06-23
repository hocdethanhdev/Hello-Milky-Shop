import React, { useEffect, useState } from 'react';
import { Modal, Button, message } from 'antd';
import './Confirm.css';
import ThrowPage from '../../users/ui-list-product-mom/ThrowPage';

function Confirm() {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const ordersPerPage = 10;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/order/getOrdersByStatusOrderID/1');
                const data = await response.json();
                setOrders(data.address);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const editOrder = (orderID) => {
        Modal.confirm({
            title: 'Xác nhận thay đổi trạng thái đơn hàng',
            content: 'Bạn có chắc muốn thay đổi trạng thái đơn hàng này không?',
            onOk: () => {
                fetch(`http://localhost:5000/api/v1/order/updateStatusOrderID/${orderID}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ statusOrderID: 2 })
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        setOrders(prevOrders =>
                            prevOrders.map(order =>
                                order.OrderID === orderID ? { ...order, StatusOrderID: [2, 2], StatusOrderName: 'Đã xác nhận' } : order
                            )
                        );


                        message.success('Trạng thái đơn hàng đã được cập nhật.');
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);

                    })
                    .catch(error => {
                        message.error(`Có lỗi xảy ra khi cập nhật trạng thái đơn hàng: ${error.message}`);
                    });
            },
            onCancel() {
                console.log('Hủy thay đổi');
            },
        });
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

    return (
        <div className="confirm-container">
            <div className="orders-header">
                <h2></h2>
                <div className="search-orders">
                    <input type="text" placeholder="Tìm kiếm..." />
                    <button type="button">
                        <img src="/ImageMilkShop/searchicon.png" alt="Search" style={{ width: '20px' }} />
                    </button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>OrderID</th>
                        <th>OrderDate</th>
                        <th>StatusOrderID</th>
                        <th>TotalAmount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map(order => (
                        <tr key={order.OrderID}>
                            <td>{order.OrderID}</td>
                            <td>{new Date(order.OrderDate).toLocaleDateString()}</td>
                            <td>{order.StatusOrderName}</td>
                            <td>{order.TotalAmount}</td>
                            <td>
                                <button type="button" className="btn btn-primary" onClick={() => editOrder(order.OrderID)}>Edit</button>
                                <button type="button" className="btn btn-primary" onClick={() => viewOrderDetails(order)}>Detail</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination-container">
                <ThrowPage
                    current={currentPage}
                    onChange={handlePageChange}
                    total={orders.length}
                    productsPerPage={ordersPerPage}
                />
            </div>
            {selectedOrder && (
                <Modal
                    title="Order Details"
                    visible={isDetailModalVisible}
                    onCancel={handleModalClose}
                    footer={[
                        <Button key="close" onClick={handleModalClose}>
                            Close
                        </Button>,
                    ]}
                >
                    <p><strong>OrderID:</strong> {selectedOrder.OrderID}</p>
                    <p><strong>OrderDate:</strong> {new Date(selectedOrder.OrderDate).toLocaleString()}</p>
                    <p><strong>TotalAmount:</strong> {selectedOrder.TotalAmount}</p>
                    <p><strong>Status:</strong> {selectedOrder.Status ? 'True' : 'False'}</p>
                    <p><strong>ShippingAddressID:</strong> {selectedOrder.ShippingAddressID}</p>
                    <p><strong>UserID:</strong> {selectedOrder.UserID}</p>
                    <p><strong>StatusOrderName:</strong> {selectedOrder.StatusOrderName}</p>
                </Modal>
            )}
        </div>
    );
}

export default Confirm;
