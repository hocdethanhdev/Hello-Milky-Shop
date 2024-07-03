import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Modal, Button, message } from "antd";
import ProductSelectionModal from "./ProductSelectionModal ";
import { uploadImage } from "../uimg/UpImage";
import moment from "moment";
import "./EditPromotionModal.css";

const EditPromotionModal = ({ promotion, onClose, onSave }) => {
  const [promotionName, setPromotionName] = useState(promotion.PromotionName);
  const [description, setDescription] = useState(promotion.Description);
  const [discountPercentage, setDiscountPercentage] = useState(
    promotion.DiscountPercentage
  );
  const [startDate, setStartDate] = useState(
    moment(promotion.StartDate).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(promotion.EndDate).format("YYYY-MM-DD")
  );
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(promotion.Image || null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productSelectionVisible, setProductSelectionVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (promotionName.trim().length > 255) {
      message.error("Tên khuyến mãi không quá 255 kí tự.");
      return;
    }
    if (promotionName.trim().length === 0) {
      message.error("Tên khuyến mãi không được để trống");
      return;
    }

    if (!discountPercentage) {
      message.error("Phần trăm khuyến mãi không được để trống");
      return;
    }

    if (discountPercentage < 0) {
      message.error("Phần trăm khuyến mãi phải lớn hơn 0");
      return;
    }
    if (description.trim().length === 0) {
      message.error("Mô tả không được để trống.");
      return;
    }
    if (!startDate) {
      message.error("Vui lòng chọn ngày bắt đầu.");
      return;
    }

    if (!endDate) {
      message.error("Vui lòng chọn ngày kết thúc.");
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      message.error("Ngày kết thúc phải sau ngày bắt đầu.");
      return;
    }

    if (!image && !previewImage) {
      message.error("Vui lòng thêm hình ảnh cho khuyến mãi.");
      return;
    }

    try {
      const downloadURL = image
        ? await uploadImage(image)
        : previewImage;

      const updatedPromotion = {
        PromotionID: promotion.PromotionID,
        PromotionName: promotionName,
        Description: description,
        DiscountPercentage: parseInt(discountPercentage),
        StartDate: startDate,
        EndDate: endDate,
        Image: downloadURL,
      };

      onSave(updatedPromotion, selectedProducts);
      message.success("Đã cập nhật thành công");
    } catch (error) {
      message.error("Error saving promotion.");
    }
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <Modal
      visible
      title="Edit Promotion"
      onCancel={onClose}
      onOk={handleSubmit}
      width={800}
      footer={null}
    >
      <div className="edit-promotion-form-container">
        <form onSubmit={handleSubmit}>
          <div className="promo-form">
            <div className="promo-half">
              <div>
                <label>Tên khuyến mãi:</label>
                <input
                  type="text"
                  value={promotionName}
                  onChange={(e) => setPromotionName(e.target.value)}
                />
              </div>
              <div>
                <label>Phần trăm khuyến mãi:</label>
                <input
                  type="number"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                />
              </div>
              <div>
                <label>Mô tả:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="promo-half">
              <div>
                <label>Ngày bắt đầu:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label>Ngày kết thúc:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div>
                <label>Hình ảnh:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {previewImage && (
                  <div className="form-group">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="preview-image-promotion"
                    />
                  </div>
                )}
              </div>
              <button type="submit">Lưu</button>
            </div>
          </div>
        </form>
      </div>
      <Button type="primary" onClick={() => setProductSelectionVisible(true)}>
        Chọn sản phẩm áp dụng khuyến mãi
      </Button>
      {productSelectionVisible && (
        <ProductSelectionModal
          promotionID={promotion.PromotionID}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          onClose={() => setProductSelectionVisible(false)}
        />
      )}
    </Modal>
  );
};

// Define prop types for promotion, onClose, and onSave
EditPromotionModal.propTypes = {
  promotion: PropTypes.shape({
    PromotionID: PropTypes.number.isRequired,
    PromotionName: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    DiscountPercentage: PropTypes.number.isRequired,
    StartDate: PropTypes.string.isRequired,
    EndDate: PropTypes.string.isRequired,
    Image: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditPromotionModal;
