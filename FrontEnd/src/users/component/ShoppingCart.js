import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { getUserIdFromToken } from "../store/actions/authAction";
import "./ShoppingCart.css";
import { useLocation } from "react-router-dom";
import VoucherPopup from "./VoucherPopup";
import AddressPopup from "./AddressPopup";
const ShoppingCart = () => {
  const { token } = useSelector((state) => state.auth);
  const [orderDetails, setOrderDetails] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCityID, setSelectedCityID] = useState(null);
  const [selectedDistrictID, setSelectedDistrictID] = useState(null);
  const [receiver, setReceiver] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [orderID, setOrderID] = useState(null);
  const [userId, setUserId] = useState(null);
  const [productQuantities, setProductQuantities] = useState({});
  const [selectedProducts, setSelectedProducts] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [productToRemove, setProductToRemove] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [showVoucherPopup, setShowVoucherPopup] = useState(false);
  const [points, setPoints] = useState(0);
  const [usePoints, setUsePoints] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [selectedShippingAddressID, setSelectedShippingAddressID] =
    useState(null);
  const [usingSavedAddress, setUsingSavedAddress] = useState(false);
  let totalAmount = 0;
  const params = new URLSearchParams(location.search);
  let status = params.get("status");
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/voucher/getVouchersByUserID/${userId}`
        );
        setVouchers(response.data);
      } catch (err) {
        console.error("Error fetching vouchers:", err);
        setError(err.response ? err.response.data.message : err.message);
      }
    };

    if (userId) {
      fetchVouchers();
    }
  }, [userId]);

  const handleVoucherSelect = (voucher) => {
    const subtotal = calculateTotal();
    if (voucher.MinDiscount !== undefined && subtotal >= voucher.MinDiscount) {
      setSelectedVoucher(voucher);
      setShowVoucherPopup(false);
    } else {
      alert(
        `This voucher requires a minimum purchase of ${
          voucher.MinDiscount ? voucher.MinDiscount.toLocaleString() : 0
        } đ.`
      );
    }
  };  

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const userId = getUserIdFromToken(token);

        if (!userId) throw new Error("Failed to fetch user ID");

        const ordersResponse = await axios.get(
          `http://localhost:5000/api/v1/order/getOpenOrderForUser/${userId}`
        );
        const orders = ordersResponse.data;

        if (orders.length === 0) throw new Error("No orders found for user");

        const orderID = orders.OrderID;
        setOrderID(orderID);

        const orderDetailsResponse = await axios.get(
          `http://localhost:5000/api/v1/order/getOrder/${orderID}`
        );
        const orderDetails = orderDetailsResponse.data;

        const productDetailsPromises = orderDetails.map(async (orderItem) => {
          const productResponse = await axios.get(
            `http://localhost:5000/api/v1/product/getProductInforID/${orderItem.ProductID}`
          );
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
        console.error("Error fetching order details:", err);
        setError(err.response ? err.response.data.message : err.message);
        setLoading(false);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/city/getAllCities/"
        );
        setCities(response.data);
      } catch (err) {
        console.error("Error fetching cities:", err);
        setError(err.response ? err.response.data.message : err.message);
      }
    };
    const fetchUserDetails = async () => {
      try {
        const userId = getUserIdFromToken(token);
        const userDetailsResponse = await axios.get(
          `http://localhost:5000/api/v1/user/getUserByID?UserID=${userId}`
        );
        const userPoints = userDetailsResponse.data.data.Point;
        setPoints(userPoints);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      }
    };

    if (token) {
      fetchUserOrders();
      fetchCities();
      fetchUserDetails();
    }
  }, [token]);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedCityID) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/v1/district/getDistrictByID/${selectedCityID}`
          );
          setDistricts(response.data);
        } catch (err) {
          console.error("Error fetching districts:", err);
          setError(err.response ? err.response.data.message : err.message);
        }
      }
    };

    fetchDistricts();
  }, [selectedCityID]);

  if (loading)
    return (
      <div>
        <h1>Đang tải...</h1>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  const calculateSubtotal = () => {
    return orderDetails.reduce((acc, item) => {
      const productId = item.ProductID;
      if (selectedProducts[productId]) {
        return (
          acc + (productQuantities[productId] || item.Quantity) * item.Price
        );
      }
      return acc;
    }, 0);
  };

  const calculateDiscount = () => {
    if (selectedVoucher) {
      const subtotal = calculateSubtotal();

      if (subtotal >= selectedVoucher.MinDiscount) {
        const discountPercentage = Number(selectedVoucher.DiscountPercentage);
        const maxDiscountAmount = Number(selectedVoucher.MaxDiscount);

        if (isNaN(discountPercentage) || isNaN(maxDiscountAmount)) {
          console.error("Invalid voucher data:", selectedVoucher);
          return 0;
        }

        const discount = (subtotal * discountPercentage) / 100;
        const validDiscount = Math.min(discount, maxDiscountAmount);

        return isNaN(validDiscount) ? 0 : validDiscount;
      } else {
        console.warn("Subtotal is less than MinDiscount.");
      }
    }

    return 0;
  };

  const calculateTotal = () => {
    let total = calculateSubtotal() - calculateDiscount();

    if (usePoints && points) {
      total -= points * 10; // Assuming 1 point = 10₫ discount
    }

    // Đảm bảo rằng 'total' không phải là NaN
    if (isNaN(total) || total < 0) {
      total = 0;
    }

    return total;
  };

  const subtotal = calculateSubtotal();
  const discount = 0;
  // const total = subtotal + discount;

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) {
      setProductToRemove(productId);
      return;
    }
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleProductSelect = (productId, isSelected) => {
    setSelectedProducts((prevSelected) => ({
      ...prevSelected,
      [productId]: isSelected,
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleAddressSelect = (address) => {
    setReceiver(address.Receiver);
    setPhoneNumber(address.PhoneNumber);
    setAddress(address.Address);
    setSelectedShippingAddressID(address.ShippingAddressID);
    setUsingSavedAddress(true);
    setShowAddressPopup(false);
  };

  const handleOrder = async () => {
    try {
      const selectedProductIds = Object.keys(selectedProducts).filter(
        (productId) => selectedProducts[productId]
      );

      if (selectedProductIds.length === 0) {
        alert("Vui lòng chọn ít nhất một sản phẩm.");
        return;
      }

      if (!paymentMethod) {
        alert("Vui lòng chọn hình thức thanh toán.");
        return;
      }

      if (!receiver || !phoneNumber || !address) {
        alert("Vui lòng nhập hoặc chọn địa chỉ giao hàng.");
        return;
      }

      if (orderID) {
        if (usingSavedAddress && selectedShippingAddressID) {
          await axios.post(
            "http://localhost:5000/api/v1/order/updateShippingAddressID",
            {
              orderID,
              shippingAddressID: selectedShippingAddressID,
            }
          );
        } else {
          const selectedCity = cities.find(
            (city) => city.ID === parseInt(selectedCityID)
          )?.CityName;
          const selectedDistrict = districts.find(
            (district) => district.DistrictID === parseInt(selectedDistrictID)
          )?.DistrictName;

          await axios.post(
            "http://localhost:5000/api/v1/order/addInfoCusToOrder",
            {
              receiver: receiver,
              phoneNumber: phoneNumber,
              address: `${address}, ${selectedDistrict}, ${selectedCity}`,
              userID: userId,
            }
          );
        }
        const productQuantitiesToUpdate = selectedProductIds.map(
          (productId) => ({
            productID: productId,
            quantity:
              productQuantities[productId] ||
              orderDetails.find((item) => item.ProductID === productId)
                .Quantity,
          })
        );
        if (productQuantitiesToUpdate.length > 0) {
          localStorage.setItem(
            "productQuantitiesToUpdate",
            JSON.stringify(productQuantitiesToUpdate)
          );
        }

        totalAmount = calculateTotal();
        localStorage.setItem("totalAmount", totalAmount);
        localStorage.setItem("orderID", orderID);

        const response = await axios.post(
          "http://localhost:5000/api/v1/payment/create_payment_url",
          {
            orderID,
            amount: parseInt(totalAmount),
            language: "vn",
          }
        );
        if (response) {
          window.open(response.data.url);
          if (status === "1") {
            if (selectedVoucher) {
              await axios.post(
                "http://localhost:5000/api/v1/voucher/removeVoucherFromUser",
                {
                  userID: userId,
                  voucherID: selectedVoucher.VoucherID,
                }
              );
            }
          }
        }
      } else {
        console.error("orderID is not set");
      }
    } catch (error) {
      console.error("Error processing order:", error);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const confirmRemoveProduct = async () => {
    try {
      if (orderID && productToRemove) {
        await axios.post(
          "http://localhost:5000/api/v1/order/removeProductFromOrder",
          {
            OrderID: orderID,
            ProductID: productToRemove,
          }
        );

        setOrderDetails((prevDetails) =>
          prevDetails.filter((item) => item.ProductID !== productToRemove)
        );
        setProductQuantities((prevQuantities) => {
          const newQuantities = { ...prevQuantities };
          delete newQuantities[productToRemove];
          return newQuantities;
        });
        setSelectedProducts((prevSelected) => {
          const newSelected = { ...prevSelected };
          delete newSelected[productToRemove];
          return newSelected;
        });
        setProductToRemove(null);
      }
    } catch (error) {
      console.error("Error removing product from order:", error);
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
          <div className="address-section">
            <button onClick={() => setShowAddressPopup(true)}>
              Dùng địa chỉ cũ
            </button>
            <input
              type="text"
              placeholder="Người nhận"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              disabled={usingSavedAddress}
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={usingSavedAddress}
            />
            <input
              type="text"
              placeholder="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={usingSavedAddress}
            />
            <select
              value={selectedCityID}
              onChange={(e) => setSelectedCityID(e.target.value)}
              disabled={usingSavedAddress}
            >
              <option value="">Chọn thành phố</option>
              {cities.map((city) => (
                <option key={city.ID} value={city.ID}>
                  {city.CityName}
                </option>
              ))}
            </select>
            <select
              value={selectedDistrictID}
              onChange={(e) => setSelectedDistrictID(e.target.value)}
              disabled={usingSavedAddress}
            >
              <option value="">Chọn quận huyện</option>
              {districts.map((district) => (
                <option key={district.DistrictID} value={district.DistrictID}>
                  {district.DistrictName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="product-info">
          <h3>SẢN PHẨM ({orderDetails.length} sản phẩm)</h3>
          {orderDetails.map((item) => {
            const productInfo = item.productInfo[0];
            const productId = item.ProductID;
            const quantity = productQuantities[productId] || item.Quantity;
            const isSelected = selectedProducts[productId] || false;
            return (
              <div className="product-item" key={productId}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) =>
                    handleProductSelect(productId, e.target.checked)
                  }
                />
                <img src={productInfo?.Image} alt={productInfo?.ProductName} />
                <div>
                  <p className="ten-sp-cartth">{productInfo?.ProductName}</p>
                  <p className="gia-sp-cartth">
                    {item.Price.toLocaleString()} đ
                  </p>
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        handleQuantityChange(productId, quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>Số lượng: {quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(productId, quantity + 1)
                      }
                    >
                      +
                    </button>
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
            <div className="voucher-selection">
              <button onClick={() => setShowVoucherPopup(true)}>
                Chọn Voucher
              </button>
              {selectedVoucher && (
                <p>
                  Voucher đã chọn: - {selectedVoucher.DiscountPercentage || 0}%
                </p>
              )}
            </div>

            <div className="points-usage">
              <input
                type="checkbox"
                id="usePoints"
                checked={usePoints}
                onChange={(e) => setUsePoints(e.target.checked)}
              />
              <label htmlFor="usePoints">
                Dùng {points} xu - {points * 10}₫
              </label>
            </div>
            <div className="total-row">
              <span>Khuyến mãi</span>
              <span>{discount.toLocaleString()} đ</span>
            </div>
            <div className="total-row total">
              <span>Thành tiền</span>
              <span>{calculateTotal().toLocaleString()} đ</span>
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
                checked={paymentMethod === "online"}
                onChange={() => handlePaymentMethodChange("online")}
              />
              <label htmlFor="online">
                <i className="fa fa-credit-card"></i>
                Thanh toán Online
              </label>
            </div>
          </div>
          <textarea placeholder="Viết ghi chú, yêu cầu hóa đơn GTGT..."></textarea>
          <button className="order-btn" onClick={handleOrder}>
            ĐẶT HÀNG
          </button>
        </div>
      </div>

      {productToRemove && (
        <div className="popup-cart-thinh">
          <div className="popup-inner-cart-thinh">
            <h2>Xóa sản phẩm</h2>
            <p>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?</p>
            <button
              className="popup-btn-cart-thinh"
              onClick={confirmRemoveProduct}
            >
              Có
            </button>
            <button
              className="popup-btn-cart-thinh"
              onClick={() => setProductToRemove(null)}
            >
              Không
            </button>
          </div>
        </div>
      )}
      {showVoucherPopup && (
        <VoucherPopup
          vouchers={vouchers}
          handleVoucherSelect={handleVoucherSelect}
          closePopup={() => setShowVoucherPopup(false)}
        />
      )}

      {showAddressPopup && (
        <AddressPopup
          userID={userId}
          onSelect={handleAddressSelect}
          onClose={() => setShowAddressPopup(false)}
        />
      )}
    </div>
  );
};

export default ShoppingCart;
