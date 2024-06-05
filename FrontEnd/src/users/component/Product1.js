import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Product1.css";
import Giasoc from "./Giasoc.js";
import Combo1 from "./Combo1.js";
import Combo2 from "./Combo2.js";
import Menu from "./Menu";

function Product1() {
  

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section id="list_category" className="width-common-product-tri">
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
      <Giasoc/>

      {/* PRODUCT 3 */}
      <Combo1/>
      {/* COMBO DÀNH CHO BÉ */}
      <Combo2/>
    </section>
  );
}

export default Product1;
