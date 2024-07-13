import React, { useState, useEffect, useRef } from "react";
import "./ProductContentMom.css";
import CartPopup from "./CartPopup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserIdFromToken } from "../../../store/actions/authAction";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Loading from "../../../layout/Loading";
import PropTypes from "prop-types";
import config from "../../../config/config";
import { useTranslation } from 'react-i18next';

const formatPrice = (price) =>
  `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
const calculateDiscount = (originalPrice, discountedPrice) =>
  originalPrice === discountedPrice ? 0 : originalPrice - discountedPrice;
const formatDiscount = (discount) => `-${Math.round(discount / 1000)}K`;

const ProductContentMom = ({ product }) => {
  const { token, isLoggedIn } = useSelector((state) => state.auth);
  const userId = getUserIdFromToken(token);
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [ratingData, setRatingData] = useState({ avg: 0, count: 0 });
  const navigate = useNavigate();
  const incrementRef = useRef(null);
  const decrementRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchRatingData = async () => {
      try {
        const response = await axios.get(
          `${config.API_ROOT}/api/v1/comment/countRatingAndAvgRating/${product.ProductID}`
        );
        setRatingData({
          avg: parseFloat(response.data.avg.toFixed(1)),
          count: response.data.count,
        });
      } catch (error) {
        console.error("Error fetching rating data:", error);
      }
    };

    if (product.ProductID) {
      fetchRatingData();
    }
  }, [product.ProductID]);

  const openCartPopup = () => setIsCartPopupOpen(true);
  const closeCartPopup = () => setIsCartPopupOpen(false);

  const handleAddToCart = async () => {
    try {
      await axios.post(`${config.API_ROOT}/api/v1/order/addProductToOrder`, {
        userID: userId,
        productID: product.ProductID,
        quantity: quantity,
        price: product.PriceAfterDiscounts,
      });
      // Lưu productID vào Local Storage
      localStorage.setItem("selectedProductID", product.ProductID);
      setQuantity(1);
      openCartPopup();
    } catch (error) {
      console.error("Error adding product to order:", error);
    }
  };

  const handleBuyNow = async () => {
    try {
      await axios.post(`${config.API_ROOT}/api/v1/order/addProductToOrder`, {
        userID: userId,
        productID: product.ProductID,
        quantity: quantity,
        price: product.PriceAfterDiscounts,
      });
      // Lưu productID vào Local Storage
      localStorage.setItem("selectedProductID", product.ProductID);
      navigate("/ShoppingCart");
    } catch (error) {
      console.error("Error adding product to order:", error);
    }
  };

  const startIncrement = () => {
    stopIncrement();
    incrementRef.current = setInterval(() => {
      setQuantity((prevQuantity) =>
        Math.min(prevQuantity + 1, product.StockQuantity)
      );
    }, 100);
  };

  const increseOne = () => {
    setQuantity((prevQuantity) =>
      Math.min(prevQuantity + 1, product.StockQuantity)
    );
  };

  const stopIncrement = () => {
    clearInterval(incrementRef.current);
  };

  const startDecrement = () => {
    stopDecrement();
    decrementRef.current = setInterval(() => {
      setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
    }, 100);
  };

  const decreseOne = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const stopDecrement = () => {
    clearInterval(decrementRef.current);
  };

  if (!product) {
    return <Loading />;
  }

  const discountAmount = calculateDiscount(
    product.Price,
    product.PriceAfterDiscounts
  );

  const renderStars = (avgRating) => {
    const filledStars = Math.floor(avgRating);
    const hasHalfStar = avgRating - filledStars >= 0.5;
    return (
      <div className="stars">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="star">
            {index < filledStars ? (
              <AiFillStar style={{ color: "orange" }} />
            ) : index === filledStars && hasHalfStar ? (
              <AiFillStar style={{ color: "orange" }} />
            ) : (
              <AiOutlineStar style={{ color: "orange" }} />
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="product_content1 width-common">
      <div className="wrap">
        <div className="background_black"></div>
        <div className="main_content width-common">
          <div className="img_detail">
            <div id="java_zoom_"></div>
            <div id="showImg">
              <div className="img_zoom" id="img_1">
                <img
                  id="zoom_03"
                  src={product.Image}
                  alt={product.ProductName}
                />
                {discountAmount > 0 && (
                  <div className="discount-badge-thinh">
                    {formatDiscount(discountAmount)}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="detail_right">
            <h1>{product.ProductName}</h1>
            <div className="pro_detail_brand">
              <p className="thuong-hieu-san-pham">
              {t('trademark')}:{" "}
                <span className="thuong-hieu-san-pham-api">
                  {product.BrandName}
                </span>
              </p>
              <p>
              {t('productCode')}: <span id="barcodeMain">{product.ProductID}</span>
              </p>
            </div>
            <br />
            <div className="sao-thinh-content">
              {renderStars(ratingData.avg)}
              <span className="rating-count">
                {" "}
                | {ratingData.count} {t('rate')}
              </span>
            </div>
            <div className="pro_info">
              <div className="box_info">
                <div className="clear"></div>
              </div>
              <div id="divPrice" className="box_info box_price">
                <span className="box_info_txt right">{t('price')}:</span>
                <span className="pro_price right">
                  <span className="price_show price_item">
                    {formatPrice(product.PriceAfterDiscounts)}₫
                  </span>
                  {product.Price !== product.PriceAfterDiscounts && (
                    <span className="old_price">
                      {formatPrice(product.Price)}₫
                    </span>
                  )}
                </span>
                <div className="clear"></div>
              </div>

              {isLoggedIn ? (
                product.StockQuantity > 0 ? (
                  <>
                    <div className="box_info box_status">
                      <span className="box_info_txt left">{t('storage')}: </span>
                      <span className="pro_status left">
                        {product.StockQuantity}
                      </span>
                      <div className="clear"></div>
                    </div>
                    { }
                    <div className="quantity-selector-thinh-cart">
                      <p>{t('quantity')}: </p>
                      <button
                        className="quantity-button-thinh-cart"
                        onMouseDown={startDecrement}
                        onMouseUp={stopDecrement}
                        onClick={decreseOne}
                        onMouseLeave={stopDecrement}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        readOnly
                        className="quantity-input-thinh-cart"
                      />
                      <button
                        className="quantity-button-thinh-cart"
                        onMouseDown={startIncrement}
                        onClick={increseOne}
                        onMouseUp={stopIncrement}
                        onMouseLeave={stopIncrement}
                      >
                        +
                      </button>
                    </div>
                    <div className="box_btn">
                      <button className="btn_order_now" onClick={handleBuyNow}>
                      {t('buyNow')}
                      </button>
                      <button
                        className="btn_add_cart"
                        onClick={handleAddToCart}
                      >
                        {t('addToCart')}
                      </button>
                      <div className="clear"></div>
                    </div>
                  </>
                ) : (
                  <div className="out-of-stock-message-thinh">{t('temporarilyOutOfStock')}</div>
                )
              ) : (
                <Link to="/login">{t('loginToPurchase')}</Link>
              )}
            </div>
          </div>
          <div className="cuc_icon left row">
            <div className="cuc_icon_item left col-md-5 row">
              <span className="hinh_icon icon fas fa-shipping-fast col-md-4"></span>
              <span className="icon_title col-md-8">
                <div>{t('delivery')}</div>
                <div>{t('nationwide')}</div>
              </span>
            </div>
            <div className="cuc_icon_item left col-md-5">
              <span className="hinh_icon icon far fa-check-circle col-md-4"></span>
              <span className="icon_title col-md-8">
                <div>{t('guaranteed')}</div>
                <div>{t('goodsGenuine')}</div>
              </span>
            </div>
          </div>
          <div className="box_phone">
          {t('purchasingSwitchboard')}{" "}
            <Link to="tel:0852793879 - Zalo:0393892623" className="hot_phone">
              0852793879 - Zalo:0393892623
            </Link>{ "  " }
            ({t('from800amTo930PMDaily')} )
          </div>
          <div className="box_banner"></div>
        </div>
        <div className="clear"></div>
      </div>
      <CartPopup
        isOpen={isCartPopupOpen}
        onClose={closeCartPopup}
        product={product}
        quantity={quantity}
      />
    </section>
  );
};

// Define prop types
ProductContentMom.propTypes = {
  product: PropTypes.shape({
    ProductID: PropTypes.string.isRequired,
    StockQuantity: PropTypes.number.isRequired,
    Image: PropTypes.string.isRequired,
    ProductName: PropTypes.string.isRequired,
    BrandName: PropTypes.string.isRequired,
    Price: PropTypes.number.isRequired,
    PriceAfterDiscounts: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductContentMom;
