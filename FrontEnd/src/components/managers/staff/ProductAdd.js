import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import DOMPurify from "dompurify";
import { uploadImage } from "../uimg/UpImage";
import { message } from 'antd';
import "./Products.css";

const ProductAdd = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [expirationDate, setExpirationDate] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState("");
  const [brandName, setBrandName] = useState("");
  const [productCategoryName, setProductCategoryName] = useState("Sữa cho em bé");
  const [status, setStatus] = useState(1);
  const [brands, setBrands] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState(null); // For previewing image
  const editor = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/product/getAllBrands")
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);

  const handleFileChange = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);

    // Preview image
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      message.error("Please select an image.");
      return;
    }

    try {
      const downloadURL = await uploadImage(image, setProgress);

      const editorContent = editor.current.value;
      const sanitizedContent = DOMPurify.sanitize(editorContent);

      const productData = {
        ProductName: productName,
        Description: sanitizedContent,
        Price: price,
        StockQuantity: stockQuantity,
        Image: downloadURL,
        ExpirationDate: expirationDate,
        ManufacturingDate: manufacturingDate,
        BrandName: brandName,
        ProductCategoryName: productCategoryName,
        Status: status,
      };

      const response = await axios.post(
        "http://localhost:5000/api/v1/product/createProduct",
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      message.success("Product created successfully!");
      // Reset form
      setProductName("");
      setDescription("");
      setPrice("");
      setStockQuantity("");
      setImage(null);
      setExpirationDate("");
      setManufacturingDate("");
      setBrandName("");
      setProductCategoryName("Sữa cho em bé");
      setStatus(1);
    } catch (error) {
      console.error("Error creating product:", error);
      message.error("Error creating product: " + error.message);
    }
  };

  const handleResizeImage = (editor) => {
    editor.events.on('mouseup', () => {
      const images = editor.container.querySelectorAll('img');
      images.forEach((image) => {
        const width = image.style.width;
        const height = image.style.height;
        if (width && height) {
          image.setAttribute('width', width);
          image.setAttribute('height', height);
        }
      });
    });
  };

  const editorConfig = useMemo(() => ({
    readonly: false,
    toolbar: true,
    buttons: [
      'bold', 'italic', 'underline', 'eraser', 'ul', 'ol', 'indent', 'outdent',
      '|', 'font', 'fontsize', 'brush', 'paragraph',
      '|', 'table',
      '|', 'align', 'undo', 'redo', 'hr',
      '|', 'copyformat', 'fullsize',
      {
        name: 'uploadImage',
        iconURL: 'https://cdn-icons-png.flaticon.com/128/685/685669.png',
        exec: async (editor) => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.onchange = async (event) => {
            const file = event.target.files[0];
            if (file) {
              try {
                const url = await uploadImage(file, setProgress);
                const img = document.createElement('img');
                img.src = url;
                img.alt = 'Image';
                img.style.width = '100px';
                img.style.height = 'auto';
                editor.selection.insertNode(img);
                handleResizeImage(editor);
              } catch (error) {
                console.error('Error uploading image:', error);
              }
            }
          };
          input.click();
        },
        tooltip: 'Upload Image'
      }
    ],
    events: {
      afterInit: (editor) => {
        handleResizeImage(editor);
      },
      change: (newContent) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newContent;
        const images = tempDiv.querySelectorAll('img');
        images.forEach((image) => {
          const width = image.style.width;
          const height = image.style.height;
          if (width && height) {
            image.setAttribute('width', width);
            image.setAttribute('height', height);
          }
        });
      }
    }
  }), [setProgress]);

  return (
    <div className="container create-product">
      {successMessage && (
        <p className={`success-message ${successMessage.includes("Error") ? "error" : "success"}`}>
          {successMessage}
        </p>
      )}
      <form id="create-product-form" onSubmit={handleSubmit}>
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
        {previewImage && (
          <div className="form-group">
            <img src={previewImage} alt="Preview" className="preview-image" />
          </div>
        )}
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
            className="select-add-pro"
            id="product-brand"
            name="product-brand"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            required>
            <option value="">Chọn hãng</option>
            {brands.map((brand) => (
              <option key={brand.BrandId} value={brand.BrandName}>
                {brand.BrandName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="product-category">Loại sản phẩm:</label>
          <select
            id="product-category"
            name="product-category"
            value={productCategoryName}
            onChange={(e) => setProductCategoryName(e.target.value)}
            required>
            <option value="Sữa cho em bé">Sữa cho em bé</option>
            <option value="Sữa cho mẹ bầu">Sữa cho mẹ bầu</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="product-status">Tình trạng:</label>
          <select
            id="product-status"
            name="product-status"
            value={status}
            onChange={(e) => setStatus(parseInt(e.target.value))}
            required>
            <option value={1}>Kinh doanh</option>
            <option value={0}>Ngừng kinh doanh</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="product-description">Mô tả:</label>
          <div className="editor">
            <JoditEditor
              ref={editor}
              value={description}
              config={editorConfig}
              onChange={(newContent) => setDescription(newContent)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Tạo sản phẩm</button>
      </form>
    </div>
  );
};

export default ProductAdd;
