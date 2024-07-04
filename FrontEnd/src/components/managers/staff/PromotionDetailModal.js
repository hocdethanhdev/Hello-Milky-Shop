import React from "react";
import PropTypes from "prop-types";
import "./PromotionDetailModal.css";

const PromotionDetailModal = ({ promotion, onClose }) => {
  if (!promotion) return null;

  return (
    <div className="modal-overlay-thinhprost">
      <div className="modal-content-thinhprost">
        <div className="modal-content-scrollable-thinhh">
          <span className="close-button-thinhprost" onClick={onClose}>
            &times;
          </span>
          <h2>Thông tin khuyến mãi</h2>
          <div>
            <div>
              <p>
                <img
                  src={promotion.Image}
                  style={{ maxWidth: "50%", marginLeft: "150px" }}
                />
              </p>
              <p>
                <strong>Tên khuyến mãi: </strong>
                {promotion.PromotionName}
              </p>

              <p>
                <strong>Mô tả: </strong>
                {promotion.Description}
              </p>

              <p>
                <strong>Giảm giá: </strong>
                {promotion.DiscountPercentage}%
              </p>

              <p>
                <strong>Bắt đầu: </strong>
                {new Date(promotion.StartDate).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>

              <p>
                <strong>Kết thúc: </strong>
                {new Date(promotion.EndDate).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PromotionDetailModal.propTypes = {
  promotion: PropTypes.shape({
    PromotionName: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    DiscountPercentage: PropTypes.number.isRequired,
    StartDate: PropTypes.string.isRequired,
    EndDate: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default PromotionDetailModal;
