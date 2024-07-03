import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { message } from "antd";
import "./EditVoucherModal.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatPrice } from "../../utils/formatPrice";

message.config({
  placement: 'top',
  top: 10,
  duration: 3,
});

const EditVoucherModal = ({ voucher, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    voucherName: "",
    quantity: 0,
    discountPercentage: 0,
    minDiscount: 0,
    maxDiscount: 0,
    startDate: "",
    expiryDate: "",
  });

  useEffect(() => {
    if (voucher) {
      setFormData({
        voucherName: voucher.VoucherName,
        quantity: voucher.Quantity,
        discountPercentage: voucher.DiscountPercentage,
        minDiscount: formatPrice(voucher.MinDiscount.toString()),
        maxDiscount: formatPrice(voucher.MaxDiscount.toString()),
        startDate: new Date(voucher.StartDate).toISOString().split("T")[0],
        expiryDate: new Date(voucher.ExpiryDate).toISOString().split("T")[0],
      });
    }
  }, [voucher]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleDateChange = (date, fieldName) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.voucherName) {
      message.warning("Tên voucher không được bỏ trống.");
      return;
    }
    if (formData.voucherName.length > 30) {
      message.warning("Tên voucher không được quá 30 kí tự.");
      return;
    }
    if (formData.minDiscount === null || formData.minDiscount === "") {
      message.warning("Giảm tối thiểu không được bỏ trống.");
      return;
    }
    if (formData.minDiscount < 0) {
      message.warning("Giảm tối thiểu không được nhỏ hơn 0.");
      return;
    }
    if (formData.quantity === null || formData.quantity === "") {
      message.warning("Số lượng không được bỏ trống.");
      return;
    }
    if (formData.quantity < 0) {
      message.warning("Số lượng không được nhỏ hơn 0.");
      return;
    }
    if (formData.maxDiscount === null || formData.maxDiscount === "") {
      message.warning("Giảm tối đa không được bỏ trống.");
      return;
    }
    if (formData.maxDiscount < 0) {
      message.warning("Giảm tối đa không được nhỏ hơn 0.");
      return;
    }
    if (!formData.startDate) {
      message.warning("Ngày bắt đầu không được bỏ trống.");
      return;
    }
    if (!formData.expiryDate) {
      message.warning("Ngày hết hạn không được bỏ trống.");
      return;
    }
    if (new Date(formData.expiryDate) < new Date(formData.startDate)) {
      message.warning("Ngày hết hạn phải sau ngày bắt đầu.");
      return;
    }
    if (formData.discountPercentage === null || formData.discountPercentage === "") {
      message.warning("Phần trăm giảm giá không được bỏ trống.");
      return;
    }
    if (formData.discountPercentage < 0) {
      message.warning("Phần trăm giảm giá không được nhỏ hơn 0.");
      return;
    }
    const minDiscountNumber = parseFloat(formData.minDiscount.replace(/\./g, ''));
    const maxDiscountNumber = parseFloat(formData.maxDiscount.replace(/\./g, ''));

    if (isNaN(minDiscountNumber) || isNaN(maxDiscountNumber)) {
      message.warning("Giảm tối thiểu và Giảm tối đa phải là số hợp lệ.");
      return;
    }

    const updatedVoucher = {
      ...voucher,
      ...formData,
      minDiscount: minDiscountNumber,
      maxDiscount: maxDiscountNumber,
      StartDate: formData.startDate,
      ExpiryDate: formData.expiryDate,
    };
    onSave(updatedVoucher);
    onClose(); // Close the modal after saving
  };

  return (
    <div>
      {/* Your custom modal content */}
      <div className="modal-thinhprostedit3">
        <div className="modal-content-thinhprostedit3">
          <span className="close-thinhprostedit3" onClick={onClose}>
            &times;
          </span>
          <form onSubmit={handleSubmit}>
            <div className="half-width">
              <label>
                Tên voucher:
                <input
                  type="text"
                  name="voucherName"
                  value={formData.voucherName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Số lượng:
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </label>
              <label >
            Ngày bắt đầu:
            <DatePicker
              selected={
                formData.startDate
                  ? new Date(formData.startDate)
                  : null
              }
              onChange={(date) => handleDateChange(date, "startDate")}
              dateFormat="dd/MM/yyyy"
            />
            {message.startDate && (
              <p className="error-message">{message.startDate}</p>
            )}
          </label>
              <label>
                Phần trăm giảm giá:
                <input
                  type="number"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="half-width">
              <label>
                Giảm tối thiểu:
                <input
                  type="text"
                  name="minDiscount"
                  value={formData.minDiscount}
                  onChange={handleChange}
                />
              </label>
              <label>
                Giảm tối đa:
                <input
                  type="text"
                  name="maxDiscount"
                  value={formData.maxDiscount}
                  onChange={handleChange}
                />
              </label>
              <label>
            Ngày kết thúc:
            <DatePicker
              selected={
                formData.expiryDate
                  ? new Date(formData.expiryDate)
                  : null
              }
              onChange={(date) => handleDateChange(date, "expiryDate")}
              dateFormat="dd/MM/yyyy"
            />
            {message.expiryDate && (
              <p className="error-message">{message.expiryDate}</p>
            )}
          </label>
              <button className="ant-btn ant-btn-primary nutlong-voucher" type="submit">
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

EditVoucherModal.propTypes = {
  voucher: PropTypes.object, // Validate that voucher is an object
  onClose: PropTypes.func.isRequired, // Validate onClose is a function and required
  onSave: PropTypes.func.isRequired, // Validate onSave is a function and required
};

export default EditVoucherModal;
