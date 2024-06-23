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
<<<<<<< HEAD
  };
  const formatPriceDiscount = (price) => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };
=======
  };

  const formatPriceDiscount = (price) => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

>>>>>>> 6b248eda15b6b97eba2dd006feaf27066f2e78da
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section id="combo_1f" className="combo-1f-section">
      <div className="combo-1f-wrap">
        <div className="combo-1f-content">
          <div className="combo-1f-header">
<<<<<<< HEAD
            <a href="/sua-cho-me" className="cate_li_title-trid">
              <div className="combo-1f-icon">
                <img
                  src="https://media.shoptretho.com.vn/upload/image/menu/20150803/do-dung-cho-me-1.png?mode=max&width=60&height=60"
                  alt=""
                />
              </div>
              <div className="combo-1f-title">
                <h2>Sữa dành cho mẹ</h2>
              </div>
            </a>
=======
            <div className="combo-1f-icon">
              <img
                src="https://media.shoptretho.com.vn/upload/image/menu/20150803/do-dung-cho-me-1.png?mode=max&width=60&height=60"
                alt="Combo icon"
              />
            </div>
            <div className="combo-1f-title">
              <h2>Sữa dành cho mẹ</h2>
            </div>
>>>>>>> 6b248eda15b6b97eba2dd006feaf27066f2e78da
          </div>
          <div className="combo-1f-main">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2FS%E1%BB%AFa%20cho%20m%E1%BA%B9%20b%E1%BA%A7u.png?alt=media&token=ada9f453-d63f-49d5-bcfa-ee44d9ee2dc9"
              alt="Combo siêu tiết kiệm"
            />
          </div>
          <div className="combo-content">
            
            {Array.isArray(products) &&
              products.map((product, index) => (
<<<<<<< HEAD
                
                <div
                  key={product.ProductID}
                  className="combo-item-1"
                  onClick={() => handleProductClick(product.ProductID)}>
                    <div>{product.Price !== product.PriceAfterDiscounts && (
                          <span className="discount-1">
                            -
                            {formatPriceDiscount(
                              (product.Price - product.PriceAfterDiscounts) /
                                1000
                            )}
                            K
                          </span>
                        )}</div>
=======
                <div
                  key={product.ProductID}
                  className="combo-item"
                  onClick={() => handleProductClick(product.ProductID)}
                >
>>>>>>> 6b248eda15b6b97eba2dd006feaf27066f2e78da
                  <img src={product.Image} alt={`Combo ${index + 1}`} />
                  <div className="combo-details">
                    <h3>{product.ProductName}</h3>
                    <div className="saoduoithinh-1">
                      <StarRating productId={product.ProductID} />
                    </div>
                    {product.PriceAfterDiscounts !== product.Price ? (
                      <div className="gia">
<<<<<<< HEAD
                        
                        <p className="original-price">
                          {formatPrice(product.Price)}
                        </p>
                        <p className="discounted-price">
                          {formatPrice(product.PriceAfterDiscounts)}
                        </p>
                      </div>
                    ) : (
                      <p>{formatPrice(product.Price)}</p>
                    )}
                    <div className="saoduoithinh-1">
                      <StarRating productId={product.ProductID} />
                    </div>
                  </div>
                  
=======
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
>>>>>>> 6b248eda15b6b97eba2dd006feaf27066f2e78da
                </div>
                
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Combo1;
