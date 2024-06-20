import React, { useState, useEffect } from "react";
import "./Bigsales.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import NavCate from "../ui-product-mom/NavCate";

const fetchPromotions = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/promotion/getPormotionByDate");
    if (!response.ok) {
      throw new Error("Failed to fetch promotions");
    }
    const data = await response.json();
    console.log("Fetched promotions:", data); // Debugging log
    return data.map(promo => ({
      id: promo.PromotionID,
      title: promo.PromotionName,
      description: promo.Description,
      discount: promo.DiscountPercentage,
      startDate: new Date(promo.StartDate).toLocaleDateString(),
      endDate: new Date(promo.EndDate).toLocaleDateString(),
      imageUrl: promo.Image,
     
    }));
  } catch (error) {
    console.error("Error fetching promotions:", error);
    return [];
  }
};

function Bigsales() {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const promotionsData = await fetchPromotions();
      console.log("Setting promotions:", promotionsData); // Debugging log
      setPromotions(promotionsData);
    };

    fetchData();
  }, []);

  

  return (
    <div className="box-banner">
      <NavCate />
      <div className="main-banner">
       
          {promotions.map(promo => (
            <div key={promo.id}>
              <Link to={promo.link} className="imgbanner">
                <img src={promo.imageUrl} alt="banner" className="imgbanner" />
              </Link>
              <div className="tgkm-promo night">
                Thời gian khuyến mại: <b>{promo.startDate} - {promo.endDate}</b>
              </div>
              <div className="promo-description">
                {promo.description} - Giảm đến {promo.discount}%
              </div>
            </div>
          ))}
       
      </div>
      <div className="content-tri">
        <div className="contentPro">
          <div className="box_product" id="id920">
            <a href="https://shoptretho.com.vn/danh-muc/sua-cho-tre-em" style={{textDecoration: 'none'}}>
              <div className="box_product_header" style={{background: 'url() no-repeat center', backgroundRepeat: 'repeat-y', backgroundColor: '#0f7fc1'}}>
                <span className="box_product_textHead">Sữa cho bé</span>
              </div>
            </a>
            <div className="listProduct" id="danhsach920" data-url="/Desktop/PromotionDetail/ListProduct?pageType=km&danhsachId=920&size=8">
              <div className="bx-wrapper" style={{width: '100%'}}>
                <div className="bx-viewport">
                  <div className="item_product">
                    <span className="iconSaleOff">-50K</span>
                    <div className="pro-image">
                      <a href="/sua-hikid-han-quoc-600g" target="_blank">
                        <img src="https://media.shoptretho.com.vn/upload/image/product/20191226/sua-hikid-han-quoc-600g-vi-vani-1.png?mode=max&width=185&height=185" alt="Sữa Hikid - Hàn Quốc vị vani (600g)" style={{display: 'block'}} />
                      </a>
                    </div>
                    <div className="item_product_detail">
                      <div className="info">
                        <a href="/sua-hikid-han-quoc-600g" title="Sữa Hikid - Hàn Quốc vị vani (600g)" target="_blank">Sữa Hikid - Hàn Quốc vị vani (600g)</a>
                        <span className="barCode">Mã SP: TP-5985</span>
                      </div>
                      <div className="money">
                        <span className="moneyText">510.000đ</span>
                        <span className="moneyText2">560.000đ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="clear" />
            <div className="box_product" id="id921">
              <a href="https://shoptretho.com.vn/danh-muc/sua-meiji" style={{textDecoration: 'none'}}>
                <div className="box_product_header" style={{background: 'url() no-repeat center', backgroundRepeat: 'repeat-y', backgroundColor: '#0f7fc1'}}>
                  <span className="box_product_textHead">Sữa cho mẹ</span>
                </div>
              </a>
              <div className="listProduct" id="danhsach921" data-url="/Desktop/PromotionDetail/ListProduct?pageType=km&danhsachId=921&size=8">
                <div className="bx-wrapper" style={{width: '100%'}}>
                  <div className="bx-viewport">
                    <div className="item_product">
                      <span className="iconSaleOff">-25K</span>
                      <div className="pro-image">
                        <a href="/sua-meiji-so-0-800gr" target="_blank">
                          <img src="https://media.shoptretho.com.vn/upload/image/product/20230309/sua-meiji-so-0-800gr-0-1-tuoi.jpg?mode=max&width=185&height=185" alt="Sữa Meiji số 0 - 800gr (0-1 tuổi)" style={{display: 'block'}} />
                        </a>
                      </div>
                      <div className="item_product_detail">
                        <div className="info">
                          <a href="/sua-meiji-so-0-800gr" title="Sữa Meiji số 0 - 800gr (0-1 tuổi)" target="_blank">Sữa Meiji số 0 - 800gr (0-1 tuổi)</a>
                          <span className="barCode">Mã SP: TP-270</span>
                        </div>
                        <div className="money">
                          <span className="moneyText">490.000đ</span>
                          <span className="moneyText2">515.000đ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="clear" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bigsales;
