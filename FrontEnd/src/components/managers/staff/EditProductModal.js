import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import DOMPurify from "dompurify";
import "./EditProductModal.css";
import { uploadImage } from "../uimg/UpImage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { message } from "antd";

const EditProductModal = () => {
  const { productID } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [brands, setBrands] = useState([]);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const editor = useRef(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/product/getProductInfoByID/${productID}`
        );
        const productData = await response.json();
        setFormData(productData[0]);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/product/getAllBrands");
        const brandData = await response.json();
        setBrands(brandData);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchProductData();
    fetchBrands();
  }, [productID]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "Image" && files && files[0]) {
      const file = files[0];
      try {
        const imageUrl = await uploadImage(file, setProgress);
        setFormData((prevData) => ({ ...prevData, Image: imageUrl }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleDescriptionChange = (value) => {
    setFormData((prevData) => ({ ...prevData, Description: value }));
  };

  const handleDateChange = (date, fieldName) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: date }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.ProductName) {
      newErrors.productName = "Tên sản phẩm không được bỏ trống.";
    } else if (formData.ProductName.length > 100) {
      newErrors.productName = "Tên sản phẩm không được quá 100 kí tự.";
    }

    if (formData.Price === "" || formData.Price < 0) {
      newErrors.price = "Giá sản phẩm phải lớn hơn 0 và không được bỏ trống.";
    }

    if (formData.StockQuantity === "") {
      newErrors.stockQuantity = "Số lượng không được bỏ trống.";
    }

    if (!formData.BrandName) {
      newErrors.brandName = "Hãng không được bỏ trống.";
    }

    if (formData.ExpirationDate && formData.ManufacturingDate && formData.ExpirationDate < formData.ManufacturingDate) {
      newErrors.expirationDate = "Ngày hết hạn không được diễn ra trước ngày sản xuất.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const allowedTags = [
      "img",
      "b",
      "i",
      "u",
      "s",
      "ul",
      "ol",
      "li",
      "p",
      "br",
      "hr",
      "a",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "font",
      "span",
      "div",
    ];
    const allowedAttrs = [
      "src",
      "alt",
      "href",
      "target",
      "width",
      "height",
      "style",
      "class",
      "align",
      "color",
      "size",
    ];

    const sanitizedDescription = DOMPurify.sanitize(formData.Description, {
      ALLOWED_TAGS: allowedTags,
      ALLOWED_ATTR: allowedAttrs,
    });

    const updatedFormData = {
      ...formData,
      Description: sanitizedDescription,
      ExpirationDate: formData.ExpirationDate
        ? new Date(formData.ExpirationDate).toISOString().split("T")[0]
        : null,
      ManufacturingDate: formData.ManufacturingDate
        ? new Date(formData.ManufacturingDate).toISOString().split("T")[0]
        : null,
    };

    try {
      console.log("Starting fetch to update product");
      const response = await fetch(`http://localhost:5000/api/v1/product/editProduct/${productID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      console.log("Fetch response received", response);

      if (response.ok) {
        console.log("Product updated successfully");
        message.success("Sản phẩm đã được sửa thành công."); // Thêm thông báo thành công
        navigate("/products");
      } else {
        const errorData = await response.json();
        console.error("Error updating product:", errorData);
        message.error("Có lỗi xảy ra khi cập nhật sản phẩm.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      message.error("Có lỗi xảy ra khi cập nhật sản phẩm.");
    }
  };

  const handleResizeImage = (editor) => {
    editor.events.on("mouseup", () => {
      const images = editor.container.querySelectorAll("img");
      images.forEach((image) => {
        const width = image.style.width;
        const height = image.style.height;
        if (width && height) {
          image.setAttribute("width", width);
          image.setAttribute("height", height);
        }
      });
    });
  };

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      toolbar: true,
      toolbarButtonSize: "middle",
      toolbarSticky: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "eraser",
        "|",
        "ul",
        "ol",
        "indent",
        "outdent",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "link",
        "table",
        "|",
        "align",
        "undo",
        "redo",
        "hr",
        "|",
        "copyformat",
        "fullsize",
        {
          name: "uploadImage",
          iconURL: "https://cdn-icons-png.flaticon.com/128/685/685669.png",
          exec: async (editor) => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = async (event) => {
              const file = event.target.files[0];
              if (file) {
                try {
                  const url = await uploadImage(file, setProgress);
                  const img = document.createElement("img");
                  img.src = url;
                  img.alt = "Image";
                  img.style.width = "100px";
                  img.style.height = "auto";
                  editor.selection.insertNode(img);
                  handleResizeImage(editor);
                } catch (error) {
                  console.error("Error uploading image:", error);
                }
              }
            };
            input.click();
          },
          tooltip: "Upload Image",
        },
      ],
      useNativeSpeechRecognition: false,
      events: {
        afterInit: (editor) => {
          handleResizeImage(editor);
        },
        change: (newContent) => {
          const maxChars = 4000;
          if (newContent.length > maxChars) {
            editor.value = newContent.substring(0, maxChars);
            message.warning(`Nội dung không được vượt quá ${maxChars} ký tự.`);
          }
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
    }),
    [setProgress]
  );

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-product-page">
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Tên sản phẩm:
            <input
              type="text"
              name="ProductName"
              value={formData.ProductName}
              onChange={handleChange}
            />
            {errors.productName && <span className="error">{errors.productName}</span>}
          </label>

          <label>
            Giá:
            <input
              type="number"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
            />
            {errors.price && <span className="error">{errors.price}</span>}
          </label>

          <label>
            Số lượng:
            <input
              type="number"
              name="StockQuantity"
              value={formData.StockQuantity}
              onChange={handleChange}
            />
            {errors.stockQuantity && <span className="error">{errors.stockQuantity}</span>}
          </label>

          <label>
            Hãng:
            <select name="BrandName" value={formData.BrandName} onChange={handleChange}>
              <option value="">Chọn hãng</option>
              {brands.map((brand) => (
                <option key={brand.BrandName} value={brand.BrandName}>
                  {brand.BrandName}
                </option>
              ))}
            </select>
            {errors.brandName && <span className="error">{errors.brandName}</span>}
          </label>

          <label>
            Ngày sản xuất:
            <DatePicker
              selected={formData.ManufacturingDate ? new Date(formData.ManufacturingDate) : null}
              onChange={(date) => handleDateChange(date, "ManufacturingDate")}
              dateFormat="dd/MM/yyyy"
            />
          </label>

          <label>
            Ngày hết hạn:
            <DatePicker
              selected={formData.ExpirationDate ? new Date(formData.ExpirationDate) : null}
              onChange={(date) => handleDateChange(date, "ExpirationDate")}
              dateFormat="dd/MM/yyyy"
            />
            {errors.expirationDate && <span className="error">{errors.expirationDate}</span>}
          </label>

          <label>
            Hình ảnh:
            <input type="file" name="Image" onChange={handleChange} />
            {progress > 0 && (
              <progress className="image-upload-progress" value={progress} max="100" />
            )}
            {formData.Image && (
              <img className="preview-image" src={formData.Image} alt="Preview" />
            )}
          </label>

          <label className="description-label">
            Mô tả:
            <JoditEditor
              ref={editor}
              value={formData.Description}
              onChange={handleDescriptionChange}
              config={editorConfig}
            />
          </label>
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            Cập nhật
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/products")}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductModal;
