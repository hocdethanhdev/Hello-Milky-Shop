import React, { useState, useEffect } from "react";
import "./Bigsales.css";
import Menu from "./Menu";
import { Link } from "react-router-dom";

const fetchPromotions = async () => {
  // This is a mock function. Replace it with a real API call.
  return [
    {
      id: 1,
      title: "Vui Tết Thiếu Nhi - Giảm đến 50%",
      imageUrl:
        "https://media.shoptretho.com.vn/upload/image/km/20230529/banner-768x399.jpg",
      link: "/khuyen-mai/vui-tet-thieu-nhi-gia-giam-me-ly-giam-den-50",
      promotionPeriod: "23/05 - 23/08",
    },
    {
      id: 2,
      title: "Bé Khỏe Mẹ Vui - Giảm đến 50%",
      imageUrl:
        "https://media.shoptretho.com.vn/upload/image/km/20230713/banner-768x399.png",
      link: "./Dealsoc",
      promotionPeriod: "11/07 - 14/11",
    },
  ];
};

const fetchProducts = async () => {
  // This is a mock function. Replace it with a real API call.
  return [
    {
      id: 123,
      name: "Sữa bầu Bellamy's Organic 900g",
      imageUrl: "./khuyenmailon/sua-bau-bellamy-s-organic-1.png",
      originalPrice: "690.000đ",
      salePrice: "640.000đ",
      discount: "-50k",
    },
    {
      id: 456,
      name: "Sữa bầu Glucerna hương vani 400g",
      imageUrl: "./khuyenmailon/sua-glucerna-cho-nguoi-tieu-duong-400gr.png",
      originalPrice: "400.000đ",
      salePrice: "370.000đ",
      discount: "-30k",
    },
    {
      id: 789,
      name: "Sữa bầu Glucerna hương vani 400g",
      imageUrl: "./khuyenmailon/sua-glucerna-cho-nguoi-tieu-duong-400gr.png",
      originalPrice: "400.000đ",
      salePrice: "370.000đ",
      discount: "-30k",
    },
    {
      id: 8910,
      name: "Sữa bầu Glucerna hương vani 400g",
      imageUrl: "./khuyenmailon/sua-glucerna-cho-nguoi-tieu-duong-400gr.png",
      originalPrice: "400.000đ",
      salePrice: "370.000đ",
      discount: "-30k",
    },
    {
      id: 456,
      name: "Sữa bầu Glucerna hương vani 400g",
      imageUrl: "./khuyenmailon/sua-glucerna-cho-nguoi-tieu-duong-400gr.png",
      originalPrice: "400.000đ",
      salePrice: "370.000đ",
      discount: "-30k",
    },
  ];
};

function Bigsales() {
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const promotionsData = await fetchPromotions();
      const productsData = await fetchProducts();
      setPromotions(promotionsData);
      setProducts(productsData);
    };

    fetchData();
  }, []);


  return (
    <div className="box-banner">
      <div className="main-banner">
        <img src="/khuyenmailon/bannertop.png" alt="Main banner" />
      </div>

      <div className="center-promotion">
        <div className="box-menu-prom">
          <ul>
            {promotions.map((promo, index) => (
              <li
                key={promo.id}
                className={index % 2 === 0 ? "even-item" : "odd-item"}
              >
                <a target="_blank" href={promo.link} rel="noopener noreferrer">
                  <img
                    lazyload=""
                    data-original={promo.imageUrl}
                    src={promo.imageUrl}
                    alt="banner"
                    className="imgbanner"
                  />
                </a>
                <div className="tgkm-promo night">
                  Thời gian khuyến mại: <b>{promo.promotionPeriod}</b>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-head">Những sản phẩm hấp dẫn đang chờ bạn</div>
      <div className="ds-spm">
        {products.map((product) => (
          <div className="item-spm" key={product.id}>
            <a href={product.name.replace(/\s+/g, "-")}>{product.name}</a>
            <span className="name-pro-home">
              <img src={product.imageUrl} alt={product.name}></img>
            </span>
            <span className="percent">{product.discount}</span>
            <span className="id-sp">Mã SP: {product.id}</span>
            <span className="price">
              <i className="price-home">{product.originalPrice}</i>
              <i className="price-sell">{product.salePrice}</i>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bigsales;
