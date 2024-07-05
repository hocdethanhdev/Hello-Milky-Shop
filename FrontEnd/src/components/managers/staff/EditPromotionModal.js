import React, { useState, useEffect } from "react";
import { Modal, Button, message } from "antd";
import ProductSelectionModal from "./ProductSelectionModal ";
import { uploadImage } from "../uimg/UpImage";
import moment from "moment";
import "./EditPromotionModal.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditPromotionModal = ({ promotion, onClose, onSave }) => {
  const [promotionName, setPromotionName] = useState(promotion.PromotionName);
  const [description, setDescription] = useState(promotion.Description);
  const [discountPercentage, setDiscountPercentage] = useState(
    promotion.DiscountPercentage
  );
  const [startDate, setStartDate] = useState(
    promotion.StartDate ? new Date(promotion.StartDate) : null
  );
  const [endDate, setEndDate] = useState(
    promotion.EndDate ? new Date(promotion.EndDate) : null
  );
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(promotion.Image || null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productSelectionVisible, setProductSelectionVisible] = useState(false);

  useEffect(() => {
    setSelectedProducts([]);
  }, [promotion]);


  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

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

    if (discountPercentage > 100) {
      message.error("Phần trăm khuyến mãi không được lớn hơn 100");
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
        promotionName,
        description,
        discountPercentage: parseInt(discountPercentage),
        startDate: moment(startDate).format("YYYY-MM-DD"),
        endDate: moment(endDate).format("YYYY-MM-DD"),
        image: downloadURL,
      };

      await onSave(updatedPromotion, selectedProducts);
      message.success("Đã cập nhật thành công");
      onClose();
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
      open={true}
      title="Chỉnh sửa khuyến mãi"
      onCancel={onClose}
      onOk={handleSubmit}
      width={800}
      footer={null}>
      <div className="edit-promotion-form-container">
        <form onSubmit={handleSubmit}>
          <div className="promo-form">
            <div className="promo-half1">
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
              <Button className='nut-chon-sp-thinh-promo' type="primary" onClick={() => setProductSelectionVisible(true)}>
                Chọn sản phẩm áp dụng khuyến mãi
              </Button>
            </div>
            <div className="promo-half1">
              <div>
                <label>Ngày bắt đầu:</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div>
                <label>Ngày kết thúc:</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="dd/MM/yyyy"
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
              <button className="longdanglam" type="submit">Lưu</button>

            </div>
          </div>
        </form>
      </div>

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

export default EditPromotionModal;
