import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getUserIdFromToken } from "../store/actions/authAction";
import './ShoppingCart.css';
import { Link, useLocation } from 'react-router-dom';

const ShoppingCart = () => {
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const [orderDetails, setOrderDetails] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCityID, setSelectedCityID] = useState(null);
  const [selectedDistrictID, setSelectedDistrictID] = useState(null);
  const [receiver, setReceiver] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [orderID, setOrderID] = useState(null);
  const [userId, setUserId] = useState(null);
  const [productQuantities, setProductQuantities] = useState({});
  const [selectedProducts, setSelectedProducts] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [productToRemove, setProductToRemove] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    const code = params.get('code');
    const userIdd = getUserIdFromToken(token);
    setUserId(userIdd);
    if (status && code) {
      console.log(`Payment status: ${status}, code: ${code}`);
      if (status === '1') {
        if (orderID) {
          axios.post(`http://localhost:5000/api/v1/order/updateStatusOrderID/${orderID}`, {
            statusOrderID: 1
          })
          axios.post(`http://localhost:5000/api/v1/order/checkoutOrder`, {
            userID: userIdd
          })
            .then(response => {
              alert('Payment successful !!!!');
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
  }, [location.search, orderID]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const userId = getUserIdFromToken(token);

        if (!userId) throw new Error('Failed to fetch user ID');

        console.log(`Fetching orders for user ID: ${userId}`);
        const ordersResponse = await axios.get(`http://localhost:5000/api/v1/order/getOpenOrderForUser/${userId}`);
        const orders = ordersResponse.data;

        if (orders.length === 0) throw new Error('No orders found for user');

        const orderID = orders.OrderID;
        setOrderID(orderID);

        console.log(`Fetching details for order ID: ${orderID}`);
        const orderDetailsResponse = await axios.get(`http://localhost:5000/api/v1/order/getOrder/${orderID}`);
        const orderDetails = orderDetailsResponse.data;

        const productDetailsPromises = orderDetails.map(async orderItem => {
          const productResponse = await axios.get(`http://localhost:5000/api/v1/product/getProductInforID/${orderItem.ProductID}`);
          console.log('Product response:', productResponse.data);
          return {
            ...orderItem,
            productInfo: productResponse.data,
          };
        });

        const fullOrderDetails = await Promise.all(productDetailsPromises);

        // Initialize product quantities
        const initialQuantities = fullOrderDetails.reduce((acc, item) => {
          acc[item.ProductID] = item.Quantity;
          return acc;
        }, {});

        setOrderDetails(fullOrderDetails);
        setProductQuantities(initialQuantities);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError(err.response ? err.response.data.message : err.message);
        setLoading(false);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/city/getAllCities/');
        setCities(response.data);
      } catch (err) {
        console.error('Error fetching cities:', err);
        setError(err.response ? err.response.data.message : err.message);
      }
    };

    console.log('Token:', token);
    if (token) {
      fetchUserOrders();
      fetchCities();
    }
  }, [token]);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedCityID) {
        try {
          const response = await axios.get(`http://localhost:5000/api/v1/district/getDistrictByID/${selectedCityID}`);
          setDistricts(response.data);
        } catch (err) {
          console.error('Error fetching districts:', err);
          setError(err.response ? err.response.data.message : err.message);
        }
      }
    };

    fetchDistricts();
  }, [selectedCityID]);

  if (loading) return <div><h1>Đang tải...</h1></div>;
  if (error) return <div>Error: {error}</div>;

  const calculateSubtotal = () => {
    return orderDetails.reduce((acc, item) => {
      const productId = item.ProductID;
      if (selectedProducts[productId]) {
        return acc + (productQuantities[productId] || item.Quantity) * item.Price;
      }
      return acc;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const discount = 0;
  const total = subtotal + discount;

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) {
      setProductToRemove(productId);
      return;
    }
    setProductQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleProductSelect = (productId, isSelected) => {
    setSelectedProducts(prevSelected => ({
      ...prevSelected,
      [productId]: isSelected,
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleOrder = async () => {
    try {
      const selectedProductIds = Object.keys(selectedProducts).filter(productId => selectedProducts[productId]);

      if (selectedProductIds.length === 0) {
        alert('Vui lòng chọn ít nhất một sản phẩm.');
        return;
      }

      if (!paymentMethod) {
        alert('Vui lòng chọn hình thức thanh toán.');
        return;
      }

      if (orderID) {
        const selectedCity = cities.find(city => city.ID === parseInt(selectedCityID))?.CityName;
        const selectedDistrict = districts.find(district => district.DistrictID === parseInt(selectedDistrictID))?.DistrictName;
        const fullAddress = `${address}, ${selectedDistrict}, ${selectedCity}`;

        console.log('Receiver:', receiver);
        console.log('Phone Number:', phoneNumber);
        console.log('Full Address:', fullAddress);
        console.log('User ID:', userId);

        await axios.post('http://localhost:5000/api/v1/order/addInfoCusToOrder', {
          receiver,
          phoneNumber,
          address: fullAddress,
          userID: userId
        });

        const productQuantitiesToUpdate = selectedProductIds.map(productId => ({
          productID: productId,
          quantity: productQuantities[productId] || orderDetails.find(item => item.ProductID === productId).Quantity
        }));

        console.log('Product Quantities to Update:', productQuantitiesToUpdate);

        await axios.post('http://localhost:5000/api/v1/order/changeQuantityOfProductInOrder', {
          orderID,
          productQuantities: productQuantitiesToUpdate
        });

        const response = await axios.post('http://localhost:5000/api/v1/payment/create_payment_url', {
          orderID,
          amount: total,
          language: "vn"
        });

        console.log('Payment URL Response:', response.data);

        if (response) {
          window.open(response.data.url, "_self");
        }
      } else {
        console.error('orderID is not set');
      }
    } catch (error) {
      console.error('Error processing order:', error);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const confirmRemoveProduct = async () => {
    try {
      if (orderID && productToRemove) {
        await axios.post('http://localhost:5000/api/v1/order/removeProductFromOrder', {
          OrderID: orderID,
          ProductID: productToRemove
        });

        setOrderDetails(prevDetails => prevDetails.filter(item => item.ProductID !== productToRemove));
        setProductQuantities(prevQuantities => {
          const newQuantities = { ...prevQuantities };
          delete newQuantities[productToRemove];
          return newQuantities;
        });
        setSelectedProducts(prevSelected => {
          const newSelected = { ...prevSelected };
          delete newSelected[productToRemove];
          return newSelected;
        });
        setProductToRemove(null);
      }
    } catch (error) {
      console.error('Error removing product from order:', error);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="checkout-container">
      <br />
      <br />
      <br />
      <div className="checkout">
        <div className="customer-info">
          <h3>THÔNG TIN MUA HÀNG</h3>
          <input type="text" placeholder="Họ và tên người nhận" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
          <input type="text" placeholder="Số điện thoại người nhận" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <select onChange={(e) => setSelectedCityID(e.target.value)}>
            <option value="">Chọn Thành phố</option>
            {cities.map(city => (
              <option key={city.ID} value={city.ID}>{city.CityName}</option>
            ))}
          </select>
          <select onChange={(e) => setSelectedDistrictID(e.target.value)}>
            <option value="">Chọn Quận/Huyện</option>
            {districts.map(district => (
              <option key={district.DistrictID} value={district.DistrictID}>{district.DistrictName}</option>
            ))}
          </select>
          <input type="text" placeholder="Số nhà, tòa nhà, đường, xã phường" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div className="product-info">
          <h3>SẢN PHẨM ({orderDetails.length} sản phẩm)</h3>
          {orderDetails.map(item => {
            const productInfo = item.productInfo[0];
            const productId = item.ProductID;
            const quantity = productQuantities[productId] || item.Quantity;
            const isSelected = selectedProducts[productId] || false;
            return (
              <div className="product-item" key={productId}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => handleProductSelect(productId, e.target.checked)}
                />
                <img src={productInfo?.Image} alt={productInfo?.ProductName} />
                <div>
                  <p className='ten-sp-cartth'>{productInfo?.ProductName}</p>
                  <p className='gia-sp-cartth'>{item.Price.toLocaleString()} đ</p>
                  <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(productId, quantity - 1)}>-</button>
                    <span>Số lượng: {quantity}</span>
                    <button onClick={() => handleQuantityChange(productId, quantity + 1)}>+</button>
                  </div>
                </div>
              </div>
            );
          })}
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
              <input
                type="radio"
                id="online"
                name="payment"
                value="online"
                checked={paymentMethod === 'online'}
                onChange={() => handlePaymentMethodChange('online')}
              />
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

      {productToRemove && (
        <div className="popup-cart-thinh">
          <div className="popup-inner-cart-thinh">
            <h2>Xóa sản phẩm</h2>
            <p>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?</p>
            <button className="popup-btn-cart-thinh" onClick={confirmRemoveProduct}>Có</button>
            <button className="popup-btn-cart-thinh" onClick={() => setProductToRemove(null)}>Không</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ShoppingCart;
