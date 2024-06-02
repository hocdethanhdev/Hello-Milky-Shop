import React from "react";
import "./News.css";
import Menu from "./Menu";
import { Link } from "react-router-dom";

function News() {
  return (
    <div className="box-banner-trid">
      <div className="main-banner-trid">
        <img src="/ImageMilkShop/bannertop.png" alt="Main banner" />
      </div>

      <div className="center-promotion-trid">
        <div className="box-menu-prom-trid">
          <ul>
            <li className="odd-item-trid">
              <a
                target="_blank"
                href="/khuyen-mai/vui-tet-thieu-nhi-gia-giam-me-ly-giam-den-50"
              >
                <img
                  lazyload=""
                  data-original="https://media.shoptretho.com.vn/upload/image/km/20230529/banner-768x399.jpg"
                  src="/ImageMilkShop/banner-768x399.jpg"
                  alt="banner"
                  className="imgbanner-trid"
                />
              </a>
              <div className="tgkm-promo-trid night" id="">
                Thời gian khuyến mại: <b>23/05 - 23/08 </b>
              </div>
            </li>
            <li className="even-item-trid">
              <a target="_blank" href="/khuyen-mai/be-khoe-me-vui-giam-den-50">
                <img
                  lazyload=""
                  data-original="https://media.shoptretho.com.vn/upload/image/km/20230713/banner-768x399.png"
                  src="/ImageMilkShop/banner-768x399.png"
                  alt="banner"
                  className="imgbanner-trid"
                />
              </a>
              <div className="tgkm-promo-trid night" id="">
                Thời gian khuyến mại: <b>11/07 - 14/11 </b>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-head-trid">Những sản phẩm hấp dẫn đang chờ bạn</div>
      <div className="ds-spm-trid">
        <div className="item-spm-trid">
          <a href="Sữa-bầu-Bellamy's-Organic ">
            Sữa bầu Bellamy's Organic 900g
          </a>

          <span className="name-pro-home-trid">
            <img
              src="/khuyenmailon/sua-bau-bellamy-s-organic-1.png"
              alt="sua-bellamy"
            ></img>
          </span>
          <span className="percent-trid">-50k</span>
          <span className="id-sp-trid">Mã SP: 123</span>
          <span className="price-trid">
            <i className="price-home-trid">690.000đ</i>
            <i className="price-sell-trid">640.000đ</i>
          </span>
        </div>
        {/*  */}
        <div className="item-spm-trid">
          <a href="Sữa-bột-Glucerna ">Sữa bầu Glucerna hương vani 400g</a>
          <span className="name-pro-home-trid">
            <img
              src="/khuyenmailon/sua-glucerna-cho-nguoi-tieu-duong-400gr.png"
              alt="sua-glucerna"
            ></img>
          </span>
          <span className="percent-trid">-30k</span>
          <span className="id-sp-trid">Mã SP: 456</span>
          <span className="price-trid">
            <i className="price-home-trid">400.000đ</i>
            <i className="price-sell-trid">370.000đ</i>
          </span>
        </div>

        <div className="item-spm-trid">
          <a href="Sữa-bột-Glucerna ">Sữa bầu Glucerna hương vani 400g</a>
          <span className="name-pro-home-trid">
            <img
              src="/khuyenmailon/sua-glucerna-cho-nguoi-tieu-duong-400gr.png"
              alt="sua-glucerna"
            ></img>
          </span>
          <span className="percent-trid">-30k</span>
          <span className="id-sp-trid">Mã SP: 456</span>
          <span className="price-trid">
            <i className="price-home-trid">400.000đ</i>
            <i className="price-sell-trid">370.000đ</i>
          </span>
        </div>

        <div className="item-spm-trid">
          <a href="Sữa-bột-Glucerna ">Sữa bầu Glucerna hương vani 400g</a>
          <span className="name-pro-home-trid">
            <img
              src="/khuyenmailon/sua-glucerna-cho-nguoi-tieu-duong-400gr.png"
              alt="sua-glucerna"
            ></img>
          </span>
          <span className="percent-trid">-30k</span>
          <span className="id-sp-trid">Mã SP: 456</span>
          <span className="price-trid">
            <i className="price-home-trid">400.000đ</i>
            <i className="price-sell-trid">370.000đ</i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default News;
