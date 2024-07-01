import React, { useState, useEffect } from "react";
import "./EditVoucherModal.css";

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

  const [errors, setErrors] = useState({
    voucherName: "",
    quantity: "",
    discountPercentage: "",
    minDiscount: "",
    maxDiscount: "",
    startDate: "",
    expiryDate: "",
  });

  useEffect(() => {
    if (voucher) {
      setFormData({
        voucherName: voucher.VoucherName,
        quantity: voucher.Quantity,
        discountPercentage: voucher.DiscountPercentage,
        minDiscount: voucher.MinDiscount,
        maxDiscount: voucher.MaxDiscount,
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

  const checkValidation = () => {
    let valid = true;
    const newErrors = {
      voucherName: "",
      quantity: "",
      discountPercentage: "",
      minDiscount: "",
      maxDiscount: "",
      startDate: "",
      expiryDate: "",
    };

    if (!formData.voucherName) {
      newErrors.voucherName = "Tên voucher không được bỏ trống.";
      valid = false;
    } else if (formData.voucherName.length > 30) {
      newErrors.voucherName = "Tên voucher không được quá 30 kí tự.";
      valid = false;
    }

    if (!formData.quantity) {
      newErrors.quantity = "Số lượng không được bỏ trống.";
      valid = false;
    } else if (formData.quantity < 0) {
      newErrors.quantity = "Số lượng không được nhỏ hơn 0.";
      valid = false;
    }

    if (!formData.discountPercentage) {
      newErrors.discountPercentage = "Phần trăm giảm giá không được bỏ trống.";
      valid = false;
    } else if (formData.discountPercentage < 0) {
      newErrors.discountPercentage = "Phần trăm giảm giá không được nhỏ hơn 0.";
      valid = false;
    }

    if (!formData.minDiscount) {
      newErrors.minDiscount = "Giảm tối thiểu không được bỏ trống.";
      valid = false;
    } else if (formData.minDiscount < 0) {
      newErrors.minDiscount = "Giảm tối thiểu không được nhỏ hơn 0.";
      valid = false;
    }

    if (!formData.maxDiscount) {
      newErrors.maxDiscount = "Giảm tối đa không được bỏ trống.";
      valid = false;
    } else if (formData.maxDiscount < 0) {
      newErrors.maxDiscount = "Giảm tối đa không được nhỏ hơn 0.";
      valid = false;
    }

    if (!formData.startDate) {
      newErrors.startDate = "Ngày bắt đầu không được bỏ trống.";
      valid = false;
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = "Ngày hết hạn không được bỏ trống.";
      valid = false;
    } else if (new Date(formData.expiryDate) <= new Date(formData.startDate)) {
      newErrors.expiryDate = "Ngày hết hạn phải sau ngày bắt đầu.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkValidation()) {
      return;
    }

    const updatedVoucher = {
      ...voucher,
      ...formData,
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
                  required
                />
                {errors.voucherName && (
                  <p className="error-message">{errors.voucherName}</p>
                )}
              </label>
              <label>
                Số lượng:
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
                {errors.quantity && (
                  <p className="error-message">{errors.quantity}</p>
                )}
              </label>
              <label>
                Ngày bắt đầu:
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
                {errors.startDate && (
                  <p className="error-message">{errors.startDate}</p>
                )}
              </label>
              <label>
                Phần trăm giảm giá:
                <input
                  type="number"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  required
                />
                {errors.discountPercentage && (
                  <p className="error-message">{errors.discountPercentage}</p>
                )}
              </label>
            </div>
            <div className="half-width">
              <label>
                Giảm tối thiểu:
                <input
                  type="number"
                  name="minDiscount"
                  value={formData.minDiscount}
                  onChange={handleChange}
                  required
                />
                {errors.minDiscount && (
                  <p className="error-message">{errors.minDiscount}</p>
                )}
              </label>
              <label>
                Giảm tối đa:
                <input
                  type="number"
                  name="maxDiscount"
                  value={formData.maxDiscount}
                  onChange={handleChange}
                  required
                />
                {errors.maxDiscount && (
                  <p className="error-message">{errors.maxDiscount}</p>
                )}
              </label>
              <label>
                Ngày hết hạn:
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                />
                {errors.expiryDate && (
                  <p className="error-message">{errors.expiryDate}</p>
                )}
              </label>
              <button className="ant-btn ant-btn-primary" type="submit">
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditVoucherModal;
