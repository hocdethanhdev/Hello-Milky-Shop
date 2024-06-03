import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Product1.css";
import Menu from "./Menu";

function Product1() {
  const [products] = useState([
    {
      href: "/sua-kid-essentials-nestle-800g-1-10-tuoi",
      imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230606/sua-kid-essentials-nestle-800g-1-10-tuoi.jpg?mode=max&width=400&height=400",
      alt: "Sữa Kid Essentials Nestle 800g (1-10 tuổi)",
      title: "Sữa Kid Essentials Nestle 800g (1-10 tuổi)",
      price: "580.000đ",
      oldPrice: "625.000đ"
    },
    {
      href: "/sua-aptamil-new-zealand-so-2-900g-12-24-thang",
      imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230529/sua-aptamil-newzealand-2.jpg?mode=max&width=400&height=400",
      alt: "Sữa Aptamil New Zealand số 2 900g (12-24 tháng)",
      title: "Sữa Aptamil New Zealand số 2 900g (12-24 tháng)",
      price: "659.000đ",
      oldPrice: "664.000đ"
    },
    {
      href: "/sua-glico-icreo-so-1-nhat-ban",
      imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20200331/sua-icreo-glico-so-1-2020-1.png?mode=max&width=400&height=400",
      alt: "Glico Icreo Nhật Bản số 1 (9-36 tháng)",
      title: "Glico Icreo Nhật Bản số 1 (9-36 tháng)",
      price: "520.000đ",
      oldPrice: "565.000đ"
    }
  ]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section id="list_category" className="width-common-product">
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

      {/* Product 2 */}
      <section
        id="list_product_cate"
        className="width-common boxx-common tm-d superSale"
        data-recoedwidget="true"
      >
        <div className="wrap">
          <div className="category width-common" id="relative-btnMore">
            <div className="box-container-header">
              <div className="box-title box-title-Sgg">Giá Sốc Hôm Nay</div>
              <div className="box-time box-time-allDay"></div>
            </div>
            <div className="box-container-bottom">
              {products.map((product, index) => (
                <div key={index} className="item item-giasoc">
                  <div className="image_item">
                    <a href={product.href} target="_blank">
                      <img src={product.imgSrc} alt={product.alt} />
                    </a>
                  </div>
                  <div className="price">
                    <h3 className="title-giasoc">
                      <a href={product.href} target="_blank">
                        {product.title}
                      </a>
                    </h3>
                    <span className="price_item price_item-Sgg">{product.price}</span>
                    <span className="old_price">{product.oldPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT 3 */}
      <section id="combo_1f" className="combo-1f-section">
        <div className="combo-1f-wrap ">
          <div className="combo-1f-content">
            <div className="combo-1f-header">
              <div className="combo-1f-icon">
                <img src=".//ImageMilkShop/icon2.png" alt="Combo icon" />
              </div>
              <div className="combo-1f-title">
                <h2>Sữa dành cho mẹ</h2>
              </div>
            </div>
            <div className="combo-1f-main">
              <img src=".//ImageMilkShop/banner-tang.png" alt="Combo siêu tiết kiệm" />
            </div>
            <div className="combo-content">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="combo-item">
                  <img src=".//ImageMilkShop/aptakid.jpg" alt={`Combo ${index + 1}`} />
                  <div className="combo-details">
                    <h3>Combo đi sinh tiêu chuẩn</h3>
                    <p>2.266.000đ</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMBO DÀNH CHO BÉ */}
      <section id="combo_2f" className="combo-2f-section">
        <div className="combo-2f-wrap ">
          <div className="combo-2f-content">
            <div className="combo-2f-header">
              <div className="combo-2f-icon">
                <img src=".//ImageMilkShop/icon2.png" alt="Combo icon" />
              </div>
              <div className="combo-2f-title">
                <h2>Sữa dành cho bé</h2>
              </div>
            </div>
            <div className="combo-2f-main">
              <img src=".//ImageMilkShop/banner-tang.png" alt="Combo siêu tiết kiệm" />
            </div>
            <div className="combo-content-1">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="combo-item-1">
                  <img src=".//ImageMilkShop/aptakid.jpg" alt={`Combo ${index + 1}`} />
                  <div className="combo-details-1">
                    <h3>Combo đi sinh tiêu chuẩn</h3>
                    <p>2.266.000đ</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Product1;
