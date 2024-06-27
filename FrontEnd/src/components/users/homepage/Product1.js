import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Product1.css";
import Giasoc from "./Giasoc.js";
import Combo1 from "./Combo1.js";
import Combo2 from "./Combo2.js";
import VoucherStore from "./VoucherStore.js";
import Menu from "./Menu.js";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

function Product1() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [message, setMessage] = useState(true);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const handleToaster = () => {
    setMessage(false);
  };

  return (
    <section id="list_category" className="width-common-product-tri">
    
    {message && <Toaster toastOptions={{ duration: 5000 }} />}
    {handleToaster}
      {/* Đơn giản hóa nội dung của div.wrap */}
      <div className="wrap">
        <div className="row">
          <div className="col-md-3 tri">
            <Menu />
          </div>
          <div className="col-md-9 tri">
            <div className="main_slide">
              <Slider {...sliderSettings}>
                <div className="box_slider">
                  <img src="/banner1.png" alt="Banner 1" />
                </div>
                <div className="box_slider">
                  <img src="/banner2.jpg" alt="Banner 2" />
                </div>
                <div className="box_slider">
                  <img src="/banner3.png" alt="Banner 3" />
                </div>
              </Slider>
              <div className="box_product_suggest">
                <div className="clear" />
              </div>
              <div className="clear" />
            </div>
          </div>
        </div>
      </div>

      {/* Giá sốc hôm nay */}
      <Giasoc />

      {/* Voucher (only if logged in) */}
      {isLoggedIn && (
        <div className="voucher_section">
          <VoucherStore />
        </div>
      )}

      {/* PRODUCT 3 */}
      <Combo1 />

      {/* COMBO DÀNH CHO BÉ */}
      <Combo2 />
    </section>
  );
}

export default Product1;
