import React, { useState } from "react";
import axios from "axios";
import RichTextEditor from "../../users/component/RichTextEditor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Posts.css";
import { uploadImage } from "./UpImage";
import sanitizeHtml from "sanitize-html";

function PostsAdd() {
  const [title, setTitle] = useState("");
  const [headerImage, setHeaderImage] = useState(null);
  const [content, setContent] = useState("");
  const [publishDate, setPublishDate] = useState(new Date());
  const [authorID, setAuthorID] = useState("");
  const [articleCategoryID, setArticleCategoryID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState(null); // State for previewing image

  const handleContentChange = (value) => {
    const sanitizedContent = sanitizeHtml(value, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        img: ["src", "alt"],
      },
    });

    setContent(sanitizedContent);
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setHeaderImage(imageFile);

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

    if (!headerImage) {
      setErrorMessage("Image is required.");
      return;
    }

    try {
      const downloadURL = await uploadImage(headerImage, setProgress);

      const postData = {
        Title: title,
        HeaderImage: downloadURL,
        Content: content,
        PublishDate: publishDate.toISOString().split("T")[0],
        AuthorID: authorID,
        ArticleCategoryID: parseInt(articleCategoryID),
      };

      const response = await axios.post(
        "http://localhost:5000/api/v1/article/createArticle/",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Post created successfully:", response.data);
      // Reset form or handle success action
    } catch (error) {
      console.error("Error creating post:", error.response);
      setErrorMessage(
        "Error creating post: " + (error.response?.data || error.message)
      );
    }
  };

  return (
    <div className="container post-form">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <h2>Tạo bài viết</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="title">Post Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="header-image">Header Image</label>
            <input
              type="file"
              className="form-control"
              id="header-image"
              onChange={handleImageChange}
              required
            />
          </div>
        </div>
        {/* Preview image */}
        {previewImage && (
          <div className="row mb-3">
            <div className="col">
              <img src={previewImage} alt="Preview" className="preview-image" />
            </div>
          </div>
        )}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="content">Content</label>
            <div className="editor">
              <RichTextEditor onChange={handleContentChange} />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="publish-date">Publish Date</label>
            <DatePicker
              selected={publishDate}
              onChange={(date) => setPublishDate(date)}
              className="form-control"
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="author-id">Author ID</label>
            <input
              type="text"
              className="form-control"
              id="author-id"
              value={authorID}
              onChange={(e) => setAuthorID(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="article-category-id">Article Category ID</label>
            <input
              type="number"
              className="form-control"
              id="article-category-id"
              value={articleCategoryID}
              onChange={(e) => setArticleCategoryID(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default PostsAdd;
