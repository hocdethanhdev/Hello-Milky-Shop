import React, { useState } from "react";
import "./ShoppingCart.css";
import { Link } from "react-router-dom";




const ShoppingCart = () => {
  const [product, setProduct] = useState({
    name: "Sữa Aptamil New Zealand số 2 900g",
    price: 659000,
    quantity: 1,
  });

  const handleQuantityChange = (action) => {
    if (action === "increase" && product.quantity < 10) {
      setProduct({ ...product, quantity: product.quantity + 1 });
    } else if (action === "decrease" && product.quantity > 1) {
      setProduct({ ...product, quantity: product.quantity - 1 });
    }
  };

  const subtotal = product.price * product.quantity;
  const discount = -5000;
  const total = subtotal + discount;

  return (
    <div className="checkout-container">
      
      <div className="quick-login">
        <p>
         Hãy<a href="#login"><Link to="/login"> Đăng nhập</Link></a> để mua hàng nhanh hơn!
      
        </p>
      </div>
      <div className="checkout">
        <div className="customer-info">
          <h3>THÔNG TIN MUA HÀNG</h3>
          <input type="text" placeholder="Họ và tên" />
          <input type="text" placeholder="Số điện thoại" />

          <select>
            <option>TP Hồ Chí Minh</option>
            <option value="76">An Giang</option>
            <option value="8">Bạc Li&#234;u</option>
            <option value="9">Bắc Cạn</option>
            <option value="7">B&#224; Rịa - Vũng T&#224;u</option>
            <option value="10">Bắc Giang</option>
            <option value="11">Bắc Ninh</option>
            <option value="12">Bến Tre</option>
            <option value="13">B&#236;nh Dương</option>
            <option value="14">B&#236;nh Định</option>
            <option value="15">B&#236;nh Phước</option>
            <option value="16">B&#236;nh Thuận</option>
            <option value="18">C&#224; Mau</option>
            <option value="19">Cao Bằng</option>
            <option value="20">Cần Thơ</option>
            <option value="21">Đ&#224; Nẵng</option>
            <option value="22">Đăk lắk</option>
            <option value="23">Đăk N&#244;ng</option>
            <option value="24">Điện Bi&#234;n</option>
            <option value="25">Đồng Nai</option>
            <option value="26">Đồng Th&#225;p</option>
            <option value="27">Gia Lai</option>
            <option value="28">H&#224; Giang</option>
            <option value="29">H&#224; Nam</option>
            <option value="31">H&#224; Tĩnh</option>
            <option value="32">Hải Dương</option>
            <option value="34">H&#242;a B&#236;nh</option>
            <option value="36">Hậu Giang</option>
            <option value="37">Hưng Y&#234;n</option>
            <option value="38">Kh&#225;nh H&#242;a</option>
            <option value="39">Ki&#234;n Giang</option>
            <option value="40">Kon Tum</option>
            <option value="41">Lai Ch&#226;u</option>
            <option value="42">L&#224;o Cai</option>
            <option value="43">Lạng Sơn</option>
            <option value="44">L&#226;m Đồng</option>
            <option value="45">Long An</option>
            <option value="47">Nam Định</option>
            <option value="48">Nghệ An</option>
            <option value="49">Ninh B&#236;nh</option>
            <option value="50">Ninh Thuận</option>
            <option value="51">Ph&#250; Thọ</option>
            <option value="52">Ph&#250; Y&#234;n</option>
            <option value="53">Quảng B&#236;nh</option>
            <option value="54">Quảng Nam</option>
            <option value="55">Quảng Ng&#227;i</option>
            <option value="56">Quảng Ninh</option>
            <option value="57">Quảng Trị</option>
            <option value="58">S&#243;c Trăng</option>
            <option value="59">Sơn La</option>
            <option value="60">T&#226;y Ninh</option>
            <option value="61">Th&#225;i B&#236;nh</option>
            <option value="62">Th&#225;i Nguy&#234;n</option>
            <option value="63">Thanh H&#243;a</option>
            <option value="65">Thừa Thi&#234;n Huế</option>
            <option value="66">Tiền Giang</option>
            <option value="67">Tr&#224; Vinh</option>
            <option value="68">Tuy&#234;n Quang</option>
            <option value="69">Vĩnh Long</option>
            <option value="70">Vĩnh Ph&#250;c</option>
            <option value="71">Y&#234;n B&#225;i</option>
            {/* Add more options */}
          </select>
          <select>
            <option>Quận/Huyện</option>
            <option value="70139">B&#236;nh Ch&#225;nh</option>
            <option value="70140">B&#236;nh T&#226;n</option>
            <option value="70129">B&#236;nh Thạnh</option>
            <option value="70143">Cần Giờ</option>
            <option value="70135">Củ Chi</option>
            <option value="70125">G&#242; Vấp</option>
            <option value="70137">H&#243;c M&#244;n</option>
            <option value="70141">Nh&#224; B&#232;</option>
            <option value="70131">Ph&#250; Nhuận</option>
            <option value="70101">Quận 1</option>
            <option value="70119">Quận 10</option>
            <option value="70121">Quận 11</option>
            <option value="70123">Quận 12</option>
            <option value="70103">Quận 2</option>
            <option value="70105">Quận 3</option>
            <option value="70107">Quận 4</option>
            <option value="70109">Quận 5</option>
            <option value="70111">Quận 6</option>
            <option value="70113">Quận 7</option>
            <option value="70115">Quận 8</option>
            <option value="70117">Quận 9</option>
            <option value="70127">T&#226;n B&#236;nh</option>
            <option value="70128">T&#226;n Ph&#250;</option>
            <option value="70133">Thủ Đức</option>
            {/* Add more options */}
          </select>
          <input type="text" placeholder="Số nhà, tòa nhà, đường, xã phường" />
        </div>

        <div className="product-info">
          <h3>SẢN PHẨM (1 sản phẩm)</h3>
          <div className="product-item">
            <img src="https://via.placeholder.com/150" alt="Product" />
            <div>
              <p>{product.name}</p>
              <p>{product.price.toLocaleString()} đ</p>
              <div className="quantity-control">
                <button onClick={() => handleQuantityChange("decrease")}>
                  -
                </button>
                <span>{product.quantity}</span>
                <button onClick={() => handleQuantityChange("increase")}>
                  +
                </button>
                <button>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
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
          <button className="order-btn">ĐẶT HÀNG</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
