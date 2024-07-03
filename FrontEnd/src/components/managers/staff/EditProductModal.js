import { useState, useEffect, useRef, useMemo } from "react";
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.ProductName) {
      message.warning("Tên sản phẩm không được bỏ trống.");
      return;
    } 
    if (formData.ProductName.length > 100) {
      message.warning("Tên sản phẩm không được quá 100 kí tự.");
      return;
    }

    if (!formData.BrandName) {
      message.warning("Hãng không được bỏ trống.");
      return;
    }

    if (formData.StockQuantity === null || formData.StockQuantity === "") {
      message.warning("Số lượng không được bỏ trống.");
      return;
    }
    if (formData.StockQuantity < 0) {
      message.warning("Số lượng không được nhỏ hơn 0.");
      return;
    }

    if (formData.Price === null || formData.Price === "") {
      message.warning("Giá không được bỏ trống.");
      return;
    }
    if (formData.Price < 0) {
      message.warning("Giá không được nhỏ hơn 0.");
      return;
    }

    
  if (!formData.ManufacturingDate) {
    message.warning("Ngày sản xuất không được bỏ trống.");
    return;
  }

  if (!formData.ExpirationDate) {
    message.warning("Ngày hết hạn không được bỏ trống.");
    return;
  }

  const manufacturingDate = new Date(formData.ManufacturingDate);
  const expirationDate = new Date(formData.ExpirationDate);

  if (expirationDate <= manufacturingDate) {
    message.warning("Ngày hết hạn phải diễn ra sau ngày sản xuất.");
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
        message.success("Sản phẩm đã được sửa thành công.");
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
          <label className="productName-row">
            Tên sản phẩm:
            <input
              type="text"
              name="ProductName"
              value={formData.ProductName}
              onChange={handleChange}
            />
            {message.productName && (
              <p className="error-message">{message.productName}</p>
            )}
          </label>
          <label className="brand-row">
            Hãng:
            <select
              name="BrandName"
              value={formData.BrandName}
              onChange={handleChange}
            >
              <option value="">Chọn hãng</option>
              {brands.map((brand) => (
                <option key={brand.BrandId} value={brand.BrandName}>
                  {brand.BrandName}
                </option>
              ))}
            </select>
            {message.brandName && (
              <p className="error-message">{message.brandName}</p>
            )}
          </label>
          <label className="quantity-row">
            Số lượng:
            <input
              type="number"
              name="StockQuantity"
              value={formData.StockQuantity}
              onChange={handleChange}
            />
            {message.stockQuantity && (
              <p className="error-message">{message.stockQuantity}</p>
            )}
          </label>
          <label className="price-row">
            Giá:
            <input
              type="number"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
            />
            {message.price && <p className="error-message">{message.price}</p>}
          </label>
          <label className="manufacturingDate-row">
            Ngày sản xuất:
            <DatePicker
              selected={
                formData.ManufacturingDate
                  ? new Date(formData.ManufacturingDate)
                  : null
              }
              onChange={(date) => handleDateChange(date, "ManufacturingDate")}
              dateFormat="dd/MM/yyyy"
            />
            {message.manufacturingDate && (
              <p className="error-message">{message.manufacturingDate}</p>
            )}
          </label>
          <label className="expirationDate-row">
            Ngày hết hạn:
            <DatePicker
              selected={
                formData.ExpirationDate
                  ? new Date(formData.ExpirationDate)
                  : null
              }
              onChange={(date) => handleDateChange(date, "ExpirationDate")}
              dateFormat="dd/MM/yyyy"
            />
            {message.expirationDate && (
              <p className="error-message">{message.expirationDate}</p>
            )}
          </label>
          <label className="image-row">
            Hình ảnh:
            <div className="image-input-container">
              <input type="file" name="Image" onChange={handleChange} />
              {formData.Image && <img src={formData.Image} alt="Product" className="product-image-preview" />}
            </div>
          </label>
          <label className="description-row">
            Mô tả:
            <JoditEditor
              ref={editor}
              value={formData.Description}
              config={editorConfig}
              onBlur={(newContent) => handleDescriptionChange(newContent)}
            />
          </label>
        </div>
        <button type="submit">Lưu thay đổi</button>
      </form>
    </div>
  );
};

export default EditProductModal;
