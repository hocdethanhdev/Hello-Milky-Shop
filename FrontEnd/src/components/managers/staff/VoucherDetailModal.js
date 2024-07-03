import React from "react";
import PropTypes from "prop-types";
import "./VoucherDetailModal.css";

const formatPrice = (price) => {
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

const VoucherDetailModal = ({ voucher, onClose }) => {
  if (!voucher) return null;

  return (
    <div className="modal-overlay-thinhprost">
      <div className="modal-content-triprost">
        <span className="close-button-triprost" onClick={onClose}>
          &times;
        </span>
        <h2>Thông tin voucher</h2>

        <table className="voucher-table">
          <tbody>
            <tr>
              <td>
                <strong>Tên voucher:</strong>
              </td>
              <td>{voucher.VoucherName}</td>
            </tr>
            <tr>
              <td>
                <strong>Số lượng:</strong>
              </td>
              <td>{voucher.Quantity}</td>
            </tr>
            <tr>
              <td>
                <strong>Phần trăm giảm giá:</strong>
              </td>
              <td>{voucher.DiscountPercentage}%</td>
            </tr>
            <tr>
              <td>
                <strong>Tối thiểu:</strong>
              </td>
              <td>{formatPrice(voucher.MinDiscount)}</td>
            </tr>
            <tr>
              <td>
                <strong>Tối đa:</strong>
              </td>
              <td>{formatPrice(voucher.MaxDiscount)}</td>
            </tr>
            <tr>
              <td>
                <strong>Ngày bắt đầu:</strong>
              </td>
              <td>
                {new Date(voucher.StartDate).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Ngày kết thúc:</strong>
              </td>
              <td>
                {new Date(voucher.ExpiryDate).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Trạng thái:</strong>
              </td>
              <td>{voucher.Status ? "Active" : "Inactive"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

VoucherDetailModal.propTypes = {
  voucher: PropTypes.shape({
    VoucherName: PropTypes.string.isRequired,
    Quantity: PropTypes.number.isRequired,
    DiscountPercentage: PropTypes.number.isRequired,
    MinDiscount: PropTypes.number.isRequired,
    MaxDiscount: PropTypes.number.isRequired,
    StartDate: PropTypes.instanceOf(Date).isRequired,
    ExpiryDate: PropTypes.instanceOf(Date).isRequired,
    Status: PropTypes.bool.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default VoucherDetailModal;
