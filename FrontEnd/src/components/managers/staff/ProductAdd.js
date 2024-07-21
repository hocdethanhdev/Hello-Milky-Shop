import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import DOMPurify from "dompurify";
import { uploadImage } from "../uimg/UpImage";
import { message, Input, Modal } from "antd";
import "./Products.css";
import { formatPrice } from "../../utils/formatPrice";
import config from "../../config/config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

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
  const [previewImage, setPreviewImage] = useState(null);
  const editor = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");


  useEffect(() => {
    fetch(`${config.API_ROOT}/api/v1/product/getAllBrands`)
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);
  const handleAddBrand = () => {
    setIsModalVisible(true);
  };
  const handleSaveBrand = async () => {
    if (!newBrandName) {
      message.error("Tên hãng không được để trống.");
      return;
    }

    try {
      const response = await axios.post(
        `${config.API_ROOT}/api/v1/brand/addBrand`,
        { BrandName: newBrandName },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        message.success("Thêm hãng thành công.");
        setBrands([...brands, response.data]);
        setNewBrandName("");
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error("Error adding brand:", error);
      message.error("Error adding brand: " + error.message);
    }
  };

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

  const handlePriceChange = (e) => {
    const { value } = e.target;
    const formattedPrice = formatPrice(value);
    setPrice(formattedPrice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!productName) {
      message.error("Tên sản phẩm không được để trống.");
      return;
    }
    if (productName.length > 100) {
      message.error("Tên sản phẩm không được vượt quá 100 ký tự.");
      return;
    }
    if (productName.length < 20) {
      message.error("Tên sản phẩm không được nhỏ hơn 20 ký tự.");
      return;
    }
    if (!price) {
      message.error("Giá sản phẩm không được để trống.");
      return;
    }
    const parsedPrice = parseInt(price.replace(/\D/g, ""), 10);
    if (isNaN(parsedPrice) || parsedPrice < 1000) {
      message.error("Giá sản phẩm phải lớn hơn hoặc bằng 10,000 VND.");
      return;
    }
    if (parsedPrice > 10000000) {
      message.error("Giá sản phẩm không được quá 10,000,000 VND.");
      return;
    }
    if (!stockQuantity) {
      message.error("Số lượng sản phẩm không được để trống.");
      return;
    }
    if (stockQuantity <= 0) {
      message.error("Số lượng sẩn phẩm phải lớn hơn 0.");
      return;
    }
    if (!brandName) {
      message.error("Hãng không được bỏ trống.");
      return;
    }
    if (!image) {
      message.error("Vui lòng chọn ảnh.");
      return;
    }
    if (!manufacturingDate) {
      message.error("Ngày sản xuất không được để trống.");
      return;
    }
    if (!expirationDate) {
      message.error("Hạn sử dụng không được để trống.");
      return;
    }

    const expirationDateMoment = moment(expirationDate);
    const manufacturingDateMoment = moment(manufacturingDate);
    const currentDateMoment = moment();

    if (expirationDateMoment.isSameOrBefore(manufacturingDateMoment, 'day')) {
      message.error("Hạn sử dụng phải sau ngày sản xuất.");
      return;
    }

    if (expirationDateMoment.isBefore(currentDateMoment, 'day')) {
      message.error("Hạn sử dụng không được bé hơn ngày hiện tại.");
      return;
    }

    if (!brandName) {
      message.error("Vui lòng chọn hãng.");
      return;
    }
    if (!productCategoryName) {
      message.error("Vui lòng chọn loại sản phẩm.");
      return;
    }
    if (status === "") {
      message.error("Vui lòng chọn tình trạng của sản phẩm");
      return;
    }
    if (!description) {
      message.error("Mô tả không được để trống.");
      return;
    }

    try {
      const downloadURL = await uploadImage(image);
      if (!downloadURL) {
        message.error("Ảnh cho sản phẩm không hợp lệ.");
        return;
      }
      const editorContent = editor.current.value;
      const sanitizedContent = DOMPurify.sanitize(editorContent);

      const productData = {
        ProductName: productName,
        Description: sanitizedContent,
        Price: parseInt(price.replace(/\D/g, ''), 10),
        StockQuantity: stockQuantity,
        Image: downloadURL,
        ExpirationDate: expirationDate,
        ManufacturingDate: manufacturingDate,
        BrandName: brandName,
        ProductCategoryName: productCategoryName,
        Status: status,
      };

      await axios.post(
        `${config.API_ROOT}/api/v1/product/createProduct`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      message.success("Tạo sản phẩm thành công.");
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
      setPreviewImage(null); // Reset preview image
    } catch (error) {
      console.error("Error creating product:", error);
      message.error("Error creating product: " + error.message);
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
      buttons: [
        "bold",
        "italic",
        "underline",
        "eraser",
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
                  const url = await uploadImage(file);
                  if (!url) {
                    message.error("Ảnh cho sản phẩm không hợp lệ.");
                    return;
                  }
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
      events: {
        afterInit: (editor) => {
          handleResizeImage(editor);
        },
        change: (newContent) => {
          const maxChars = 20000;
          if (newContent.length > maxChars) {
            editor.value = newContent.substring(0, maxChars);
            message.warning(`Nội dung không được vượt quá ${maxChars} ký tự.`);
          }
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = newContent;
          const images = tempDiv.querySelectorAll("img");
          images.forEach((image) => {
            const width = image.style.width;
            const height = image.style.height;
            if (width && height) {
              image.setAttribute("width", width);
              image.setAttribute("height", height);
            }
          });
        },
      },
    }),
    []
  );

  return (
    <div className="container create-product">
      <form id="create-product-form" onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-8">
            <label htmlFor="product-name">Tên sản phẩm:</label>
            <input
              type="text"
              className="form-control"
              id="product-name"
              name="product-name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="product-category">Loại sản phẩm:</label>
            <select
              className="form-control"
              id="product-category"
              name="product-category"
              value={productCategoryName}
              onChange={(e) => setProductCategoryName(e.target.value)}>
              <option value="Sữa cho em bé">Sữa cho em bé</option>
              <option value="Sữa cho mẹ bầu">Sữa cho mẹ bầu</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="product-price">Giá:</label>
            <input
              type="text"
              className="form-control"
              id="product-price"
              name="product-price"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="product-stock">Số lượng:</label>
            <input
              type="number"
              className="form-control"
              id="product-stock"
              name="product-stock"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <div className="brandfl">
              <label htmlFor="product-brand">Hãng:</label>
              <button type="button" className="btn btn-secondary" onClick={handleAddBrand}>
                Thêm Hãng
              </button>

            </div>

            <select
              className="form-control"
              id="product-brand"
              name="product-brand"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}>
              <option value="">Chọn hãng</option>
              {brands.map((brand) => (
                <option key={brand.BrandId} value={brand.BrandName}>
                  {brand.BrandName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="product-status">Tình trạng:</label>
            <select
              className="form-control"
              id="product-status"
              name="product-status"
              value={status}
              onChange={(e) => setStatus(parseInt(e.target.value))}>
              <option value={1}>Kinh doanh</option>
              <option value={0}>Ngừng kinh doanh</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="product-manufacturing">Ngày sản xuất:</label>
            <DatePicker
              selected={manufacturingDate}
              onChange={(date) => setManufacturingDate(date)}
              className="form-control"
              dateFormat="dd-MM-yyyy"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="product-expiration">Hạn sử dụng:</label>
            <DatePicker
              selected={expirationDate}
              onChange={(date) => setExpirationDate(date)}
              className="form-control"
              dateFormat="dd-MM-yyyy"
            />
          </div>
        </div>
        <div className="img-url-input-rv">
          <div className="row mb-3">
            <div className="col-md-12 input-imgae-url-addpro">
              <label htmlFor="product-image-url">Ảnh:</label>
              <input
                type="file"
                className="form-control"
                id="product-image-url"
                name="product-image-url"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {previewImage && (
            <div className="row mb-3">
              <div className="col-md-12 preview-image-container">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="preview-image-add-product"
                />
              </div>
            </div>
          )}
        </div>

        <div className="row mb-3">
          <div className="col">
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
        </div>

        <button
          type="submit"
          className="btn btn-success"
          style={{ marginLeft: "40%" }}>
          Tạo sản phẩm
        </button>
      </form>
      <Modal
        title="Thêm Hãng"
        visible={isModalVisible}
        onOk={handleSaveBrand}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          value={newBrandName}
          onChange={(e) => setNewBrandName(e.target.value)}
          placeholder="Nhập tên hãng"
          required
        />
      </Modal>

    </div>
  );
};

export default ProductAdd;
