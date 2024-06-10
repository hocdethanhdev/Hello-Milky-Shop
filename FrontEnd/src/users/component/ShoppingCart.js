import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getUserIdFromToken } from "../store/actions/authAction";
import './ShoppingCart.css';
import { Link, useLocation } from 'react-router-dom';

const ShoppingCart = () => {
  const { isLoggedIn ,token } = useSelector((state) => state.auth);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [orderID, setOrderID] = useState(null); // Khai báo biến orderID

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    const code = params.get('code');
    const userIdd = getUserIdFromToken(token);
    if (status && code) {
      console.log(`Payment status: ${status}, code: ${code}`);
      // Xử lý trạng thái thanh toán nếu cần thiết
      if (status === '1') {
        // alert('Payment successful!');
        if (orderID) { // Kiểm tra orderID trước khi gọi API
          axios.post(`http://localhost:5000/api/v1/order/checkoutOrder`, {
            userID: userIdd
          })
            .then(response => {
              alert('Payment successful !!!!');
              // Thực hiện các hành động khác nếu cần thiết
            })
            .catch(error => {
              console.error('Error updating order status:', error);
              alert('Payment successful, but failed to update order status.');
            });
          window.open("http://localhost:3000/", "_self");
        } else {
          console.error('orderID is not set');
        }
      } else {
        alert('Payment failed. Please try again.');
      }
    }
  }, [location.search, orderID]); // Thêm orderID vào dependency array

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const userId = getUserIdFromToken(token);

        if (!userId) throw new Error('Failed to fetch user ID');

        console.log(`Fetching orders for user ID: ${userId}`);
        const ordersResponse = await axios.get(`http://localhost:5000/api/v1/order/getOpenOrderForUser/${userId}`);
        const orders = ordersResponse.data;

        if (orders.length === 0) throw new Error('No orders found for user');

        const orderID = orders.OrderID; // Lấy orderID từ đơn hàng đầu tiên
        setOrderID(orderID); // Đặt giá trị cho biến orderID


        console.log(`Fetching details for order ID: ${orderID}`);
        const orderDetailsResponse = await axios.get(`http://localhost:5000/api/v1/order/getOrder/${orderID}`);
        const orderDetails = orderDetailsResponse.data;

        const productDetailsPromises = orderDetails.map(async orderItem => {

          const productResponse = await axios.get(`http://localhost:5000/api/v1/product/getProductInforID/${orderItem.ProductID}`);

          return {
            ...orderItem,
            productInfo: productResponse.data,
          };
        });

        const fullOrderDetails = await Promise.all(productDetailsPromises);
        setOrderDetails(fullOrderDetails);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError(err.response ? err.response.data.message : err.message);
        setLoading(false);
      }
    };
    console.log(token);
    if (token) {
      fetchUserOrders();
    }
  }, [token]);

  if (loading) return <div><h1>Đang tải...</h1></div>;
  if (error) return <div>Error: {error}</div>;

  const calculateSubtotal = () => {
    return orderDetails.reduce((acc, item) => acc + (item.Quantity * item.Price), 0);
  };

  const subtotal = calculateSubtotal();
  const discount = 0;
  const total = subtotal + discount;

  const handleOrder = async () => {
    try {
      if (orderID) { // Kiểm tra orderID trước khi gọi API
        const response = await axios.post('http://localhost:5000/api/v1/payment/create_payment_url', {
          orderID: orderID,
          amount: total,
          language: "vn"
        });
        console.log(response);
        if (response) {
          window.open(response.data.url, "_self");
        }
      } else {
        console.error('orderID is not set');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="checkout-container">
      {!isLoggedIn &&
        <div className="quick-login">
        <p>
          Hãy <Link to="/login">Đăng nhập</Link> để mua hàng nhanh hơn!
        </p>
      </div>
      }
      
      <div className="checkout">
        <div className="customer-info">
          <h3>THÔNG TIN MUA HÀNG</h3>
          <input type="text" placeholder="Họ và tên" />
          <input type="text" placeholder="Số điện thoại" />
          <select>
            {/* Add your city options here */}
          </select>
          <select>
            {/* Add your district options here */}
          </select>
          <input type="text" placeholder="Số nhà, tòa nhà, đường, xã phường" />
        </div>

        <div className="product-info">
          <h3>SẢN PHẨM ({orderDetails.length} sản phẩm)</h3>
          {orderDetails.map(item => (
            <div className="product-item" key={item.ProductID}>
              <img src={item.productInfo.Image} alt={item.productInfo.ProductName} />
              <div>
                <p>{item.productInfo.ProductName}</p>
                <p>{item.Price.toLocaleString()} đ</p>
                <div className="quantity-control">
                  <span>Số lượng: {item.Quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="payment-info">
          <h3>THANH TOÁN</h3>
          <div className="totals">
            <div className="total-row">
              <span>Tạm tính</span>
              <span>{subtotal.toLocaleString()} đ</span>
            </div>
            <div className="total-row">
              <span>Khuyến mãi</span>
              <span>{discount.toLocaleString()} đ</span>
            </div>
            <div className="total-row total">
              <span>Thanh tiền</span>
              <span>{total.toLocaleString()} đ</span>
            </div>
          </div>

          <h4>HÌNH THỨC THANH TOÁN</h4>
          <div className="payment-methods">
            <div className="method">
              <input type="radio" id="cod" name="payment" defaultChecked />
              <label htmlFor="cod">
                <i className="fa fa-money"></i>
                Thanh toán khi nhận hàng (COD)
              </label>
            </div>
            <div className="method">
              <input type="radio" id="online" name="payment" />
              <label htmlFor="online">
                <i className="fa fa-credit-card"></i>
                Thanh toán Online
              </label>
            </div>
          </div>
          <textarea placeholder="Viết ghi chú, yêu cầu hóa đơn GTGT..."></textarea>
          <button className="order-btn" onClick={handleOrder}>ĐẶT HÀNG</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
