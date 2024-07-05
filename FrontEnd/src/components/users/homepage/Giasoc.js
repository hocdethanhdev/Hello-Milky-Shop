import React, { useState, useEffect } from "react";
import "./Product1.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for prop type validation
import StarRating from "../product/ui-list-product-mom/StarRating";
import Loading from "../../layout/Loading";
import config from "../../config/config";

function Giasoc() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to specific product page
  };

  const formatPrice = (price) => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  useEffect(() => {
    fetch(
      `${config.API_ROOT}/api/v1/promotion/getCurrentProductsHavingPromotion`
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.productsWithPromotion);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error);
      });
  }, []);

  if (error) {
    return <Loading />;
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="giasoc-store">
      <h1 className="thinh-gia-soc-lam">Giá sốc hôm nay</h1>
      <div className="slider-container">
        <Slider {...settings}>
          {products.map((product, index) => (
            <div
              key={index}
              className="item item-giasoc"
              onClick={() => handleProductClick(product.ProductID)}
            >
              <div className="image_item">
                <img src={product.Image} alt={product.ProductName} />
              </div>

              <div className="price">
                <h3 className="title-giasoc">{product.ProductName}</h3>
                <div className="saoduoithinh">
                  <StarRating productId={product.ProductID} />
                </div>
                <span className="price_item price_item-Sgg">
                  {product.PriceAfterDiscounts?.toLocaleString("de-DE")}đ
                </span>
                <span className="old_price">
                  {product.Price?.toLocaleString("de-DE")}đ
                </span>
              </div>
              {product.Price !== product.PriceAfterDiscounts && (
                <span className="discount">
                  -
                  {formatPrice(
                    (product.Price - product.PriceAfterDiscounts) / 1000
                  )}
                  K
                </span>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

// Prop type validation for SampleNextArrow component
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "-100px" }}
      onClick={onClick}
    />
  );
}

SampleNextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

// Prop type validation for SamplePrevArrow component
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "-40px" }}
      onClick={onClick}
    />
  );
}

SamplePrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default Giasoc;
