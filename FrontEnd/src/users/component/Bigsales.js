import React, { useState, useEffect } from "react";
import "./Bigsales.css";
import { Link } from "react-router-dom";
import NavCate from "../ui-product-mom/NavCate";

const fetchPromotions = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/promotion/getPromotionByDate");
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

const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/promotion/getCurrentProductsHavingPromotion");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    console.log("Fetched products:", data); // Debugging log
    return data.map(product => ({
      id: product.ProductID,
      name: product.ProductName,
      description: product.Description,
      price: product.Price,
      imageUrl: product.Image,
      stockQuantity: product.StockQuantity,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

function Bigsales() {
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const promotionsData = await fetchPromotions();
      console.log("Setting promotions:", promotionsData); // Debugging log
      setPromotions(promotionsData);

      const productsData = await fetchProducts();
      console.log("Setting products:", productsData); // Debugging log
      setProducts(productsData);
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
            <a href="https://shoptretho.com.vn/danh-muc/sua-cho-tre-em" style={{ textDecoration: 'none' }}>
              <div className="box_product_header" style={{ background: 'url() no-repeat center', backgroundRepeat: 'repeat-y', backgroundColor: '#0f7fc1' }}>
                <span className="box_product_textHead">Những khuyến mãi đang chờ bạn</span>
              </div>
            </a>
            <div className="listProduct" id="danhsach920" data-url="/Desktop/PromotionDetail/ListProduct?pageType=km&danhsachId=920&size=8">
              <div className="bx-wrapper" style={{ width: '100%' }}>
                <div className="bx-viewport">
                  {products.map(product => (
                    <div className="item_product" key={product.id}>
                     
                      <div className="pro-image">
                        <a href={`/product/${product.id}`}>
                          <img src={product.imageUrl} alt={product.name} style={{ display: 'block' }} />
                        </a>
                      </div>
                      <div className="item_product_detail">
                        <div className="info">
                          <a href={`/product/${product.id}`} title={product.name} target="_blank">{product.name}</a>
                          <span className="barCode">Mã SP: {product.id}</span>
                        </div>
                        <div className="money">
                          <span className="moneyText">{product.price}đ</span>
                          {/* Assuming there is an original price, we can show the discounted price */}
                          <span className="moneyText2">{(product.price * 1.1).toFixed(0)}đ</span> {/* Placeholder for original price */}
                        </div>
                      </div>
                    </div>
                  ))}
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
