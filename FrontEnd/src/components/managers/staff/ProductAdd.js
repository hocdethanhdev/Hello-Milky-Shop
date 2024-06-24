// src/components/ProductAdd/ProductAdd.js
import React, { useState, useEffect } from "react";
import { uploadImage } from "../uimg/UpImage";
import "./Products.css";

const ProductAdd = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [image, setImage] = useState(null); // Use null instead of ""
  const [expirationDate, setExpirationDate] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState("");
  const [brandName, setBrandName] = useState("");
  const [productCategoryName, setProductCategoryName] =
    useState("Sữa cho em bé");
  const [status, setStatus] = useState(1);
  const [brands, setBrands] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fetch brands from the API
    fetch("http://localhost:5000/api/v1/product/getAllBrands")
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Store the selected file object in state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image.");
      return;
    }

    try {
      const downloadURL = await uploadImage(image, setProgress);

      const productData = {
        ProductName: productName,
        Description: description,
        Price: price,
        StockQuantity: stockQuantity,
        Image: downloadURL,
        ExpirationDate: expirationDate,
        ManufacturingDate: manufacturingDate,
        BrandName: brandName,
        ProductCategoryName: productCategoryName,
        Status: status,
      };

      console.log("Submitting product data:", productData);

      fetch("http://localhost:5000/api/v1/product/createProduct", {
        method: "POST",
        body: JSON.stringify(productData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response from API:", data);

          if (!data) {
            setSuccessMessage("Error creating product.");
          } else {
            setSuccessMessage("Product created successfully!");
            // Clear form fields after successful creation
            setProductName("");
            setDescription("");
            setPrice("");
            setStockQuantity("");
            setImage(null); // Reset to null instead of ""
            setExpirationDate("");
            setManufacturingDate("");
            setBrandName("");
            setProductCategoryName("Sữa cho em bé");
            setStatus(1);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setSuccessMessage("Error creating product.");
        });
    } catch (error) {
      console.error("Upload failed:", error);
      setSuccessMessage("Error creating product.");
    }
  };

  return (
    <div className="container create-product">
      {successMessage && (
        <p
          className={`success-message ${successMessage.includes("Error") ? "error" : "success"
            }`}
        >
          {successMessage}
        </p>
      )}
      <h1>Thêm sản phẩm</h1>

      <form
        id="create-product-form"
        className="product-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="product-name">Tên sản phẩm:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="product-description">Mô tả:</label>
          <textarea
            id="product-description"
            name="product-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="product-price">Giá:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="product-stock">Số lượng:</label>
          <input
            type="number"
            id="product-stock"
            name="product-stock"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="product-image-url">Ảnh:</label>
          <input
            type="file"
            id="product-image-url"
            name="product-image-url"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="product-expiration">Hạn sử dụng:</label>
          <input
            type="date"
            id="product-expiration"
            name="product-expiration"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="product-manufacturing">Ngày sản xuất:</label>
          <input
            type="date"
            id="product-manufacturing"
            name="product-manufacturing"
            value={manufacturingDate}
            onChange={(e) => setManufacturingDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="product-brand">Hãng:</label>
          <select
            id="product-brand"
            name="product-brand"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            required
          >
            <option value="">Chọn hãng</option>
            {brands.map((brand) => (
              <option key={brand.BrandID} value={brand.BrandName}>
                {brand.BrandName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="product-category">Loại sữa:</label>
          <select
            id="product-category"
            name="product-category"
            value={productCategoryName}
            onChange={(e) => setProductCategoryName(e.target.value)}
            required
          >
            <option value="Sữa cho em bé">Sữa cho em bé</option>
            <option value="Sữa cho mẹ bầu">Sữa cho mẹ bầu</option>
          </select>
        </div>
        <button type="submit" className="button-product btn btn-primary">
          Tạo sản phẩm
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
