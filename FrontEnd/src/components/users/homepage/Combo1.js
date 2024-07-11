import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Product1.css";
import StarRating from "../product/ui-list-product-mom/StarRating";
import config from "../../config/config";
import { useTranslation } from 'react-i18next';

function Combo1() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    // Call API to fetch product data
    axios
      .get(
        `${config.API_ROOT}/api/v1/product/getTop6MilksForPregnantMother/`
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
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
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
            <Link to="/sua-cho-me" className="cate_li_title-trid">
              <div className="combo-1f-icon">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2Fdo-dung-cho-me-1.png?alt=media&token=7d86a69a-f13b-4572-a873-ed8b35a0de38"
                  alt=""
                />
              </div>
              <div className="combo-1f-title">
                <h2>{t('milkForMom')}</h2>
              </div>
            </Link>
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
                <div
                  key={product.ProductID}
                  className="combo-item-1"
                  onClick={() => handleProductClick(product.ProductID)}
                >
                  <div className="div-discount-1">
                    {product.Price !== product.PriceAfterDiscounts && (
                      <span className="discount-1">
                        -
                        {formatPriceDiscount(
                          (product.Price - product.PriceAfterDiscounts) / 1000
                        )}
                        K
                      </span>
                    )}
                  </div>
                  <img src={product.Image} alt={`Combo ${index + 1}`} />
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
                      <p className="discounted-price">{formatPrice(product.Price)}</p>
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

export default Combo1;
