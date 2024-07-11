import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { getUserIdFromToken } from "../../store/actions/authAction";
import "./ShoppingCart.css";
import VoucherPopup from "./VoucherPopup";
import AddressPopup from "./AddressPopup";
import { getMaxQuantity } from "./productMax";
import { message } from "antd";
import config from "../../config/config";

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
  const [orderID, setOrderID] = useState(null);
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
  const [userID, setUserID] = useState("");
  let totalAmount = 0;
  const [incrementIntervalId, setIncrementIntervalId] = useState(null);
  const [decrementIntervalId, setDecrementIntervalId] = useState(null);

  const increaseOne = async (productId) => {
    // Fetch the maximum quantity for the product
    const maxQuantity = await getMaxQuantity(productId);

    setProductQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || 0;

      // Check if current quantity is already at max
      if (currentQuantity >= maxQuantity) {
        return prevQuantities; // Return unchanged quantities
      }

      // Increase quantity by 1
      const newQuantity = currentQuantity + 1;

      return {
        ...prevQuantities,
        [productId]: newQuantity,
      };
    });
  };

  const decreaseOne = (productId) => {
    setProductQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[productId] || 1) - 1;

      if (newQuantity < 1) {
        setProductToRemove(productId);
        return prevQuantities;
      }

      return {
        ...prevQuantities,
        [productId]: newQuantity,
      };
    });
  };

  const stopIncrement = () => {
    clearInterval(incrementIntervalId);
    setIncrementIntervalId(null);
  };

  const startDecrement = (productId) => {
    stopIncrement();
    const intervalId = setInterval(() => {
      setProductQuantities((prevQuantities) => {
        const newQuantity = (prevQuantities[productId] || 1) - 1;
        if (newQuantity < 1) {
          setProductToRemove(productId);
          clearInterval(intervalId);
          return prevQuantities;
        }
        return {
          ...prevQuantities,
          [productId]: newQuantity,
        };
      });
    }, 300);
    setDecrementIntervalId(intervalId);
  };

  const stopDecrement = () => {
    clearInterval(decrementIntervalId);
    setDecrementIntervalId(null);
  };

  useEffect(() => {
    setUserID(getUserIdFromToken(token));
  }, [token]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const userId = userID;

        if (!userId) throw new Error("Failed to fetch user ID");

        const ordersResponse = await axios.get(
          `${config.API_ROOT}/api/v1/order/getOpenOrderForUser/${userId}`
        );
        const orders = ordersResponse.data;

        if (orders.length === 0) {
          message.error("Giỏ hàng của bạn hiện đang trống");
          // Optionally, you can return or handle this case further
          return;
        }
        const orderID = orders.OrderID;
        setOrderID(orderID);

        const orderDetailsResponse = await axios.get(
          `${config.API_ROOT}/api/v1/order/getOrder/${orderID}`
        );
        const orderDetails = orderDetailsResponse.data;

        const productDetailsPromises = orderDetails.map(async (orderItem) => {
          const productResponse = await axios.get(
            `${config.API_ROOT}/api/v1/product/getProductInforID/${orderItem.ProductID}`
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
      } catch (err) {
        console.error(
          "Error fetching order details:",
          err.response ? err.response.data.message : err.message
        );
      }
    };

    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `${config.API_ROOT}/api/v1/city/getAllCities/`
        );
        setCities(response.data);
      } catch (err) {
        console.error(
          "Error fetching cities:",
          err.response ? err.response.data.message : err.message
        );
      }
    };
    const fetchUserDetails = async () => {
      try {
        const userId = userID;
        const userDetailsResponse = await axios.get(
          `${config.API_ROOT}/api/v1/user/getUserByID?UserID=${userId}`
        );
        const userPoints = userDetailsResponse.data.data.Point;
        setPoints(userPoints);
      } catch (err) {
        console.log(err.response ? err.response.data.message : err.message);
      }
    };

    if (userID) {
      fetchUserOrders();
      fetchCities();
      fetchUserDetails();
    }
  }, [userID]);

  useEffect(() => {
    const checkOldAddress = async () => {
      try {
        const userId = getUserIdFromToken(token);
        const oldAddress = await axios.post(
          `${config.API_ROOT}/api/v1/shippingAddress/getInfoAddressWithOrderNearest`,
          {
            UserID: userId,
          }
        );
        if (oldAddress.data.err === 1) {
          setUsingSavedAddress(false);
        } else {
          setUsingSavedAddress(true);
          handleAddressSelect(oldAddress.data.data);
        }
      } catch (err) {
        console.log(err.response ? err.response.data.message : err.message);
      }
    };
    checkOldAddress();
  }, [token]);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedCityID) {
        try {
          const response = await axios.get(
            `${config.API_ROOT}/api/v1/district/getDistrictByID/${selectedCityID}`
          );
          setDistricts(response.data);
        } catch (err) {
          console.error(
            "Error fetching districts:",
            err.response ? err.response.data.message : err.message
          );
        }
      }
    };
    fetchDistricts();
  }, [selectedCityID]);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get(
          `${config.API_ROOT}/api/v1/voucher/getVouchersByUserID/${userID}`
        );
        setVouchers(response.data);
      } catch (err) {
        console.error(
          "Error fetching vouchers:",
          err.response ? err.response.data.message : err.message
        );
      }
    };

    if (userID) {
      fetchVouchers();
    }
  }, [userID]);

  const handleVoucherSelect = (voucher) => {
    const subtotal = calculateTotal();
    if (voucher.MinDiscount !== undefined && subtotal >= voucher.MinDiscount) {
      setSelectedVoucher(voucher);
      localStorage.setItem("selectedVoucher", voucher.VoucherID);
      setShowVoucherPopup(false);
    } else {
      message.warning(
        `Phiếu giảm giá này yêu cầy đơn hàng tối thiểu từ ${voucher.MinDiscount ? voucher.MinDiscount.toLocaleString() : 0
        } đ.`
      );
    }
  };

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
  // const total = subtotal + discount;

  useEffect(() => {
    // Lấy productID từ Local Storage
    const selectedProductID = localStorage.getItem("selectedProductID");
    if (selectedProductID) {
      setSelectedProducts({ [selectedProductID]: true });
      // Xóa productID khỏi Local Storage sau khi đã đọc
      localStorage.removeItem("selectedProductID");
    }
  }, []);

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
  const handleUseNewAddressSelect = () => {
    setUsingSavedAddress(false);
    setReceiver("");
    setPhoneNumber("");
    setAddress("");
    setSelectedShippingAddressID("");
    setShowAddressPopup(false);
  };

  const handleOrder = async () => {
    try {
      const selectedProductIds = Object.keys(selectedProducts).filter(
        (productId) => selectedProducts[productId]
      );

      if (selectedProductIds.length === 0) {
        message.warning("Vui lòng chọn ít nhất một sản phẩm.");
        return;
      }

      if (!paymentMethod) {
        message.warning("Vui lòng chọn hình thức thanh toán.");
        return;
      }

      if (!receiver || !phoneNumber || !address) {
        message.warning("Vui lòng nhập hoặc chọn địa chỉ giao hàng.");
        return;
      }

      if (orderID) {
        if (usingSavedAddress && selectedShippingAddressID) {
          await axios.post(
            `${config.API_ROOT}/api/v1/order/updateShippingAddressID`,
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
            `${config.API_ROOT}/api/v1/order/addInfoCusToOrder`,
            {
              receiver: receiver,
              phoneNumber: phoneNumber,
              address: `${address}, ${selectedDistrict}, ${selectedCity}`,
              userID: userID,
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
        localStorage.setItem("usePoints", usePoints);

        const response = await axios.post(
          `${config.API_ROOT}/api/v1/payment/create_payment_url`,
          {
            orderID,
            amount: parseInt(totalAmount),
            language: "vn",
          }
        );
        if (response) {
          window.open(response.data.url, "_self");
        }
      } else {
        console.error("orderID is not set");
      }
    } catch (error) {
      console.error(
        "Error processing order:",
        error.response ? error.response.data.message : error.message
      );
    }
  };

  const confirmRemoveProduct = async () => {
    try {
      if (orderID && productToRemove) {
        await axios.post(
          `${config.API_ROOT}/api/v1/order/removeProductFromOrder`,
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
      console.error(
        "Error removing product from order:",
        error.response ? error.response.data.message : error.message
      );
    }
  };

  const formatPrice = (price) => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };
  const calculateKmai = () => {
    let voucherDiscount = calculateDiscount();
    let pointsDiscount = usePoints ? points * 10 : 0; // Assuming 1 point = 10₫ discount
    return voucherDiscount + pointsDiscount;
  };

  const kmai = calculateKmai();

  return (
    <div className="checkout-container">
      <br />
      <br />
      <br />
      <div className="checkout">
        <div className="customer-info">
          <div className="address-section">
            <h2 className="address-title-long">ĐỊA CHỈ</h2>
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
            <textarea
              className="address-input-long"
              type="text"
              placeholder="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={usingSavedAddress}
            />
            {!usingSavedAddress && (
              <div>
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
                    <option
                      key={district.DistrictID}
                      value={district.DistrictID}
                    >
                      {district.DistrictName}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {usingSavedAddress ? (
              <button
                className="custom-button-long"
                onClick={handleUseNewAddressSelect}
              >
                Thêm địa chỉ mới
              </button>
            ) : (
              <button
                className="custom-button-long"
                onClick={() => setShowAddressPopup(true)}
              >
                Dùng địa chỉ cũ
              </button>
            )}
          </div>
        </div>

        <div className="product-info-container-long">
          <h3>SẢN PHẨM ({orderDetails.length} sản phẩm)</h3>
          <div className="product-info-long">
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
                  <img
                    src={productInfo?.Image}
                    alt={productInfo?.ProductName}
                  />
                  <div>
                    <p className="ten-sp-cartth">{productInfo?.ProductName}</p>
                    <p className="gia-sp-cartth">
                      {item.Price.toLocaleString()} đ
                    </p>
                    <div className="quantity-control">
                      <button
                        onClick={() => decreaseOne(productId)}
                        onMouseDown={() => startDecrement(productId)}
                        onMouseUp={stopDecrement}
                        onMouseLeave={stopDecrement}
                      >
                        -
                      </button>
                      <span>Số lượng: {quantity}</span>
                      <button onClick={() => increaseOne(productId)}>+</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="payment-info">
          <h3>THANH TOÁN</h3>
          <div className="totals">
            <div className="total-row">
              <span>Tạm tính</span>
              <span>{subtotal.toLocaleString()} đ</span>
            </div>
            <div className="voucher-selection-long">
              <button
                className="choose-voucher-btn"
                onClick={() => setShowVoucherPopup(true)}
              >
                Chọn Voucher
              </button>
              {selectedVoucher && (
                <div className="voucher-dis-x">
                  <p>
                    Voucher đã chọn: -{selectedVoucher.DiscountPercentage || 0}%
                  </p>
                  <button
                    className="cancel-voucher-btn btn btn-danger"
                    onClick={() => setSelectedVoucher(null)}
                  >
                    X
                  </button>
                </div>
              )}
            </div>
            <div className="points-usage-long points-container">
              <input
                type="checkbox"
                id="usePoints"
                checked={usePoints}
                onChange={(e) => setUsePoints(e.target.checked)}
              />
              <label htmlFor="usePoints">
                <span className="icon-long"></span>
                <span className="icon-wrapper-long">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2Ficon%20xu.png?alt=media&token=f5800217-e7df-4952-a01c-a691db2a036b"
                    alt="Xu icon"
                    className="points-icon"
                  />
                </span>
                Dùng {points} xu - {formatPrice(points * 10)}₫
              </label>
            </div>

            <div className="total-row">
              <span>Khuyến mãi</span>
              {kmai ? (
                <span>-{kmai.toLocaleString()} đ</span>
              ) : (
                <span>{kmai.toLocaleString()} đ</span>
              )}
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
              className="DongY btn btn-success"
              onClick={confirmRemoveProduct}
            >
              Có
            </button>
            <button
              className="Huy btn btn-danger"
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
          userID={userID}
          onSelect={handleAddressSelect}
          onClose={() => setShowAddressPopup(false)}
        />
      )}
    </div>
  );
};

export default ShoppingCart;
