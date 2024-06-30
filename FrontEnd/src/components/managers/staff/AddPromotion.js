import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddPromotion.css";

function AddPromotion({ onAddPromotion }) {
  const [promotionName, setPromotionName] = useState("");
  const [description, setDescription] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState(null);

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
    setSelectedProducts([]); // Reset selectedProducts when selectedCategory changes
  }, [selectedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("promotionName", promotionName);
    formData.append("description", description);
    formData.append("discountPercentage", discountPercentage);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("products", JSON.stringify(selectedProducts));
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/promotion/addPromotion",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("New Promotion added:", response.data);
      onAddPromotion(response.data); // Notify parent component of new promotion
    } catch (error) {
      console.error("Error adding promotion:", error);
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
      setSelectedProducts([]); // Reset if all are already selected
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.ProductID));
    }
  };

  const toggleProductSelection = (productId) => {
    handleProductSelection(productId);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
          toggleProductSelection={toggleProductSelection}
        />
      </div>
    </div>
  );
}

function PromotionForm({
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
}) {
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
            <div>
              <label>Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
            <button type="submit">Add Promotion</button>
          </div>
        </div>
      </form>
    </div>
  );
}

function ProductList({ products, selectedProducts, handleProductSelection, handleSelectAll, toggleProductSelection }) {
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const handleImageClick = (productId) => {
    toggleProductSelection(productId);
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
      <div className="product-list-promotion ">
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
                  onClick={() => handleImageClick(product.ProductID)}
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
}

export default AddPromotion;
