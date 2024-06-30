import React, { useState, useEffect } from "react";
import axios from "axios";
import { uploadImage } from "../uimg/UpImage";
import { message } from 'antd';
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
  const [progress, setProgress] = useState(0);

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

  const categories = Array.from(new Set(products.map((product) => product.ProductCategoryName)));

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.ProductCategoryName === selectedCategory)
    : products;

  useEffect(() => {
    setSelectedProducts([]);
  }, [selectedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      message.error("Please select an image.");
      return;
    }

    try {
      const downloadURL = await uploadImage(image, setProgress);

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

      message.success("New Promotion and products added!");

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
      console.error("Error adding promotion:", error);
      message.error("Error adding promotion: " + error.message);
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
        <h3>Select Products for Promotion</h3>
        <div className="filter-container-promotion">
          <label>Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
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
      <h2>Add Promotion</h2>
      <form onSubmit={handleSubmit}>
        <div className="promo-form">
          <div className="promo-half">
            <div>
              <label>Promotion Name:</label>
              <input
                type="text"
                value={promotionName}
                onChange={(e) => setPromotionName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Discount Percentage:</label>
              <input
                type="number"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="promo-half">
            <div>
              <label>Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label>End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {previewImage && (
                <div className="form-group">
                  <img src={previewImage} alt="Preview" className="preview-image" />
                </div>
              )}
            </div>
            <button type="submit">Add Promotion</button>
          </div>
        </div>
      </form>
    </div>
  );
};

const ProductList = ({ products, selectedProducts, handleProductSelection, handleSelectAll }) => {
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
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
                  className={selectedProducts.includes(product.ProductID) ? "selected" : ""}
                />
                <div>
                  <p>{product.ProductName}</p>
                  <p>{formatPrice(product.Price)}</p>
                  <p><strong>Kho:</strong> {product.StockQuantity}</p>
                  <p><strong>HSD:</strong> {new Date(product.ExpirationDate).toLocaleDateString()}</p>
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
