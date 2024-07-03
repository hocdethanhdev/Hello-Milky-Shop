import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Product1.css";
import StarRating from "../product/ui-list-product-mom/StarRating";

function Combo2() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/product/getTop6MilkForBaby")
      .then((response) => response.json())
      .then((data) => {
        if (data.err !== "Not found") {
          setProducts(data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const formatPrice = (price) => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section id="combo_2f" className="combo-2f-section">
      <div className="combo-2f-wrap">
        <div className="combo-2f-content">
          <div className="combo-2f-header">
            <a href="/sua-cho-be" className="cate_li_title-trid">
              <div className="combo-2f-icon">
                <img
                  src="https://momslove.com.vn/wp-content/uploads/2021/07/icon-sua.svg"
                  alt="Combo icon"
                />
              </div>
              <div className="combo-2f-title">
                <h2>Sữa dành cho bé</h2>
              </div>
            </a>
          </div>
          <div className="combo-2f-main">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2FS%E1%BB%AFa%20cho%20em%20b%C3%A9.png?alt=media&token=ac65ea73-5a08-4f76-be5e-a3c2f01fdcc5"
              alt="Combo siêu tiết kiệm"
            />
          </div>
          <div className="combo-content-1">
            {products.map((product) => (
              <div
                key={product.ProductID}
                className="combo-item-1"
                onClick={() => handleProductClick(product.ProductID)}
              >
                <div className="div-discount-1">
                  {product.Price !== product.PriceAfterDiscounts && (
                    <span className="discount-1">
                      -
                      {formatPrice(
                        (product.Price - product.PriceAfterDiscounts) / 1000
                      )}
                      K
                    </span>
                  )}
                </div>
                <img src={product.Image} alt={product.ProductName} />
                <div className="combo-details">
                  <h3>{product.ProductName}</h3>
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
                    <p className="discounted-price">
                      {formatPrice(product.Price)}
                    </p>
                  )}
                  <div className="saoduoithinh-1">
                    <StarRating productId={product.ProductID} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Combo2;
