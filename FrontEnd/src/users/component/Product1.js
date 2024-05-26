



import React from "react";
import Slider from "react-slick";
import { TiThMenu } from "react-icons/ti";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Product1.css";





function Product1() {
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
          <div className="col-md-3">
            <div className="menu_cate">
              <table className="category_table">
                <thead>
                  <tr>
                    <th className="danhmuc">
                      <div className="icon_danhmuc">
                        <TiThMenu />
                      </div>
                      Danh mục
                    </th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                  <td>
                    <a href="KhuyenMaiLon.html" className="cate_li_title">
                      <img
                        className="img_icon icon_hover"
                        src="https://shoptretho.com.vn/Content/images/khuyen-mai.png?mode=max&width=60&height=60"
                        alt="Khuyến mại lớn"
                      />
                      Khuyến mại lớn
                    </a>
                  </td>
                </tr>
                
                <tr>
                  <td>
                    <a href="SuaChoMe.html" className="cate_li_title">
                      <img
                        className="img_icon icon_hover"
                        src="https://media.shoptretho.com.vn/upload/image/menu/20150803/do-dung-cho-me-1.png?mode=max&width=60&height=60"
                        alt="Đồ dùng cho mẹ"
                      />
                      Sữa cho mẹ
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="SuaChoBe.html" className="cate_li_title">
                      <img
                        className="img_icon icon_hover"
                        src="https://media.shoptretho.com.vn/upload/image/menu/20150803/do-dung-cho-me-1.png?mode=max&width=60&height=60"
                        alt="Đồ dùng cho mẹ"
                      />
                      Sữa cho bé
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="/Voucher" className="cate_li_title">
                      <img
                        className="img_icon icon_hover"
                        src="./voucher.png"
                        
                        alt="Voucher"
                      />
                     Voucher
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="/" className="cate_li_title">
                      <img
                        className="img_icon icon_hover"
                        src="./news.png"
                        alt="Tin tức"
                      />
                      Tin tức
                    </a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-9">
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
              <div className="item item-giasoc">
                <div className="image_item">
                  <a
                    href="/sua-kid-essentials-nestle-800g-1-10-tuoi"
                    target="_blank"
                  >
                    <img
                      src="https://media.shoptretho.com.vn/upload/image/product/20230606/sua-kid-essentials-nestle-800g-1-10-tuoi.jpg?mode=max&width=400&height=400"
                      alt="Sữa Kid Essentials Nestle 800g (1-10 tuổi)"
                    />
                  </a>
                </div>
                <div className="price">
                  <h3 className="title-giasoc">
                    <a
                      href="/sua-kid-essentials-nestle-800g-1-10-tuoi"
                      target="_blank"
                    >
                      Sữa Kid Essentials Nestle 800g (1-10 tuổi)
                    </a>
                  </h3>
                  <span className="price_item price_item-Sgg">580.000đ</span>
                  <span className="old_price">625.000đ</span>
                  <span className="discount discount-Sgg">-45k</span>
                </div>
              </div>
              <div className="item item-giasoc">
                <div className="image_item">
                  <a
                    href="/sua-aptamil-new-zealand-so-2-900g-12-24-thang"
                    target="_blank"
                  >
                    <img
                      src="https://media.shoptretho.com.vn/upload/image/product/20230529/sua-aptamil-newzealand-2.jpg?mode=max&width=400&height=400"
                      alt="Sữa Aptamil New Zealand số 2 900g (12-24 tháng)"
                    />
                  </a>
                </div>
                <div className="price">
                  <h3 className="title-giasoc">
                    <a
                      href="/sua-aptamil-new-zealand-so-2-900g-12-24-thang"
                      target="_blank"
                    >
                      Sữa Aptamil New Zealand số 2 900g (12-24 tháng)
                    </a>
                  </h3>
                  <span className="price_item price_item-Sgg">659.000đ</span>
                  <span className="old_price">664.000đ</span>
                  <span className="discount discount-Sgg">-5k</span>
                </div>
              </div>
              <div className="item item-giasoc">
                <div className="image_item">
                  <a href="/sua-glico-icreo-so-1-nhat-ban" target="_blank">
                    <img
                      src="https://media.shoptretho.com.vn/upload/image/product/20200331/sua-icreo-glico-so-1-2020-1.png?mode=max&width=400&height=400"
                      alt="Glico Icreo Nhật Bản số 1 (9-36 tháng)"
                    />
                  </a>
                </div>
                <div className="price">
                  <h3 className="title-giasoc">
                    <a href="/sua-glico-icreo-so-1-nhat-ban" target="_blank">
                      Glico Icreo Nhật Bản số 1 (9-36 tháng)
                    </a>
                  </h3>
                  <span className="price_item price_item-Sgg">520.000đ</span>
                  <span className="old_price">565.000đ</span>
                  <span className="discount discount-Sgg">-45k</span>
                </div>
              </div>
              <div className="item item-giasoc">
                <div className="image_item">
                  <a href="/sua-glico-icreo-so-1-nhat-ban" target="_blank">
                    <img
                      src="https://media.shoptretho.com.vn/upload/image/product/20200331/sua-icreo-glico-so-1-2020-1.png?mode=max&width=400&height=400"
                      alt="Glico Icreo Nhật Bản số 1 (9-36 tháng)"
                    />
                  </a>
                </div>
                <div className="price">
                  <h3 className="title-giasoc">
                    <a href="/sua-glico-icreo-so-1-nhat-ban" target="_blank">
                      Glico Icreo Nhật Bản số 1 (9-36 tháng)
                    </a>
                  </h3>
                  <span className="price_item price_item-Sgg">520.000đ</span>
                  <span className="old_price">565.000đ</span>
                  <span className="discount discount-Sgg">-45k</span>
                </div>
              </div>
              <div className="item item-giasoc">
                <div className="image_item">
                  <a href="/sua-glico-icreo-so-1-nhat-ban" target="_blank">
                    <img
                      src="https://media.shoptretho.com.vn/upload/image/product/20200331/sua-icreo-glico-so-1-2020-1.png?mode=max&width=400&height=400"
                      alt="Glico Icreo Nhật Bản số 1 (9-36 tháng)"
                    />
                  </a>
                </div>
                <div className="price">
                  <h3 className="title-giasoc">
                    <a href="/sua-glico-icreo-so-1-nhat-ban" target="_blank">
                      Glico Icreo Nhật Bản số 1 (9-36 tháng)
                    </a>
                  </h3>
                  <span className="price_item price_item-Sgg">520.000đ</span>
                  <span className="old_price">565.000đ</span>
                  <span className="discount discount-Sgg">-45k</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>      
        </section>
      </section>
  );
}

export default Product1;




