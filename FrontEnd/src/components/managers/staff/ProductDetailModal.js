import React from "react";
import PropTypes from "prop-types";
import "./ProductDetailModal.css";

const formatPrice = (price) => {
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay-thinhprost">
      <div className="modal-content-thinhprost">
        <div className="modal-content-scrollable-thinhh">
          <span className="close-button-thinhprost" onClick={onClose}>
            &times;
          </span>
          <h2>Thông tin sản phẩm</h2>
          <div className="modal-thinh-anh-thinhprost">
            <img
              src={product.Image}
              alt={product.ProductName}
              style={{ maxWidth: "100%" }}
            />
          </div>
          <div>
            <p>
              <strong>Mã:</strong> {product.ProductID}
            </p>
            <p>
              <strong>Tên:</strong> {product.ProductName}
            </p>
            <p>
              <strong>Mô tả:</strong>{" "}
              <div
                dangerouslySetInnerHTML={{
                  __html: product.Description.substring(0, 10000),
                }}
              />
            </p>
            <p>
              <strong>Giá:</strong> {formatPrice(product.Price)}
            </p>
            <p>
              <strong>Số lượng:</strong> {product.StockQuantity}
            </p>
            <p>
              <strong>HSD:</strong>{" "}
              {new Date(product.ExpirationDate).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            <p>
              <strong>NSX:</strong>{" "}
              {new Date(product.ManufacturingDate).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            <p>
              <strong>Hãng:</strong> {product.BrandName}
            </p>
            <p>
              <strong>Loại:</strong> {product.ProductCategoryName}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {product.Status === null || product.Status === false
                ? "Tạm ẩn"
                : product.Status === true && parseInt(product.StockQuantity) > 0
                ? "Còn hàng"
                : "Hết hàng"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetailModal.propTypes = {
  product: PropTypes.shape({
    ProductID: PropTypes.number.isRequired,
    ProductName: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Price: PropTypes.number.isRequired,
    StockQuantity: PropTypes.number.isRequired,
    ExpirationDate: PropTypes.string.isRequired,
    ManufacturingDate: PropTypes.string.isRequired,
    BrandName: PropTypes.string.isRequired,
    ProductCategoryName: PropTypes.string.isRequired,
    Status: PropTypes.bool.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default ProductDetailModal;
