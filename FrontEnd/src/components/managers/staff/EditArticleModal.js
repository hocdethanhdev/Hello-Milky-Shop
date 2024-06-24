import React, { useState } from "react";
import axios from "axios";
import RichTextEditor from "../richtext/RichTextEditor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EditArticleModal.css";
import sanitizeHtml from "sanitize-html";

const EditArticleModal = ({ article, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    Title: article.Title,
    HeaderImage: article.HeaderImage,
    Content: article.Content,
    PublishDate: new Date(article.PublishDate),
    AuthorID: article.AuthorID,
    ArticleCategoryID: article.ArticleCategoryID,
  });
  const [previewImage, setPreviewImage] = useState(article.HeaderImage); // State for previewing image

  const handleContentChange = (value) => {
    const sanitizedContent = sanitizeHtml(value, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        img: ["src", "alt"],
      },
    });
    setFormData({ ...formData, Content: sanitizedContent });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(imageFile);
      setFormData({ ...formData, HeaderImage: imageFile });
    } else {
      setPreviewImage(null);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        ...formData,
        PublishDate: formData.PublishDate.toISOString().split("T")[0],
      };

      await axios.put(
        `http://localhost:5000/api/v1/article/editArticle/${article.ArticleID}`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      onSave(formData); // Notify parent component to update state
      onClose(); // Close the modal
      window.location.reload();
    } catch (error) {
      console.error("There was an error updating the article!", error);
    }
  };

  return (
    <div className="modal-thinhprostedit2-custom">
      <div className="modal-content-thinhprostedit2-custom">
        <span className="close-thinhprostedit2-custom" onClick={onClose}>
          &times;
        </span>
        <h2>Chỉnh sửa bài viết</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group1">
            <label>
              Tiêu đề:
              <input
                type="text"
                name="Title"
                value={formData.Title}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-group1">
            <label>
              Ngày công bố:
              <DatePicker
                selected={formData.PublishDate}
                onChange={(date) =>
                  setFormData({ ...formData, PublishDate: date })
                }
                className="form-control"
                dateFormat="yyyy-MM-dd"
              />
            </label>
          </div>
          <div className="form-group1">
            <label>
              Mã tác giả:
              <input
                type="text"
                name="AuthorID"
                value={formData.AuthorID}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-group1">
            <label>
              Loại bài:
              <input
                type="number"
                name="ArticleCategoryID"
                value={formData.ArticleCategoryID}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-group1">
            <label>
              Ảnh đầu trang:
              <input type="file" onChange={handleImageChange} />
            </label>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="preview-image2"
              />
            )}
          </div>
          <div className="form-group1" style={{ flex: "1 1 100%" }}>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="content">Nội dung</label>
                <div className="editor">
                  <RichTextEditor value={formData.Content} onChange={handleContentChange} />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditArticleModal;
