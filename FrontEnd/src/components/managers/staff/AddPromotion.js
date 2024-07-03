import React, { useState, useEffect } from "react";
import axios from "axios";
import { uploadImage } from "../uimg/UpImage";
import { message } from "antd";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import "./AddPromotion.css";

const AddPromotion = () => {
  const [promotionName, setPromotionName] = useState("");
  const [description, setDescription] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/product/getInfoProductsDetail"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const categories = Array.from(
    new Set(products.map((product) => product.ProductCategoryName))
  );

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) => product.ProductCategoryName === selectedCategory
      )
    : products;

  useEffect(() => {
    setSelectedProducts([]);
  }, [selectedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate promotion name
    if (promotionName.trim().length === 0) {
      message.error("Tên khuyến mãi không được để trống.");
      return;
    }

    if (promotionName.trim().length > 255) {
      message.error("Tên khuyến mãi không được quá 255 kí tự.");
      return;
    }

    // Validate discount percentage
    if (discountPercentage < 0) {
      message.error("Phần trăm khuyến mãi phải lớn hơn 0");
      return;
    }
    if (!discountPercentage) {
      message.error("Phần trăm khuyến mãi không được để trống");
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

    // Validate start and end date
    if (new Date(startDate) >= new Date(endDate)) {
      message.error("Ngày kết thúc phải sau ngày bắt đầu.");
      return;
    }

    if (!image) {
      message.error("Vui lòng thêm hình ảnh cho khuyến mãi.");
      return;
    }

    try {
      const downloadURL = await uploadImage(image);

      const promotionData = {
        promotionName,
        description,
        discountPercentage: parseInt(discountPercentage),
        startDate,
        endDate,
        image: downloadURL,
      };

      const response = await axios.post(
        "http://localhost:5000/api/v1/promotion/addPromotion",
        promotionData,
        { headers: { "Content-Type": "application/json" } }
      );

      const promotionID = response.data.PromotionID;
      await axios.post(
        "http://localhost:5000/api/v1/promotion/applyPromotionToProduct",
        {
          productIDs: selectedProducts,
          promotionID,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      message.success("Khuyến mãi mới và sản phẩm đã được thêm!");

      setPromotionName("");
      setDescription("");
      setDiscountPercentage(0);
      setStartDate("");
      setEndDate("");
      setImage(null);
      setPreviewImage(null);
      setSelectedProducts([]);
      setSelectedCategory("");
    } catch (error) {
      message.error("Đã có lỗi xảy ra khi thêm sản phẩm cho khuyến mãi.");
    }
  };

  const handleProductSelection = (productId) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.includes(productId)
        ? prevSelectedProducts.filter((id) => id !== productId)
        : [...prevSelectedProducts, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.ProductID));
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
    <div className="add-promotion-container">
      <PromotionForm
        promotionName={promotionName}
        setPromotionName={setPromotionName}
        description={description}
        setDescription={setDescription}
        discountPercentage={discountPercentage}
        setDiscountPercentage={setDiscountPercentage}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        previewImage={previewImage}
      />
      <div className="product-list-container">
        <h3>Chọn sản phẩm dành cho khuyến mãi</h3>
        <div className="filter-container-promotion">
          <label>Phân loại sữa</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Tất cả</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <ProductList
          products={filteredProducts}
          selectedProducts={selectedProducts}
          handleProductSelection={handleProductSelection}
          handleSelectAll={handleSelectAll}
        />
      </div>
    </div>
  );
};

AddPromotion.propTypes = {
  promotionName: PropTypes.string.isRequired,
  setPromotionName: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
  discountPercentage: PropTypes.number.isRequired,
  setDiscountPercentage: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  setStartDate: PropTypes.func.isRequired,
  endDate: PropTypes.string.isRequired,
  setEndDate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  previewImage: PropTypes.string,
};

const PromotionForm = ({
  promotionName,
  setPromotionName,
  description,
  setDescription,
  discountPercentage,
  setDiscountPercentage,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleSubmit,
  handleImageChange,
  previewImage,
}) => {
  return (
    <div className="promotion-form-container">
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
  );
};

PromotionForm.propTypes = {
  promotionName: PropTypes.string.isRequired,
  setPromotionName: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
  discountPercentage: PropTypes.number.isRequired,
  setDiscountPercentage: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  setStartDate: PropTypes.func.isRequired,
  endDate: PropTypes.string.isRequired,
  setEndDate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  previewImage: PropTypes.string,
};

const ProductList = ({
  products,
  selectedProducts,
  handleProductSelection,
  handleSelectAll,
}) => {
  return (
    <div className="product-list">
      <button onClick={handleSelectAll}>
        {selectedProducts.length === products.length
          ? "Bỏ chọn tất cả"
          : "Chọn tất cả"}
      </button>
      {products.map((product) => (
        <div key={product.ProductID} className="product-item">
          <input
            type="checkbox"
            checked={selectedProducts.includes(product.ProductID)}
            onChange={() => handleProductSelection(product.ProductID)}
          />
          <label>{product.ProductName}</label>
        </div>
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  selectedProducts: PropTypes.array.isRequired,
  handleProductSelection: PropTypes.func.isRequired,
  handleSelectAll: PropTypes.func.isRequired,
};

export default AddPromotion;
