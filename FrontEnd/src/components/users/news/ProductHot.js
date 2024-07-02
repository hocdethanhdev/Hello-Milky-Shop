import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductHot.css';
import { useNavigate } from 'react-router-dom';
import Loading from '../../layout/Loading';

// Formatting functions
const formatPrice = (price) => {
  if (price == null) return '';
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

const calculateDiscount = (originalPrice, discountedPrice) => {
  if (originalPrice == null || discountedPrice == null || originalPrice === discountedPrice) {
    return 0;
  }
  return originalPrice - discountedPrice;
};

const formatDiscount = (discount) => {
  if (discount <= 0) return '';
  return `-${Math.round(discount / 1000)}K`;
};

function ProductHot() {
  const [hotProducts, setHotProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/product/getTop5ProductBestSellerForUser');

        if (response.data && response.data.err === 0) {
          setHotProducts(response.data.data);
        } else {
          console.error('Unexpected response data format:', response.data);
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchHotProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  if (loading) return <Loading/>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="sidebar-producthot">
      <h3>DÀNH CHO BẠN HÔM NAY</h3>
      {hotProducts.map((product) => {
        const discountAmount = calculateDiscount(product.Price, product.PriceAfterDiscounts);
        let isDiscounted = product.Price !== product.PriceAfterDiscounts;
        return (
          <div key={product.ProductID} className="recommended-article" onClick={() => handleProductClick(product.ProductID)}>
            <img src={product.Image} alt={product.ProductName} className="recommended-image" />
            {isDiscounted ? (<div className="discount-badge">
              {formatDiscount(discountAmount)}
            </div>) : (<></>)}
            <div className="recommended-content">
              <p className="recommended-title">{product.ProductName}</p>
              <div className="recommended-pricing">
                {isDiscounted ? (
                  <>
                    <span className="discount-price">{formatPrice(product.PriceAfterDiscounts)}₫</span>
                    <span className="original-price">{formatPrice(product.Price)}₫</span>

                  </>
                ) : (
                  <span className="discount-price">{formatPrice(product.Price)}₫</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductHot;
