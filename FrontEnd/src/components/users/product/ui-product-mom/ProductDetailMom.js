import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./ProductDetailMom.css";
import { useTranslation } from 'react-i18next';

const ProductDetail = ({ product }) => {
  const { t } = useTranslation();
  return (
    <div>
      <section className="product_detail-all-thinh width-common">
        <h2>{t('describe')} {product.ProductName}</h2>
        <div className="wrap">
          <div
            dangerouslySetInnerHTML={{
              __html: product.Description.substring(0, 20000),
            }}
          />
        </div>
      </section>
    </div>
  );
};

// Define prop types
ProductDetail.propTypes = {
  product: PropTypes.shape({
    ProductName: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductDetail;
