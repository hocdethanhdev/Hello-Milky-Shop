import React, { useState, useEffect } from "react";
import { Modal } from "antd"; // Import Modal from Ant Design
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

  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedVoucher = {
      ...voucher,
      ...formData,
      StartDate: formData.startDate,
      ExpiryDate: formData.expiryDate,
    };
    onSave(updatedVoucher);

    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false); // Close the Ant Design modal
    onClose(); // Close your custom modal or perform any other necessary action
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
              </label>
              <button className="ant-btn ant-btn-primary" type="submit">
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Ant Design Modal */}
      <Modal
        title="Thông báo"
        visible={modalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}>
        <p>Voucher đã được cập nhật thành công!</p>
      </Modal>
    </div>
  );
};

export default EditVoucherModal;
