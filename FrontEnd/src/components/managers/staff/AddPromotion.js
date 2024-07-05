import React, { useState, useEffect } from "react";
import axios from "axios";
import { uploadImage } from "../uimg/UpImage";
import { message } from "antd";
import "./AddPromotion.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import config from "../../config/config";

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
          `${config.API_ROOT}/api/v1/product/getInfoProductsDetail`
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
        startDate: startDate.toLocaleDateString("vi-VN"),
        endDate: endDate.toLocaleDateString("vi-VN"),
        image: downloadURL,
      };

      const response = await axios.post(
        `${config.API_ROOT}/api/v1/promotion/addPromotion`,
        promotionData,
        { headers: { "Content-Type": "application/json" } }
      );

      const promotionID = response.data.PromotionID;
      await axios.post(
        `${config.API_ROOT}/api/v1/promotion/applyPromotionToProduct`,
        {
          productIDs: selectedProducts,
          promotionID,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      message.success("New Promotion and products added!");

      setPromotionName("");
      setDescription("");
      setDiscountPercentage(0);
      setStartDate(null);
      setEndDate(null);
      setImage(null);
      setPreviewImage(null);
      setSelectedProducts([]);
      setSelectedCategory("");
    } catch (error) {
      message.error("Vui lòng thêm sản phẩm cho khuyến mãi");
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
            onChange={(e) => setSelectedCategory(e.target.value)}>
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
          <div className="promo-half2">
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
          <div className="promo-half2">
            <div >
              <label>Ngày bắt đầu:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="form-control"
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yyyy"
              />
            </div>
            <div >
              <label>Ngày kết thúc:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="form-control"
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yyyy"
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
            <button className="longlamluu" type="submit">Lưu</button>
          </div>
        </div>
      </form>
    </div>
  );
};

const ProductList = ({
  products,
  selectedProducts,
  handleProductSelection,
  handleSelectAll,
}) => {
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div className="product-list-container-tri">
      <div className="select-all-container-tri">
        <label>Chọn tất cả</label>
        <input
          type="checkbox"
          checked={selectedProducts.length === products.length}
          onChange={handleSelectAll}
        />
      </div>
      <div className="product-list-promotion">
        {products.map((product) => (
          <div key={product.ProductID} className="product-item-promotion-nhan">
            <label className="product-clickable">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.ProductID)}
                onChange={() => handleProductSelection(product.ProductID)}
              />
              <div className="product-details">
                <img
                  src={product.Image}
                  alt={product.ProductName}
                  className={
                    selectedProducts.includes(product.ProductID)
                      ? "selected"
                      : ""
                  }
                />
                <div>
                  <p>{product.ProductName}</p>
                  <p>{formatPrice(product.Price)}</p>
                  <p>
                    <strong>Kho:</strong> {product.StockQuantity}
                  </p>
                  <p>
                    <strong>HSD:</strong>{" "}
                    {new Date(product.ExpirationDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddPromotion;
