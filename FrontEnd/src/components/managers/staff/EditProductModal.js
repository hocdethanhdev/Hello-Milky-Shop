import React, { useState, useEffect, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import DOMPurify from "dompurify";
import "./EditProductModal.css";
import { uploadImage } from "../uimg/UpImage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...product });
  const editor = useRef(null);
  const modalContentRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setFormData({ ...product });
  }, [product]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "Image" && files && files[0]) {
      const file = files[0];
      try {
        const imageUrl = await uploadImage(file, setProgress);
        setFormData({ ...formData, Image: imageUrl });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, Description: value });
  };

  const handleDateChange = (date, fieldName) => {
    setFormData({ ...formData, [fieldName]: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
    };
    onSave(updatedFormData);
   
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

  const getStatusDisplay = (status, stockQuantity) => {
    if (status === null || status === false) {
      return "Tạm ẩn";
    }
    return status === true && parseInt(stockQuantity) > 0
      ? "Còn hàng"
      : "Hết hàng";
  };

  const handleClickOutside = (event) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

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
    [setProgress]
  );

  return (
    <div className="modal-thinhprostedit">
      <div className="modal-content-thinhprostedit" ref={modalContentRef}>
        <div className="modal-content-scrollable-thinhh">
          <span className="close-thinhprostedit" onClick={onClose}>
            &times;
          </span>
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
              </label>

              <label>
                Giá:
                <input
                  type="number"
                  name="Price"
                  value={formData.Price}
                  onChange={handleChange}
                />
              </label>
              <label>
                Số lượng:
                <input
                  type="number"
                  name="StockQuantity"
                  value={formData.StockQuantity}
                  onChange={handleChange}
                />
              </label>
              <div className="form-group1">
                <label>Hình ảnh: </label>
                <input type="file" name="Image" onChange={handleChange} />
                {formData.Image && (
                  <img
                    src={formData.Image}
                    alt="Preview"
                    className="preview-image-2"
                  />
                )}
              </div>
              <label>
                HSD:
                <DatePicker
                  selected={formData.ExpirationDate}
                  onChange={(date) => handleDateChange(date, "ExpirationDate")}
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                />
              </label>
              <label>
                NSX:
                <DatePicker
                  selected={formData.ManufacturingDate}
                  onChange={(date) =>
                    handleDateChange(date, "ManufacturingDate")
                  }
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                />
              </label>
              <label>
                Hãng:
                <input
                  type="text"
                  name="BrandName"
                  value={formData.BrandName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Loại:
                <select
                  name="ProductCategoryName"
                  value={formData.ProductCategoryName}
                  onChange={handleChange}>
                  <option value="Sữa cho mẹ">Sữa cho mẹ</option>
                  <option value="Sữa cho em bé">Sữa cho em bé</option>
                </select>
              </label>

              <label className="st-thinh-he">
                Trạng thái:
                <div className="status-display-thinh">
                  {getStatusDisplay(formData.Status, formData.StockQuantity)}
                </div>
              </label>
            </div>
            <label className="edit-pro-thinh">
              Mô tả:
              <JoditEditor
                ref={editor}
                value={formData.Description}
                config={editorConfig}
                onBlur={handleDescriptionChange}
              />
            </label>
            <button className="button-edit-product" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
