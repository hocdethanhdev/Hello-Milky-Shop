import React from "react";
import "./Bigsales.css";
import Menu from "./Menu";

function Bigsales() {
  return (
    <div className="box-banner">
      <div className="main-banner">
        <img src="/khuyenmailon/bannertop.png" alt="Main banner" />
      </div>

      <div className="center-promotion">
        <div className="box-menu-prom">
          <ul>
            <li className="odd-item">
              <a
                target="_blank"
                href="/khuyen-mai/vui-tet-thieu-nhi-gia-giam-me-ly-giam-den-50"
              >
                <img
                  lazyload=""
                  data-original="https://media.shoptretho.com.vn/upload/image/km/20230529/banner-768x399.jpg"
                  src="/khuyenmailon/banner-768x399.jpg"
                  alt="banner"
                  className="imgbanner"
                />
              </a>
              <div className="tgkm-promo night" id="">
                Thời gian khuyến mại: <b>23/05 - 23/08 </b>
              </div>
            </li>
            <li className="even-item">
              <a target="_blank" href="/khuyen-mai/be-khoe-me-vui-giam-den-50">
                <img
                  lazyload=""
                  data-original="https://media.shoptretho.com.vn/upload/image/km/20230713/banner-768x399.png"
                  src="/khuyenmailon/banner-768x399.png"
                  alt="banner"
                  className="imgbanner"
                />
              </a>
              <div className="tgkm-promo night" id="">
                Thời gian khuyến mại: <b>11/07 - 14/11 </b>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-head">Những sản phẩm hấp dẫn đang chờ bạn</div>
      <div className="ds-spm">
        <div className="item-spm">
          <a href="Sữa-bầu-Bellamy's-Organic ">
            Sữa bầu Bellamy's Organic 900g
          </a>
          <span className="name-pro-home">
            <img
              src="./khuyenmailon/sua-bau-bellamy-s-organic-1.png"
              alt="sua-bellamy"
            ></img>
          </span>
          <span className="percent">-50k</span>
          <span className="id-sp">Mã SP: 123</span>
          <span className="price">
            <i className="price-home">690.000đ</i>
            <i className="price-sell">640.000đ</i>
          </span>
        </div>
        {/*  */}
        <div className="item-spm">
          <a href="Sữa-bột-Glucerna ">Sữa bầu Glucerna hương vani 400g</a>
          <span className="name-pro-home">
            <img
              src="./khuyenmailon/sua-glucerna-cho-nguoi-tieu-duong-400gr.png"
              alt="sua-glucerna"
            ></img>
          </span>
          <span className="percent">-30k</span>
          <span className="id-sp">Mã SP: 456</span>
          <span className="price">
            <i className="price-home">400.000đ</i>
            <i className="price-sell">370.000đ</i>
          </span>
        </div>

        <div className="item-spm">
          <a href="Sữa-bột-Glucerna ">Sữa bầu Glucerna hương vani 400g</a>
          <span className="name-pro-home">
            <img
              src="./khuyenmailon/sua-glucerna-cho-nguoi-tieu-duong-400gr.png"
              alt="sua-glucerna"
            ></img>
          </span>
          <span className="percent">-30k</span>
          <span className="id-sp">Mã SP: 456</span>
          <span className="price">
            <i className="price-home">400.000đ</i>
            <i className="price-sell">370.000đ</i>
          </span>
        </div>

        <div className="item-spm">
          <a href="Sữa-bột-Glucerna ">Sữa bầu Glucerna hương vani 400g</a>
          <span className="name-pro-home">
            <img
              src="./khuyenmailon/sua-glucerna-cho-nguoi-tieu-duong-400gr.png"
              alt="sua-glucerna"
            ></img>
          </span>
          <span className="percent">-30k</span>
          <span className="id-sp">Mã SP: 456</span>
          <span className="price">
            <i className="price-home">400.000đ</i>
            <i className="price-sell">370.000đ</i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Bigsales;
