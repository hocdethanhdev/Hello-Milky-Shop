import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Product1.css";
import StarRating from "../ui-list-product-mom/StarRating";

function Combo1() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Call API to fetch product data
    axios
      .get(
        "http://localhost:5000/api/v1/product/getTop6MilksForPregnantMother/"
      )
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  // Function to format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatPriceDiscount = (price) => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section id="combo_1f" className="combo-1f-section">
      <div className="combo-1f-wrap">
        <div className="combo-1f-content">
          <div className="combo-1f-header">
            <div className="combo-1f-icon">
              <img
                src="https://media.shoptretho.com.vn/upload/image/menu/20150803/do-dung-cho-me-1.png?mode=max&width=60&height=60"
                alt="Combo icon"
              />
            </div>
            <div className="combo-1f-title">
              <h2>Sữa dành cho mẹ</h2>
            </div>
          </div>
          <div className="combo-1f-main">
            <img
              src="./ImageMilkShop/banner-tang.png"
              alt="Combo siêu tiết kiệm"
            />
          </div>
          <div className="combo-content">
            {Array.isArray(products) &&
              products.map((product, index) => (
                <div
                  key={product.ProductID}
                  className="combo-item"
                  onClick={() => handleProductClick(product.ProductID)}
                >
                  <img src={product.Image} alt={`Combo ${index + 1}`} />
                  <div className="combo-details">
                    <h3>{product.ProductName}</h3>
                    <div className="saoduoithinh-1">
                      <StarRating productId={product.ProductID} />
                    </div>
                    {product.PriceAfterDiscounts !== product.Price ? (
                      <div className="gia">
                        <p className="discounted-price">
                          {formatPrice(product.PriceAfterDiscounts)}
                        </p>
                        <p className="original-price">
                          {formatPrice(product.Price)}
                        </p>
                      </div>
                    ) : (
                      <p>{formatPrice(product.Price)}</p>
                    )}  
                  </div>
                  {product.Price !== product.PriceAfterDiscounts && <span className="discount">-{formatPriceDiscount((product.Price - product.PriceAfterDiscounts) / 1000)}K</span>}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Combo1;
