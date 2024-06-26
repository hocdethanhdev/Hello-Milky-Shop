import React, { useState, useRef, useMemo } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Posts.css";
import "./PostsAdd.css";
import { uploadImage } from "../uimg/UpImage";
import { useSelector } from "react-redux";
import { getUserIdFromToken } from "../../store/actions/authAction";
import DOMPurify from "dompurify";
import { message } from 'antd';
import { useNavigate } from "react-router-dom";

function PostsAdd() {
  const [title, setTitle] = useState("");
  const [headerImage, setHeaderImage] = useState(null);
  const [publishDate, setPublishDate] = useState(new Date());
  const [articleCategoryID, setArticleCategoryID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState(null); // State for previewing image
  const { token } = useSelector((state) => state.auth);
  const userId = getUserIdFromToken(token);
  const editor = useRef(null);
  const navigate = useNavigate();

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

      const editorContent = editor.current.value;
      const sanitizedContent = DOMPurify.sanitize(editorContent); // Sanitize with dompurify

      const postData = {
        Title: title,
        HeaderImage: downloadURL,
        Content: sanitizedContent,
        PublishDate: publishDate.toISOString().split("T")[0],
        AuthorID: userId,
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

      message.success('Bài viết đã được tạo thành công.');
      navigate("/posts");
      window.scrollTo(0, 0);


      // Reset form or handle success action
    } catch (error) {
      console.error("Error creating post:", error.response);
      setErrorMessage(
        "Error creating post: " + (error.response?.data || error.message)
      );
      message.error(`Có lỗi xảy ra: ${error.message}`);
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
        iconURL: 'https://cdn-icons-png.flaticon.com/128/685/685669.png', // Biểu tượng hình ảnh
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
    <div className="container post-form">
    {errorMessage && <p className="error-message">{errorMessage}</p>}
    <form onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-md-8"> 
          <label htmlFor="title">Tiêu đề:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4 form-control1-container"> 
          <label htmlFor="article-category-id">Loại bài viết:</label>
          <select
            className="form-control1"
            id="article-category-id"
            value={articleCategoryID}
            onChange={(e) => setArticleCategoryID(e.target.value)}
            required
          >
            <option value="" disabled>Chọn loại bài viết</option>
            <option value="1">Sức Khỏe</option>
            <option value="2">Tin khuyến mãi</option>
            <option value="3">Tư vấn mua sắm</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="header-image">Ảnh đầu trang</label>
          <input
            type="file"
            className="form-control2"
            id="header-image"
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="publish-date">Ngày công bố</label>
          <DatePicker
            selected={publishDate}
            onChange={(date) => setPublishDate(date)}
            className="form-control"
            dateFormat="dd-MM-yyyy"
          />
        </div>
        {previewImage && (
          <div className="col-md-6 preview-image-container">
            <img src={previewImage} alt="Preview" className="preview-image" />
          </div>
        )}
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="content">Nội dung</label>
          <div className="editor">
            <JoditEditor
              ref={editor}
              config={editorConfig}
            />
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary longlam">
        Create Post
      </button>
    </form>
  </div>
  );

}

export default PostsAdd;
